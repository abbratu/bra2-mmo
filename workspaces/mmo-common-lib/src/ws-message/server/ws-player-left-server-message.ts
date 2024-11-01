import { WsServerMessage } from "./ws-server-message-base";

export type WsPlayerLeftServerMessageData = { id: number; };
export type WsPlayerLeftServerMessage = WsServerMessage<'player-left', WsPlayerLeftServerMessageData>;