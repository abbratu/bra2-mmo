import { PlayerData } from "../../ws-player";
import { WsServerMessage } from "./ws-server-message-base";

export type WsPlayerJoinedServerMessageData = { player: PlayerData; };
export type WsPlayerJoinedServerMessage = WsServerMessage<'player-joined', WsPlayerJoinedServerMessageData>;