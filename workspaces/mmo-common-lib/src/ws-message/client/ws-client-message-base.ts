import { WsMessageBase } from "../ws-message-base";

export type WsClientMessageType = 'player-state-update';
export type WsClientMessage<T extends WsClientMessageType, D> = WsMessageBase<T, D>;


