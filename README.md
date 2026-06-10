# @silenthill/h5-cc-bridge

H5 ↔ Cocos 桥接的**协议单一来源**。约束 h5-game (Vue/Vite) 与 h5-cc-game (Cocos Creator 2.4) 两端使用同一份 `BridgeAction` / payload 类型 / 信封序列化逻辑，避免双端字段漂移。

> pokerqueen（旧 cocos 项目）不接入本仓库，仍由 h5-game 内 `src/bridge/protocol/` 维护历史协议。

## 范围

只装协议层：

- `BRIDGE_ACTION` / `CC_TO_H5_ACTIONS` / `H5_TO_CC_ACTIONS` / `BRIDGE_MSG_TYPE` 常量
- Cocos → H5 / H5 → Cocos 的 payload 接口与 PayloadMap
- `BridgeMessage` 信封 + `createBridgeMessage` / `toBridgeRaw` / `parseBridgeRaw` / `parseBridgeObject`

不装传输层（postMessage / webkit / scheme）和业务 channel，那些与各项目自己的 logger / store 强耦合，留在消费方。

## 入口（subpath exports）

每一侧只 import 自己关心的方向：

| 入口 | 适用方 | 包含 |
|------|--------|------|
| `@silenthill/h5-cc-bridge/cc-side` | Cocos 项目 | 全部 action 常量 + CC→H5 / H5→CC payload 类型。**不含 envelope 运行时**（CC 历史上自实现 BridgeRawMessage） |
| `@silenthill/h5-cc-bridge/h5-side` | H5 (Vue/Vite) | `cc-side` 全套 + `createBridgeMessage` / `parseBridgeRaw` / `toBridgeRaw` / `parseBridgeObject` 等 envelope 函数 |
| `@silenthill/h5-cc-bridge/envelope` | 任意一方需单独引入 envelope | 仅 `createBridgeMessage` / `parseBridgeRaw` / ... |
| `@silenthill/h5-cc-bridge`（默认） | 老调用点兼容 | 全部内容；新代码请改用 `/cc-side` 或 `/h5-side` |

action 常量上也分了组：

- `CC_TO_H5_ACTIONS` — CC 发的（`wsConnect` / `showToast` / `h5Navigate` / ...）
- `H5_TO_CC_ACTIONS` — H5 发的（`wsOpen` / `syncUser` / `enterTable` / ...）
- `BRIDGE_ACTION` — 上面两组的合并视图（兼容存量调用点）

## 两端消费方式

### h5-game（npm 依赖）

```json
{
  "dependencies": {
    "@silenthill/h5-cc-bridge": "git+https://github.com/soolary/h5-cc-bridge.git#main"
  }
}
```

`vite.config.ts` 根据 `VITE_BRIDGE_TARGET` 配 alias：

```ts
// 伪代码
resolve.alias['@bridge-protocol'] =
  env.VITE_BRIDGE_TARGET === 'h5-cc-game'
    ? '@silenthill/h5-cc-bridge/h5-side'        // 用共享协议（H5 侧入口）
    : path.resolve(__dirname, 'src/bridge/protocol')  // 老 protocol（兼容 pokerqueen）
```

业务代码统一从 `@bridge-protocol` 引入：

```ts
import { BRIDGE_ACTION, BRIDGE_MSG_TYPE, type BridgeMessage } from '@bridge-protocol'
```

### h5-cc-game（纯 npm 依赖，零配置）

直接当 npm 包装，**不用配 `tsconfig.paths`、不用 `baseUrl`、不用 sync 脚本**。本仓库根目录提供了 `cc-side/` / `h5-side/` / `envelope/` 三个**子目录代理 `package.json`**（每个 `package.json` 把 `main`/`types` 指回 `../dist/...`），任何 moduleResolution（含 Cocos Creator 默认的 classic node）都能直接解析到 `.d.ts`。

```jsonc
// h5-cc-game/package.json
{
  "dependencies": {
    "@silenthill/h5-cc-bridge": "git+ssh://git@github.com:soolary/h5-cc-bridge.git#main"
  }
}
```

```ts
// h5-cc-game/assets/script/H5MsgMgr.ts
import type {
  CocosToH5PayloadMap as SharedCocosToH5PayloadMap,
  H5ToCocosPayloadMap,
  H5NavigatePayload,
} from '@silenthill/h5-cc-bridge/cc-side';

// CC 侧 sendToH5 接受原始字节，本地覆盖一下 wsSend。
export interface CocosToH5PayloadMap extends Omit<SharedCocosToH5PayloadMap, 'wsSend'> {
  wsSend: Uint8Array | ArrayBuffer;
}
```

CC 端只 import 类型，TS 编译后 import 整条被擦除，运行时不依赖该模块——所以 Cocos Creator 2.4 "不解析 node_modules" 这条限制不会触发。

**硬性约束**：CC 端**不能** import bridge 的 runtime 值（`BRIDGE_ACTION.X` 常量、`createBridgeMessage` 等函数）。一旦碰了，那条 import 不会被擦除，Cocos 运行时会找不到 `@silenthill/h5-cc-bridge` 模块崩溃。CC 端发消息全部用字符串字面量（`'wsConnect'` 而不是 `BRIDGE_ACTION.WS_CONNECT`），保持类型纯依赖。

如果哪天 CC 端确实需要共用 envelope，再退回到"sync 源码 + UMD 注入"那一套即可，本仓库的 `cc-side` / `h5-side` 入口仍然可用。

## 版本固定

- 本地开发：两边都 follow `#main`
- 上线发布：tag 切到 `git+https://...#v0.1.0`，commit SHA 同样可用

每次 breaking change（删字段 / 改名）发新 tag 并同步两端 `package.json` 锁定 ref。

## 本地构建

```bash
npm install
npm run build       # tsc → dist/{index.js,index.d.ts,...}
```

`dist/` 已随源码 commit，消费方 `npm install` 后无需再编译；本地修改 `src/*.ts` 后**必须**跑 `npm run build` 并 commit `dist/`，否则 git-hosted 依赖拉到的还是旧产物。

注意：本仓库**故意没有 `prepare` script**。pnpm 在 git-hosted 依赖含 `prepare` 时会拒绝执行，除非加 `onlyBuiltDependencies` 白名单（见 [pnpm 文档](https://pnpm.io/package_json#pnpmonlybuiltdependencies)）。直接 commit `dist/` 让消费方零脚本就能用，更省心。
