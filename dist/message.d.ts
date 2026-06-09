import { type BridgeAction, type BridgeMsgType } from './actions';
export interface BridgeMessage<TPayload = unknown> {
    action: BridgeAction | string;
    payload: TPayload;
    source?: string;
    msgtype: BridgeMsgType;
    requestId: string;
    timestamp: number;
}
export interface CreateBridgeMessageOptions {
    msgtype?: BridgeMsgType;
}
export declare function createBridgeMessage<TPayload>(action: BridgeAction | string, payload: TPayload, options?: CreateBridgeMessageOptions): BridgeMessage<TPayload>;
export declare function toBridgeRaw(message: BridgeMessage): string;
export declare function parseBridgeRaw(raw: string): BridgeMessage | null;
export declare function parseBridgeObject(raw: unknown): BridgeMessage | null;
