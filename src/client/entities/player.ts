import { Graphics } from "pixi.js";
import { PlayerEntity } from "../../common/entities/player.js";

class ClientPlayerEntity extends Graphics implements PlayerEntity {
	readonly id;
	readonly type = "player";
	readonly size = { x: 10, y: 10 };
	readonly edges = { bottom: true, left: true, right: true, top: true };
	readonly velocity = { x: 0, y: 0 };
	readonly acceleration = { x: 0, y: 0 };
	readonly friction = 0;

	constructor(id: string) {
		super();

		this.id = id;
		super.lineStyle(4, 0xeebb00);
		super.drawRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
	}
}

export { ClientPlayerEntity };
