import { Application } from "pixi.js";
import { v4 } from "uuid";
import { GameState } from "../common/state.js";
import { System } from "../common/system.js";
import { createConnection } from "./connection.js";
import { ClientGameState } from "./state.js";

const startForm = document.getElementById("start") as HTMLFormElement;

// Ensure Player ID
let playerId = localStorage.getItem("player-id") || undefined;
if (!playerId) {
	playerId = v4();
	localStorage.setItem("player-id", playerId);
}

// Initialise Player Name
const existingPlayerName = localStorage.getItem("player-name");
if (existingPlayerName) {
	const playerNameInput = document.getElementById("start-player-name") as HTMLInputElement;
	playerNameInput.value = existingPlayerName;
}

const start = async (): Promise<void> => {
	// Set Player Name
	const data = new FormData(startForm);
	const playerName = data.get("player-name");
	if (!playerName || typeof playerName !== "string") throw new Error("Player Name is empty!");
	localStorage.setItem("player-name", playerName);

	// Create and configure application
	const screenDimension = Math.min(window.innerWidth, window.innerHeight);
	const app = new Application({
		width: screenDimension,
		height: screenDimension,
		autoDensity: true,
		resolution: window.devicePixelRatio
	});
	startForm.remove();
	document.body.appendChild(app.view);

	// Initialise components
	const serverHost = `${location.hostname}:6020`;
	const connection = await createConnection(serverHost, playerId!);
	const state = new ClientGameState(connection);

	// Start game loop
	app.ticker.add((delta) => onTick(state, (delta * 1000) / 60));

	console.log("Game started");
};

const systems: System[] = [];

const onTick = (state: GameState, delta: number): void => {
	systems.forEach((system) => system(state, delta));
};

startForm.onsubmit = start;
