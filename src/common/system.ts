import { GameBus } from "./bus.js";
import { GameState } from "./state.js";

type Initialiser = (state: GameState, bus: GameBus) => void;

type System = (state: GameState, bus: GameBus, delta: number) => void;

export { System, Initialiser };
