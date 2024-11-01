import { PlayerState } from "../../ws-player";
import { WsServerMessage } from "./ws-server-message-base";

export type WsPlayerStateUpdateServerMessageData = { 
    id: number; 
    state: PlayerState;
};
export type WsPlayerStateUpdateServerMessage = WsServerMessage<'player-state-update', WsPlayerStateUpdateServerMessageData>;