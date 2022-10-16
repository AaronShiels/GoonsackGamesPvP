import { DeepstreamClient } from "@deepstream/client";
import { GameState } from "../common/state.js";

interface ServerGameState extends GameState {}

const createGameState = (connection: DeepstreamClient): ServerGameState => {
	connection.on("error", (...args: any[]) => console.error("Connection error", ...args));

	return {
		connection,
		entities: []
	};
};

export { ServerGameState, createGameState };
