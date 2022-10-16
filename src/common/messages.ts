type GameMessageType = "player-joined" | "player-left";

interface GameMessage {
	readonly id: string;
	readonly type: GameMessageType;
}

interface PlayerJoined extends GameMessage {
	readonly playerId: string;
	readonly type: "player-joined";
}

interface PlayerLeft extends GameMessage {
	readonly playerId: string;
	readonly type: "player-left";
}

export { GameMessageType, GameMessage, PlayerJoined, PlayerLeft };
