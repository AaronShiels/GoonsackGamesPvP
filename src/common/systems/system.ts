import { GameState } from "../state.js";

type Initialiser<TGameState extends GameState> = (state: TGameState) => void;

type System<TGameState extends GameState> = (state: TGameState, delta: number) => void;

export { System, Initialiser };
