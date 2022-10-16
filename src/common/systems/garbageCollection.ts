import { GameState } from "../state.js";
import { System } from "./system.js";

const garbageCollectionSystem: System<GameState> = ({ entities }) => {
	for (let i = entities.length - 1; i >= 0; i--)
		if (entities[i].destroyed) {
			const [deletedEntity] = entities.splice(i, 1);
			console.debug(`Entity ${deletedEntity.id} deleted`);
		}
};

export { garbageCollectionSystem };
