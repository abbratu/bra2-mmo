import { WsMessageBase } from "../ws-message-base";

export type WsServerMessageType = 'welcome' | 'player-joined' | 'player-left' | 'player-state-update';
export type WsServerMessage<T extends WsServerMessageType, D> = WsMessageBase<T, D>;


