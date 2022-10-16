import { Initialiser } from "../../common/systems/system.js";
import { ServerPlayerEntity } from "../entities/player.js";
import { ServerGameState } from "../state.js";

const worldInit: Initialiser<ServerGameState> = ({ entities }) => {
	const testPlayer = new ServerPlayerEntity();
	entities.push(testPlayer);
	console.debug(`Entity ${testPlayer.id} created`);
};

export { worldInit };
