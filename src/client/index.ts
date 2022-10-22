import { Application } from "pixi.js";
import { GameState } from "../common/state.js";
import { System } from "../common/system.js";
import { createConnection } from "./connection.js";
import { ClientGameState } from "./state.js";

declare const SERVER_HOST: string;
if (!SERVER_HOST) throw new Error("Invalid configuration provided");

const systems: System[] = [];

const start = async (): Promise<void> => {
	// Create and configure application
	const screenDimension = Math.min(window.innerWidth, window.innerHeight);
	const app = new Application({
		width: screenDimension,
		height: screenDimension,
		autoDensity: true,
		resolution: window.devicePixelRatio
	});
	document.body.appendChild(app.view);

	// Initialise components
	const connection = await createConnection(SERVER_HOST);
	const state = new ClientGameState(connection);

	// Start game loop
	app.ticker.add((delta) => onTick(state, (delta * 1000) / 60));
	console.log("Game started");
};

const onTick = (state: GameState, delta: number): void => {
	systems.forEach((system) => system(state, delta));
};

start();
