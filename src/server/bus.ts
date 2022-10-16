import { DeepstreamClient } from "@deepstream/client";
import { GameBus } from "../common/bus.js";
import { GameMessage, GameMessageType } from "../common/messages.js";
import { createdPlayerLeft, createPlayerJoined } from "./messages.js";

interface ServerGameBus extends GameBus {
	clear: () => void;
}

const createGameBus = (connection: DeepstreamClient): ServerGameBus => {
	const messages: GameMessage[] = [];

	connection.presence.subscribe((playerId, online) => {
		const message = online ? createPlayerJoined(playerId) : createdPlayerLeft(playerId);
		messages.push(message);
	});

	const send = <TGameMessage extends GameMessage>(message: TGameMessage) => {};
	const read = <TGameMessage extends GameMessage>(type: GameMessageType) => messages.filter((m) => m.type === type) as TGameMessage[];
	const clear = () => (messages.length = 0);

	return { send, read, clear };
};

export { ServerGameBus, createGameBus };
