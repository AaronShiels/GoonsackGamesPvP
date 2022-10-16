import { PlayerJoined } from "../../common/messages.js";
import { System } from "../../common/system.js";

const playerSystem: System = (state, bus, delta) => {
	const playerJoinedMessages = bus.read<PlayerJoined>("player-joined");
	const playerLeftMessages = bus.read<PlayerJoined>("player-left");

	for (const message of playerJoinedMessages) console.log(`Player ${message.playerId} joined`);
	for (const message of playerLeftMessages) console.log(`Player ${message.playerId} left`);
};

export { playerSystem };
