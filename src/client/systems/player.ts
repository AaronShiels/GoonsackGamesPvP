import { Initialiser, System } from "../../common/system.js";

const playerInit: Initialiser = (state) => {};

const playerSystem: System = (state, delta) => {
	console.log(`Elapsed time: ${delta}ms`);
};

export { playerSystem };
