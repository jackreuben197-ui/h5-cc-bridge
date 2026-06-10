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
// H5 端入口（@silenthill/h5-cc-bridge/h5-side）。
//
// 在 cc-side 的全部类型/常量基础上，额外暴露 envelope 运行时函数
// （createBridgeMessage / toBridgeRaw / parseBridgeRaw / parseBridgeObject 等）。
// h5-game 通过 Vite 打包消费这套；webpack/Cocos 项目应改走 './cc-side' 或 './envelope'。
__exportStar(require("./cc-side"), exports);
__exportStar(require("./message"), exports);
