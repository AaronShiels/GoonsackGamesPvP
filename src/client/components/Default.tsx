import { FC, useState } from "react";

const Default: FC = () => {
	const [gameId, setGameId] = useState<string>();
	const handleSubmit = async (): Promise<string> => "";

	return (
		<div>
			<h1>Default</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="game-id">Game ID:</label>
					<input type="text" id="game-id" name="game-id" value={gameId} onChange={(e) => setGameId(e.target.value)} />
				</div>
				<div>
					<button type="submit">Start</button>
				</div>
			</form>
		</div>
	);
};

export { Default };
