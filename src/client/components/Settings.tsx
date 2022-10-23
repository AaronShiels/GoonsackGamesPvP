import { FC, useState } from "react";

const Settings: FC = () => {
	const [playerName, setPlayerName] = useState<string>();
	const handleSubmit = async (): Promise<string> => "";

	return (
		<div>
			<h2>Settings</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="player-name">Player Name:</label>
					<input type="text" name="player-name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
				</div>
				<div>
					<button type="submit">Start</button>
				</div>
			</form>
		</div>
	);
};

export { Settings };
