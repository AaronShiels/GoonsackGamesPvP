import { DeepstreamClient } from "@deepstream/client";
import { Application } from "pixi.js";
import { GameBus } from "../common/bus.js";
import { GameState } from "../common/state.js";
import { System } from "../common/system.js";
import { createGameBus } from "./bus.js";
import { createGameState } from "./state.js";

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

	// Create multiplayer connection
	const connection = new DeepstreamClient(SERVER_HOST);
	await connection.login({ username: "client" });
	connection.on("error", (...args: any[]) => console.error("Connection error", ...args));
	console.log("Server connection established");

	// Initialise components
	const state = createGameState();
	const bus = createGameBus(connection);

	// Start game loop
	app.ticker.add((delta) => onTick(state, bus, (delta * 1000) / 60));
	console.log("Game started");
};

const onTick = (state: GameState, bus: GameBus, delta: number): void => {
	systems.forEach((system) => system(state, bus, delta));
};

start();
