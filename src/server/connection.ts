import { DeepstreamClient } from "@deepstream/client";

const createConnection = async (host: string): Promise<DeepstreamClient> => {
	const connection = new DeepstreamClient(host);
	await connection.login({ username: "server" });
	connection.on("error", (...args: any[]) => console.error("Connection error", ...args));

	console.log("Connection established");

	return connection;
};

export { createConnection };
