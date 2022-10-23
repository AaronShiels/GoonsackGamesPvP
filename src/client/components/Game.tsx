import { FC, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Game: FC = () => {
	return (
		<div>
			<h1>Game</h1>
			<nav>
				<ul>
					<li>
						<Link to={"play"}>Play</Link>
					</li>
					<li>
						<Link to={"settings"}>Settings</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export { Game };
