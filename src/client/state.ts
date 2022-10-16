import { DeepstreamClient } from "@deepstream/client";
import { Application } from "pixi.js";
import { GameState } from "../common/state.js";

interface ClientGameState extends GameState {
	app: Application;
}

const createGameState = (app: Application, connection: DeepstreamClient): ClientGameState => {
	return {
		app,
		connection,
		entities: []
	};
};

export { ClientGameState, createGameState };
