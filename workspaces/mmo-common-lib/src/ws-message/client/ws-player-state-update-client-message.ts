import { PlayerState } from "./../../ws-player";
import { WsClientMessage } from "./ws-client-message-base";


export type WsPlayerStateUpdateClientrMessage = WsClientMessage<'player-state-update', PlayerState>;