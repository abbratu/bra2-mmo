import { PlayerData } from "../../ws-player";
import { WsServerMessage } from "./ws-server-message-base";

export type WsWelcomeServerMessageData = {
    playerId: number;
    players: PlayerData[];
};
export type WsWelcomeServerMessage = WsServerMessage<'welcome', WsWelcomeServerMessageData>;