import { DeepstreamClient } from "@deepstream/client";
import { GameBus } from "../common/bus.js";
import { GameMessage } from "../common/messages.js";

const createGameBus = (connection: DeepstreamClient): GameBus => {
	const send = <TGameMessage extends GameMessage>(message: TGameMessage) => {};
	const read = () => [];

	return { send, read };
};

export { createGameBus };
