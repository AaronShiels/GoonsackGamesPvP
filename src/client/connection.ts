import { DeepstreamClient } from "@deepstream/client";
import { v4 } from "uuid";

const createConnection = async (host: string): Promise<DeepstreamClient> => {
	const playerId = getPlayerId();

	console.log(`Player ID resolved as ${playerId}`);

	const connection = new DeepstreamClient(host);
	await connection.login({ username: playerId });
	connection.on("error", (...args: any[]) => console.error("Connection error", ...args));

	console.log("Connection established");

	return connection;
};

const getPlayerId = () => {
	const playerId = localStorage.getItem("player-id");
	if (playerId) return playerId;

	const newPlayerId = v4();
	localStorage.setItem("player-id", newPlayerId);
	return newPlayerId;
};

export { createConnection };
