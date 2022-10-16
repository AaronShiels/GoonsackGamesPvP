import { DeepstreamClient } from "@deepstream/client";
import { GameState } from "../common/state.js";
import { timestampMilliseconds } from "../common/utilities/time.js";
import { ServerGameBus, createGameBus } from "./bus.js";
import { createGameState } from "./state.js";
import { playerSystem } from "./systems/player.js";

const { SERVER_HOST, TICK_RATE } = process.env;
if (!SERVER_HOST || !TICK_RATE) throw new Error("Invalid configuration provided");

const interval = 1000 / parseInt(TICK_RATE);

const systems = [playerSystem];

const start = async (): Promise<void> => {
	// Create multiplayer connection
	const connection = new DeepstreamClient(SERVER_HOST);
	await connection.login({ username: "server" });
	connection.on("error", (...args: any[]) => console.error("Connection error", ...args));
	console.log("Server connection established");

	// Initialise components
	const state = createGameState();
	const bus = createGameBus(connection);

	// Start game loop
	setTimeout(() => onTick(state, bus), interval);
	console.log("Game started");
};

let previousTickTimestamp = timestampMilliseconds();

const onTick = (state: GameState, bus: ServerGameBus): void => {
	// Record start time
	const currentTickTimestamp = timestampMilliseconds();
	const delta = currentTickTimestamp - previousTickTimestamp;

	// Run systems
	systems.forEach((system) => system(state, bus, delta));

	// Clean-up
	bus.clear();

	// Register next loop
	previousTickTimestamp = currentTickTimestamp;
	const adjustedInterval = currentTickTimestamp + interval - timestampMilliseconds();
	setTimeout(() => onTick(state, bus), adjustedInterval);
};

start();
