import { GameMessage, GameMessageType } from "./messages.js";

interface GameBus {
	send<TGameMessage extends GameMessage>(message: TGameMessage): void;
	read<TGameMessage extends GameMessage>(type: GameMessageType): ReadonlyArray<TGameMessage>;
}

export { GameBus };
