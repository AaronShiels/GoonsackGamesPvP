import { PhysicsComponent } from "../components/physics.js";
import { Entity } from "./entity.js";

interface PlayerEntity extends Entity, PhysicsComponent {
	readonly type: "player";
}

const isPlayer = (entity: Entity): entity is PlayerEntity => entity.type === "player";

export { PlayerEntity, isPlayer };
