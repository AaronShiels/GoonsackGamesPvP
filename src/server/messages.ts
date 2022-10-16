import { uniqueId } from "lodash-es";
import { PlayerJoined, PlayerLeft } from "../common/messages.js";

const createPlayerJoined = (playerId: string): PlayerJoined => ({
	id: uniqueId(),
	type: "player-joined",
	playerId
});

const createdPlayerLeft = (playerId: string): PlayerLeft => ({
	id: uniqueId(),
	type: "player-left",
	playerId
});

export { createPlayerJoined, createdPlayerLeft };
