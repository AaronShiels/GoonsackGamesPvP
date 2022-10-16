import { DeepstreamClient } from "@deepstream/client";
import { GameState } from "../common/state.js";
import { garbageCollectionSystem } from "../common/systems/garbageCollection.js";
import { Initialiser, System } from "../common/systems/system.js";
import { timestampMilliseconds } from "../common/utilities/time.js";
import { createGameState, ServerGameState } from "./state.js";
import { syncSystem } from "./systems/sync.js";
import { worldInit } from "./systems/world.js";

const { SERVER_HOST, TICK_RATE } = process.env;
if (!SERVER_HOST || !TICK_RATE) throw new Error("Invalid configuration provided");

const interval = 1000 / parseInt(TICK_RATE);
const initialisers: ReadonlyArray<Initialiser<GameState> | Initialiser<ServerGameState>> = [worldInit];
const systems: ReadonlyArray<System<GameState> | System<ServerGameState>> = [syncSystem, garbageCollectionSystem];

const start = async (): Promise<void> => {
	// Create multiplayer connection
	const connection = new DeepstreamClient(SERVER_HOST);
	await connection.login({ username: "server" });
	console.log("Server connection established");

	// Create and initialise state
	const state = createGameState(connection);
	initialisers.forEach((init) => init(state));

	// Start game loop
	setTimeout(() => onTick(state), interval);
	console.log("Game started");
};

let previousTickTimestamp = timestampMilliseconds();

const onTick = (state: ServerGameState): void => {
	const currentTickTimestamp = timestampMilliseconds();
	const delta = currentTickTimestamp - previousTickTimestamp;

	systems.forEach((system) => system(state, delta));

	previousTickTimestamp = currentTickTimestamp;
	const adjustedInterval = currentTickTimestamp + interval - timestampMilliseconds();
	setTimeout(() => onTick(state), adjustedInterval);
};

start();
