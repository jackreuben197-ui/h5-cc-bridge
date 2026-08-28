export interface WsOpenPayload {
    url: string;
}
export interface WsMessageTextPayload {
    dataType: 'text';
    text?: string;
}
export interface WsMessageBinaryPayload {
    dataType: 'binary';
    data?: ArrayBuffer | ArrayBufferView | Blob;
}
export type WsMessagePayload = WsMessageTextPayload | WsMessageBinaryPayload;
export interface H5ReadyPayload {
    token?: string;
    safeArea?: SafeArea;
}
export interface SafeArea {
    top: number;
    left: number;
    right: number;
    bottom: number;
    source?: string;
}
export interface WsErrorPayload {
    message: string;
}
export interface WsClosedPayload {
    code?: number;
    reason?: string;
    wasClean?: boolean;
}
export interface WsReconnectingPayload {
    attempt: number;
    delayMs: number;
    reason: 'close' | 'heartbeat' | 'visibility' | 'online' | 'force';
}
export interface WsReconnectedPayload {
    url: string;
    attempt: number;
    durationMs: number;
}
export interface WsReconnectFailedPayload {
    reason: 'max-attempts' | 'overall-timeout' | 'auth-invalid';
    attempts: number;
    durationMs: number;
}
export interface DialogResultPayload {
    dialogRequestId: string;
    action: 'confirm' | 'cancel' | 'close';
}
export interface PanelEventPayload {
    panelRequestId: string;
    event: string;
    payload?: unknown;
}
export interface EnterTableRoomInfo {
    rid: number;
    name?: string;
    room_type: number;
    game_type: number;
    poker_type: number;
    limit_bet_type?: number;
    seat_count: number;
    service_id?: string | number;
    straddle_on?: number;
    insurance_on?: number;
    muck_on?: number;
    origin_type?: number;
    share_table?: number;
    gold_type?: number;
    club_id?: number;
    club_random_id?: number;
    tribe_id?: number;
    limit_bring_in?: number;
    anti_cheat_type?: number;
    jackpot_id?: number | string;
}
export interface EnterTablePayload {
    userName?: string;
    userId?: string;
    token: string;
    websocketPort: number;
    from?: string;
    clubId?: number;
    clubRandomId?: number;
    roomId?: string;
    roomName?: string;
    roomInfo: unknown;
}
export interface EnterMttMatchInfo {
    match_id: number;
    type: number;
}
export interface EnterMttPayload {
    userName?: string;
    userId?: string;
    token?: string;
    websocketPort: number;
    from?: string;
    matchId?: number;
    matchName?: string;
    roomId?: number;
    isLookOn?: boolean;
    matchInfo: unknown;
}
export interface SyncUserInfo {
    un_id: number | string;
    p_u_id?: number | string;
    phone?: string;
    sex?: number;
    nickname?: string;
    avatar?: string;
    ut?: number;
    club_id?: number;
}
export interface SyncUserPayload {
    uid?: string;
    nickname?: string;
    avatar?: string;
    raw?: unknown;
}
export interface ClubInfo {
    club_id: number;
    club_name: string;
    logo?: string;
    random_id?: number;
    upper_limit?: number;
    club_members?: number;
    area_id?: string;
    club_type?: number;
    create_time?: string;
    is_official?: number;
    club_status?: number;
    desc?: string;
    contact_info?: unknown;
    member_type?: number;
    more_contact?: string;
    level?: number;
    search_switch?: number;
    auto_audit_switch?: number;
    show_contact_switch?: number;
    club_creator_random_id?: number;
    club_creator_avatar?: string;
    club_creator_nickname?: string;
    tribe_name?: string;
    tribe_id?: number;
    tribe_logo?: string;
    tribe_random_id?: number;
    user_level?: number;
    players?: number;
    tables?: number;
    show_notice_switch?: number;
    gold_to_usdt_rate?: number;
    usdt_to_gold_rate?: number;
    digital_wallet_switch?: number;
    digital_wallet_erc?: string;
    digital_wallet_trc?: string;
}
export interface SyncUserClubResponse {
    code?: number;
    message?: string;
    data?: ClubInfo[];
}
export interface SyncUserClubPayload {
    response?: unknown;
}
export interface SyncCurrentClubPayload {
    clubId?: number;
}
export interface SyncRoomsListPayload {
    request: unknown;
    response: unknown;
}
export interface SyncLanguagePayload {
    locale: string;
}
export interface SyncGlobalConfigPayload {
    raw?: Record<string, unknown>;
}
export interface SyncDiamondConfigPayload {
    raw?: Record<number, unknown>;
}
export interface SyncTokenPayload {
    token: string;
    expireAt?: number;
}
export interface CocosAckPayload {
    ok: boolean;
    message: string;
}
export interface CcStorageResultPayload {
    requestId: string;
    ok: boolean;
    value?: unknown;
    error?: string;
}
export interface CcStorageSnapshotPayload {
    entries: Record<string, string>;
}
export interface H5ToCocosPayloadMap {
    h5Ready: H5ReadyPayload;
    h5Ack: undefined;
    wsOpen: WsOpenPayload;
    wsMessage: WsMessagePayload;
    wsError: WsErrorPayload;
    wsClosed: WsClosedPayload;
    wsReconnecting: WsReconnectingPayload;
    wsReconnected: WsReconnectedPayload;
    wsReconnectFailed: WsReconnectFailedPayload;
    dialogResult: DialogResultPayload;
    panelEvent: PanelEventPayload;
    enterTable: EnterTablePayload;
    enterMtt: EnterMttPayload;
    exitTable: unknown;
    syncUser: SyncUserPayload;
    syncUserClub: SyncUserClubPayload;
    syncCurrentClub: SyncCurrentClubPayload;
    syncRoomsList: SyncRoomsListPayload;
    syncLanguage: SyncLanguagePayload;
    syncGlobalConfig: SyncGlobalConfigPayload;
    syncDiamondConfig: SyncDiamondConfigPayload;
    syncToken: SyncTokenPayload;
}
