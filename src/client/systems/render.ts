import { DisplayObject } from "pixi.js";
import { Initialiser, System } from "../../common/systems/system.js";
import { ClientGameState } from "../state.js";

const gameResolution = 400;
const renderInit: Initialiser<ClientGameState> = ({ app }) => {
	app.stage.scale.set(app.view.width / gameResolution, app.view.height / gameResolution);
};

const renderSystem: System<ClientGameState> = ({ app, entities }) => {
	for (const entity of entities) {
		if (!(entity instanceof DisplayObject)) continue;

		// Add newly added entities
		if (!entity.parent) app.stage.addChild(entity);
	}
};

export { renderInit, renderSystem };
