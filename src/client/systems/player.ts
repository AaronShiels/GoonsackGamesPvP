import { Initialiser, System } from "../../common/system.js";

const playerInit: Initialiser = (state, bus) => {};

const playerSystem: System = (state, bus, delta) => {
	console.log(`Elapsed time: ${delta}ms`);
};

export { playerSystem };
