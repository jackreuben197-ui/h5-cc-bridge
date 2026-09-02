export interface WsConnectPayload {
    url?: string;
    port?: number;
    roomId?: number;
    matchId?: number;
    force?: boolean;
}
export interface WsSendTextPayload {
    dataType: 'text';
    text?: string;
}
export interface WsSendBinaryPayload {
    dataType: 'binary';
    data?: ArrayBuffer | ArrayBufferView | Blob;
}
export type WsSendPayload = WsSendTextPayload | WsSendBinaryPayload;
export interface WsClosePayload {
    code?: number;
    reason?: string;
}
export interface CocosToastPayload {
    type: 'success' | 'danger';
    message: string;
    duration?: number;
}
export interface CocosDialogPayload {
    title?: string;
    message: string;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    cancelButtonText?: string;
    confirmButtonText?: string;
    closeOnClickOverlay?: boolean;
    ensureVisible?: boolean;
}
export interface CocosPanelPayload {
    panelType: string;
    title?: string;
    props?: Record<string, unknown>;
    closeOnClickOverlay?: boolean;
    ensureVisible?: boolean;
    showH5Bg?: boolean;
}
export interface ClosePanelPayload {
    requestId?: string;
    panelType?: string;
}
export interface H5VisibilityPayload {
    reason?: string;
}
export interface CcIndexedDBOpPayload {
    requestId: string;
    storage: 'indexeddb';
    store: string;
    op: 'get' | 'getAll' | 'put' | 'delete' | 'clear';
    key?: IDBValidKey;
    value?: unknown;
}
export interface CcLocalStorageOpPayload {
    requestId?: string;
    storage: 'localstorage';
    op: 'get' | 'set' | 'remove' | 'clear';
    key?: string;
    value?: string;
}
export type CcStorageOpPayload = CcIndexedDBOpPayload | CcLocalStorageOpPayload;
export interface SetHeartbeatModePayload {
    mode: 'normal' | 'in-gameplay';
}
export declare const H5_LOGIN_CONTEXT: {
    readonly TABLE_SITDOWN: "table-sitdown";
};
export type H5LoginContext = (typeof H5_LOGIN_CONTEXT)[keyof typeof H5_LOGIN_CONTEXT];
export interface H5NavigatePayload {
    path?: string;
    name?: string;
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
    hash?: string;
    replace?: boolean;
    ensureVisible?: boolean;
    openLoginModal?: boolean;
    loginContext?: H5LoginContext;
}
export interface CocosToH5PayloadMap {
    ccReady: undefined;
    ccAck: undefined;
    wsConnect: WsConnectPayload;
    /** H5 接收到的 wsSend payload 为已包装的 binary 信封（Cocos 内部自动封装）。*/
    wsSend: WsSendPayload;
    wsClose: WsClosePayload;
    showToast: CocosToastPayload;
    showDialog: CocosDialogPayload;
    showPanel: CocosPanelPayload;
    closePanel: ClosePanelPayload;
    h5Hide: H5VisibilityPayload | undefined;
    h5Show: H5VisibilityPayload | undefined;
    h5Navigate: H5NavigatePayload;
    setHeartbeatMode: SetHeartbeatModePayload;
    ccStorageOp: CcStorageOpPayload;
}
