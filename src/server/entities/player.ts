import { uniqueId } from "lodash-es";
import { PlayerEntity } from "../../common/entities/player.js";

class ServerPlayerEntity implements PlayerEntity {
	readonly id = uniqueId("player/");
	readonly type = "player";
	readonly position = { x: 0, y: 0 };
	readonly size = { x: 10, y: 10 };
	readonly edges = { bottom: true, left: true, right: true, top: true };
	readonly velocity = { x: 0, y: 0 };
	readonly acceleration = { x: 0, y: 0 };
	readonly friction = 0;
	destroyed = false;
}

export { ServerPlayerEntity };
