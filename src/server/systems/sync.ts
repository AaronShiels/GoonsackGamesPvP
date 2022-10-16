import { System } from "../../common/systems/system.js";
import { ServerGameState } from "../state.js";

const syncSystem: System<ServerGameState> = ({ entities, connection }) => {
	const entityRecordsList = connection.record.getList("entities");
	if (!entityRecordsList.isReady) return;

	// Synchronise existing entities with clients
	const knownRecordIds = entityRecordsList.getEntries();
	for (const entity of entities) {
		if (!knownRecordIds.includes(entity.id)) {
			entityRecordsList.addEntry(entity.id);
			console.debug(`Entity record ${entity.id} created`);
		}

		const entityRecord = connection.record.getRecord(entity.id);
		if (!entityRecord.isReady) continue;

		// TODO sync attributes
	}

	// Synchronise deleted entities with clients
	const actualEntityIds = entities.map((e) => e.id);
	const staleRecordIds = knownRecordIds.filter((id) => !actualEntityIds.includes(id));
	for (const staleRecordId of staleRecordIds) {
		entityRecordsList.removeEntry(staleRecordId);
		connection.record.delete(staleRecordId);
		console.debug(`Entity record ${staleRecordId} deleted`);
	}
};

export { syncSystem };
