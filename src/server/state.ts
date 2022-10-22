import { DeepstreamClient } from "@deepstream/client";
import { Record as DeepstreamRecord } from "@deepstream/client/dist/src/record/record.js";
import { GameState, Player } from "../common/state.js";

class ServerGameState implements GameState {
	constructor(connection: DeepstreamClient) {
		this._registerHandlers(connection);
	}

	private _registerHandlers(connection: DeepstreamClient) {
		const handlePresenceChanged = (playerId: string, online: boolean): void => {
			const playerList = connection.record.getList("players");
			if (online) {
				this.players[playerId] = new ServerPlayer(connection, playerId);
				playerList.addEntry(playerId);

				console.log(`Player ${playerId} joined`);
			} else {
				this.players[playerId].delete();
				delete this.players[playerId];
				playerList.removeEntry(playerId);

				console.log(`Player ${playerId} left`);
			}
		};

		connection.presence.subscribe(handlePresenceChanged);

		console.log("Handlers registered");
	}

	public readonly players: Record<string, ServerPlayer> = {};
}

class ServerPlayer implements Player {
	private readonly _record: DeepstreamRecord;

	constructor(connection: DeepstreamClient, id: string) {
		this._record = connection.record.getRecord(`player/${id}`);
		this.id = id;
	}

	readonly id: string;

	public get name(): string {
		return this._record.get("name") || this.id;
	}
	public set name(_: string) {
		throw new Error("This property is client controlled.");
	}

	public delete(): void {
		this._record.delete();
	}
}

export { ServerGameState };
