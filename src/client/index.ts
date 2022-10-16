import { DeepstreamClient } from "@deepstream/client";
import { settings, SCALE_MODES, Application } from "pixi.js";
import { GameState } from "../common/state.js";
import { garbageCollectionSystem } from "../common/systems/garbageCollection.js";
import { Initialiser, System } from "../common/systems/system.js";
import { ClientGameState, createGameState } from "./state.js";
import { renderInit, renderSystem } from "./systems/render.js";
import { syncSystem } from "./systems/sync.js";

declare const SERVER_HOST: string;
if (!SERVER_HOST) throw new Error("Invalid configuration provided");

settings.SCALE_MODE = SCALE_MODES.NEAREST;
settings.SORTABLE_CHILDREN = true;

const initialisers: ReadonlyArray<Initialiser<GameState> | Initialiser<ClientGameState>> = [renderInit];
const systems: ReadonlyArray<System<GameState> | System<ClientGameState>> = [syncSystem, renderSystem, garbageCollectionSystem];

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

	// Create and initialise state
	const state = createGameState(app, connection);
	initialisers.forEach((init) => init(state));

	// Start game loop
	app.ticker.add((delta) => onTick(state, (delta * 1000) / 60));
	console.log("Game started");
};

const onTick = (state: ClientGameState, delta: number): void => {
	systems.forEach((system) => system(state, delta));
};

start();
