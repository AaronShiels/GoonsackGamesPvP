import "bulma/css/bulma.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as ReactRouterDOM from "react-router-dom";
import { Default } from "./components/Default.js";
import { Game } from "./components/Game.js";
import { Play } from "./components/Play.js";
import { Settings } from "./components/Settings.js";

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
const router = ReactRouterDOM.createBrowserRouter([
	{
		element: <Default />,
		path: "/"
	},
	{
		element: <Game />,
		path: "games/:gameId",
		children: [
			{
				element: <Play />,
				index: true
			},
			{
				element: <Settings />,
				path: "settings"
			}
		]
	}
]);

root.render(
	<React.StrictMode>
		<ReactRouterDOM.RouterProvider router={router} />
	</React.StrictMode>
);
