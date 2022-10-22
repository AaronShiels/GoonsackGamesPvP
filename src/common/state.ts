interface GameState {
	readonly players: Readonly<Record<string, Player>>;
}

interface Player {
	readonly id: string;
	readonly name: string;
}

export { GameState, Player };
