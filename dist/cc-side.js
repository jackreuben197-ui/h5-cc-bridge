"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeBridgeMsgType = exports.BRIDGE_MSG_TYPE = exports.H5_TO_CC_ACTIONS = exports.CC_TO_H5_ACTIONS = exports.BRIDGE_ACTION = void 0;
// CC 端入口（@silenthill/h5-cc-bridge/cc-side）。
//
// 暴露给 Cocos Creator 项目使用的协议表面：
//   - 所有 action 常量（CC→H5 发的 + H5→CC 收的）
//   - CC→H5 payload 类型（CC 作为 sender 写入 sendToH5 时的类型约束）
//   - H5→CC payload 类型（CC 作为 receiver 解码时的类型约束）
//
// 故意不再导出 envelope 函数（createBridgeMessage / parseBridgeRaw / ...），
// 因为 CC 历史上由 H5MsgMgr.ts 自实现一份 BridgeRawMessage 序列化。
// 如果未来 CC 想统一走共享 envelope，从 './message' 显式 import 即可。
var actions_1 = require("./actions");
Object.defineProperty(exports, "BRIDGE_ACTION", { enumerable: true, get: function () { return actions_1.BRIDGE_ACTION; } });
Object.defineProperty(exports, "CC_TO_H5_ACTIONS", { enumerable: true, get: function () { return actions_1.CC_TO_H5_ACTIONS; } });
Object.defineProperty(exports, "H5_TO_CC_ACTIONS", { enumerable: true, get: function () { return actions_1.H5_TO_CC_ACTIONS; } });
Object.defineProperty(exports, "BRIDGE_MSG_TYPE", { enumerable: true, get: function () { return actions_1.BRIDGE_MSG_TYPE; } });
Object.defineProperty(exports, "normalizeBridgeMsgType", { enumerable: true, get: function () { return actions_1.normalizeBridgeMsgType; } });
__exportStar(require("./cocosToH5"), exports);
__exportStar(require("./h5ToCocos"), exports);
