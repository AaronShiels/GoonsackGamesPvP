interface GameState {
	readonly players: PlayerState[];
}

interface PlayerState {
	readonly id: string;
	readonly name: string;
}

export { GameState, PlayerState };
