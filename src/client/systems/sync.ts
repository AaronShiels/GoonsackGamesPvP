import { System } from "../../common/systems/system.js";
import { ClientPlayerEntity } from "../entities/player.js";
import { ClientGameState } from "../state.js";

const syncSystem: System<ClientGameState> = ({ entities, connection }) => {
	const entityRecordsList = connection.record.getList("entities");
	if (!entityRecordsList.isReady) return;

	// Synchronise new entries from server
	const knownRecordIds = entityRecordsList.getEntries();
	const actualEntityIds = entities.map((e) => e.id);
	const newRecordIds = knownRecordIds.filter((id) => !actualEntityIds.includes(id));
	for (const newRecordId of newRecordIds) {
		const playerEntity = new ClientPlayerEntity(newRecordId);
		entities.push(playerEntity);
		console.debug(`Entity ${newRecordId} created`);
	}

	// Synchronise existing entries from server
	for (const entity of entities) {
		if (!knownRecordIds.includes(entity.id)) {
			entity.destroyed = true;
		}

		const entityRecord = connection.record.getRecord(entity.id);
		if (!entityRecord.isReady) continue;

		// TODO sync attributes
	}
};

export { syncSystem };
