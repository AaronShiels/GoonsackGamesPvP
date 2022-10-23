import { GameState } from "../common/state.js";
import { timestampMilliseconds } from "../common/utilities/time.js";
import { createConnection } from "./connection.js";
import { ServerGameState } from "./state.js";
import { playerSystem } from "./systems/player.js";

const { SERVER_HOST, TICK_RATE } = process.env;
if (!SERVER_HOST || !TICK_RATE) throw new Error("Invalid configuration provided");

const interval = 1000 / parseInt(TICK_RATE);

const start = async (): Promise<void> => {
	// Initialise components
	const connection = await createConnection(SERVER_HOST);
	const state = new ServerGameState(connection);

	// Start game loop
	setTimeout(() => onTick(state), interval);
	console.log("Game started");
};

const systems = [playerSystem];
let previousTickTimestamp = timestampMilliseconds();

const onTick = (state: GameState): void => {
	// Record start time
	const currentTickTimestamp = timestampMilliseconds();
	const delta = currentTickTimestamp - previousTickTimestamp;

	// Run systems
	systems.forEach((system) => system(state, delta));

	// Register next loop
	previousTickTimestamp = currentTickTimestamp;
	const adjustedInterval = currentTickTimestamp + interval - timestampMilliseconds();
	setTimeout(() => onTick(state), adjustedInterval);
};

start();
