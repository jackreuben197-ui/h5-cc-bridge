"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBridgeMessage = createBridgeMessage;
exports.toBridgeRaw = toBridgeRaw;
exports.parseBridgeRaw = parseBridgeRaw;
exports.parseBridgeObject = parseBridgeObject;
const actions_1 = require("./actions");
// 生成带 requestId 和 timestamp 的标准消息，便于排查与去重。
function createBridgeMessage(action, payload, options = {}) {
    return {
        action,
        payload,
        msgtype: options.msgtype === undefined ? actions_1.BRIDGE_MSG_TYPE.H5 : (0, actions_1.normalizeBridgeMsgType)(options.msgtype),
        requestId: `h5_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        timestamp: Date.now(),
    };
}
// 将桥接消息序列化成可传输字符串。
function toBridgeRaw(message) {
    return JSON.stringify(message);
}
// 解析 scheme 形式数据，例如 cocos://bridge?data=<encoded-json>。
function parseSchemeRaw(raw) {
    var _a;
    if (!raw.startsWith('cocos://')) {
        return raw;
    }
    try {
        const parsed = new URL(raw);
        return (_a = parsed.searchParams.get('data')) !== null && _a !== void 0 ? _a : raw;
    }
    catch (_b) {
        const marker = 'data=';
        const idx = raw.indexOf(marker);
        if (idx === -1) {
            return raw;
        }
        return raw.slice(idx + marker.length);
    }
}
// 将原始字符串解析为合法的桥接消息对象。
function parseBridgeRaw(raw) {
    if (!raw) {
        return null;
    }
    const schemeHandled = parseSchemeRaw(raw);
    const maybeDecoded = schemeHandled.includes('%7B') || schemeHandled.includes('%22')
        ? decodeURIComponent(schemeHandled)
        : schemeHandled;
    try {
        const parsed = JSON.parse(maybeDecoded);
        return normalizeBridgeMessage(parsed);
    }
    catch (_a) {
        return null;
    }
}
// 将对象消息解析为合法的桥接消息对象（保留 payload 的原始对象/二进制）。
function parseBridgeObject(raw) {
    if (!raw || typeof raw !== 'object') {
        return null;
    }
    return normalizeBridgeMessage(raw);
}
function normalizeBridgeMessage(parsed) {
    if (!parsed.action) {
        return null;
    }
    // 兼容 Cocos 简化消息：如果没带 requestId/timestamp，则由 H5 自动补齐。
    return {
        action: String(parsed.action),
        payload: parsed.payload,
        source: typeof parsed.source === 'string' ? parsed.source : undefined,
        msgtype: (0, actions_1.normalizeBridgeMsgType)(parsed.msgtype),
        requestId: typeof parsed.requestId === 'string'
            ? parsed.requestId
            : `cocos_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        timestamp: typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now(),
    };
}
