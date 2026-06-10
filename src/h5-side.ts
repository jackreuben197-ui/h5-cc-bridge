// H5 端入口（@silenthill/h5-cc-bridge/h5-side）。
//
// 在 cc-side 的全部类型/常量基础上，额外暴露 envelope 运行时函数
// （createBridgeMessage / toBridgeRaw / parseBridgeRaw / parseBridgeObject 等）。
// h5-game 通过 Vite 打包消费这套；webpack/Cocos 项目应改走 './cc-side' 或 './envelope'。
export * from './cc-side'
export * from './message'
