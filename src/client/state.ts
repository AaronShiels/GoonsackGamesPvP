import { DeepstreamClient } from "@deepstream/client";
import { Record as DeepstreamRecord } from "@deepstream/client/dist/src/record/record.js";
import { GameState, Player } from "../common/state.js";

class ClientGameState implements GameState {
	constructor(connection: DeepstreamClient) {
		this._registerHandlers(connection);
	}

	private _registerHandlers(connection: DeepstreamClient) {
		const handlePlayerListChanged = (serverPlayerIds: string[]): void => {
			for (const playerId of serverPlayerIds)
				if (!this.players[playerId]) {
					const newPlayer = new ClientPlayer(connection, playerId);
					this.players[playerId] = newPlayer;

					console.log(`Player ${playerId} joined`);
				}

			for (const playerId of Object.keys(this.players))
				if (!serverPlayerIds.includes(playerId)) {
					delete this.players[playerId];

					console.log(`Player ${playerId} left`);
				}
		};

		const playerList = connection.record.getList("players");
		playerList.subscribe(handlePlayerListChanged);

		console.log("Handlers registers");
	}

	public readonly players: Record<string, ClientPlayer> = {};
}

class ClientPlayer implements Player {
	private readonly _record: DeepstreamRecord;

	constructor(connection: DeepstreamClient, id: string) {
		this._record = connection.record.getRecord(`player/${id}`);
		this.id = id;
	}

	readonly id: string;

	public get name(): string {
		return this._record.get("name") || this.id;
	}
	public set name(value: string) {
		this._record.set("name", value);
	}
}

export { ClientGameState };
