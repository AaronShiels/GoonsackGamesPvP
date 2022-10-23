import { DeepstreamClient } from "@deepstream/client";

const createConnection = async (host: string, playerId: string): Promise<DeepstreamClient> => {
	const connection = new DeepstreamClient(host);
	await connection.login({ username: playerId });
	connection.on("error", (...args: any[]) => console.error("Connection error", ...args));

	console.log("Connection established");

	return connection;
};

export { createConnection };
