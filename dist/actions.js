"use strict";
// Bridge 动作定义（H5 <-> Cocos）。
// 按方向拆成两组常量，便于两端各自只关心自己一侧；BRIDGE_ACTION 合并两组保留对外兼容。
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRIDGE_MSG_TYPE = exports.BRIDGE_ACTION = exports.H5_TO_CC_ACTIONS = exports.CC_TO_H5_ACTIONS = void 0;
exports.normalizeBridgeMsgType = normalizeBridgeMsgType;
// Cocos -> H5：从 CC 侧主动下发的动作。
exports.CC_TO_H5_ACTIONS = {
    // CC 就绪握手动作。
    CC_READY: 'ccReady',
    CC_ACK: 'ccAck',
    // 要求 H5 建立 / 发送 / 关闭 websocket。
    WS_CONNECT: 'wsConnect',
    WS_SEND: 'wsSend',
    WS_CLOSE: 'wsClose',
    // 发起一次 indexedDB 或 localStorage 读/写。
    CC_STORAGE_OP: 'ccStorageOp',
    // UI 控制。
    SHOW_TOAST: 'showToast',
    SHOW_DIALOG: 'showDialog',
    SHOW_PANEL: 'showPanel',
    CLOSE_PANEL: 'closePanel',
    // H5 显隐 / 路由跳转。
    H5_HIDE: 'h5Hide',
    H5_SHOW: 'h5Show',
    H5_NAVIGATE: 'h5Navigate',
    // 心跳频率切换。
    SET_HEARTBEAT_MODE: 'setHeartbeatMode',
};
// H5 -> Cocos：从 H5 侧主动下发的动作。
exports.H5_TO_CC_ACTIONS = {
    // H5 就绪握手动作。
    H5_READY: 'h5Ready',
    H5_ACK: 'h5Ack',
    // 同步 websocket 生命周期与消息。
    WS_OPEN: 'wsOpen',
    WS_MESSAGE: 'wsMessage',
    WS_ERROR: 'wsError',
    WS_CLOSED: 'wsClosed',
    // 重连流程通知（对齐 Unity NetworkDetectionComponent）。
    WS_RECONNECTING: 'wsReconnecting',
    WS_RECONNECTED: 'wsReconnected',
    WS_RECONNECT_FAILED: 'wsReconnectFailed',
    // UI 回执。
    PANEL_EVENT: 'panelEvent',
    DIALOG_RESULT: 'dialogResult',
    // 业务数据同步。
    SYNC_USER: 'syncUser',
    SYNC_USER_CLUB: 'syncUserClub',
    // 当前俱乐部切换同步（H5 切换俱乐部后把内部 club_id 推给 CC）。
    SYNC_CURRENT_CLUB: 'syncCurrentClub',
    SYNC_ROOMS_LIST: 'syncRoomsList',
    SYNC_LANGUAGE: 'syncLanguage',
    SYNC_GLOBAL_CONFIG: 'syncGlobalConfig',
    SYNC_DIAMOND_CONFIG: 'syncDiamondConfig',
    // token 变更同步：H5 登录/续期/登出后把最新 token 推给 CC，保证两端 token 一致。
    SYNC_TOKEN: 'syncToken',
    // 进桌 / 进赛。
    ENTER_TABLE: 'enterTable',
    ENTER_MTT: 'enterMtt',
    // ccStorageOp 的回包 / 全量回灌。
    CC_STORAGE_RESULT: 'ccStorageResult',
    CC_STORAGE_SNAPSHOT: 'ccStorageSnapshot',
};
// 合并视图：原有调用点 `BRIDGE_ACTION.XXX` 全部保留兼容。
exports.BRIDGE_ACTION = Object.assign(Object.assign({}, exports.CC_TO_H5_ACTIONS), exports.H5_TO_CC_ACTIONS);
exports.BRIDGE_MSG_TYPE = {
    // 0：网络透传链路（默认值，兼容旧协议未带 msgtype 的场景）。
    FORWARD: 0,
    // 1：H5 业务层处理链路（例如 toast、ready 握手等）。
    H5: 1,
};
function normalizeBridgeMsgType(raw) {
    return Number(raw) === exports.BRIDGE_MSG_TYPE.H5 ? exports.BRIDGE_MSG_TYPE.H5 : exports.BRIDGE_MSG_TYPE.FORWARD;
}
