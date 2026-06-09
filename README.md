# h5-cc-bridge

H5 ↔ Cocos 桥接的**协议单一来源**。约束 h5-game (Vue/Vite) 与 h5-cc-game (Cocos Creator 2.4) 两端使用同一份 `BridgeAction` / payload 类型 / 信封序列化逻辑，避免双端字段漂移。

> pokerqueen（旧 cocos 项目）不接入本仓库，仍由 h5-game 内 `src/bridge/protocol/` 维护历史协议。

## 范围

只装协议层：

- `BRIDGE_ACTION` / `BRIDGE_MSG_TYPE` 常量
- Cocos → H5 / H5 → Cocos 的 payload 接口与 PayloadMap
- `BridgeMessage` 信封 + `createBridgeMessage` / `toBridgeRaw` / `parseBridgeRaw` / `parseBridgeObject`

不装传输层（postMessage / webkit / scheme）和业务 channel，那些与各项目自己的 logger / store 强耦合，留在消费方。

## 两端消费方式

### h5-game（npm 依赖）

```json
{
  "dependencies": {
    "h5-cc-bridge": "git+https://github.com/soolary/h5-cc-bridge.git#main"
  }
}
```

`vite.config.ts` 根据 `VITE_BRIDGE_TARGET` 配 alias：

```ts
// 伪代码
resolve.alias['@bridge-protocol'] =
  env.VITE_BRIDGE_TARGET === 'h5-cc-game'
    ? 'h5-cc-bridge'                           // 用共享协议
    : path.resolve(__dirname, 'src/bridge/protocol')  // 老 protocol（兼容 pokerqueen）
```

业务代码统一从 `@bridge-protocol` 引入：

```ts
import { BRIDGE_ACTION, BRIDGE_MSG_TYPE, type BridgeMessage } from '@bridge-protocol'
```

### h5-cc-game（同步 .ts 源码）

Cocos Creator 2.4 对 npm `node_modules` 的解析很挫，所以不走 npm install，而是用同步脚本把本仓库的 `src/` 直接拷到 `assets/script/bridge/`，让 Cocos 自己的 TS 编译器走相对路径解析。

```bash
# h5-cc-game 仓库内
npm run sync:bridge
```

脚本（`scripts/sync-bridge.js`）做的事：

1. 首次：`git clone --depth 1 -b $BRIDGE_REF https://github.com/soolary/h5-cc-bridge.git deps/h5-cc-bridge`
2. 已存在：`git fetch --all --tags` + `git reset --hard origin/$BRIDGE_REF`
3. 把 `deps/h5-cc-bridge/src/*.ts` 复制到 `assets/script/bridge/`
4. 写 `assets/script/bridge/.SYNCED_FROM`，记录 commit SHA / ref / 时间

git 处理：

- `deps/h5-cc-bridge/`：**gitignore**，是工作区克隆，跟 `deps/h5-game` 同性质。
- `assets/script/bridge/*.ts`：**进 git**，Cocos Creator 编辑期必须存在。视为 sync 产物，不要手动改。

之后 `H5MsgMgr.ts` 改成（已落地）：

```ts
import {
  CocosToH5PayloadMap as SharedCocosToH5PayloadMap,
  H5ToCocosPayloadMap,
  H5NavigatePayload,
} from './bridge';

// CC 侧 sendToH5 接受原始字节，本地覆盖一下 wsSend。
export interface CocosToH5PayloadMap extends Omit<SharedCocosToH5PayloadMap, 'wsSend'> {
  wsSend: Uint8Array | ArrayBuffer;
}
```

## 版本固定

- 本地开发：两边都 follow `#main`
- 上线发布：tag 切到 `git+https://...#v0.1.0`，commit SHA 同样可用

每次 breaking change（删字段 / 改名）发新 tag 并同步两端的 `package.json` / `sync:bridge` 锁定 ref。

## 本地构建

```bash
npm install
npm run build       # tsc → dist/{index.js,index.d.ts,...}
```

`dist/` 已随源码 commit，消费方 `npm install` 后无需再编译；本地修改 `src/*.ts` 后记得跑 `npm run build` 并 commit。
