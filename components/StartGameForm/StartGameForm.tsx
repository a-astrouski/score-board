import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { scoreBoardStore } from '@/store/RootStore';

const StartGameForm: React.FC = observer(() => {
    const [homeTeam, setHomeTeam] = React.useState('');
    const [awayTeam, setAwayTeam] = React.useState('');

    const { startGame, getSummaryOfGamesByTotalScore } = scoreBoardStore;

    const handleHomeTeamInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setHomeTeam(e.target.value);
    }, []);

    const handleAwayTeamInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAwayTeam(e.target.value);
    }, []);

    const handleStartGame = useCallback(() => {
        try {
            startGame(homeTeam, awayTeam);
            setHomeTeam('');
            setAwayTeam('');
        } catch (e) {
            const error = e as Error;
            alert(error?.message);
        }
    }, [startGame, homeTeam, awayTeam]);

    const handleDisplaySummary = useCallback(() => {
        try {
            const summary = getSummaryOfGamesByTotalScore();
            // prettier-ignore
            const serialisedArray = summary
                .map((game, i) =>
                    `${i + 1}. ${game.homeTeam.name} ${game.homeTeam.score} – ${game.awayTeam.name} ${game.awayTeam.score}`)
                .join('\n');

            alert(serialisedArray);
        } catch (e) {
            const error = e as Error;
            alert(error?.message);
        }
    }, []);

    return (
        <div className="rounded-lg border border-gray-200 bg-white text-gray-900 shadow">
            <div className="flex flex-col gap-1.5 p-6">
                <div className="text-2xl font-semibold tracking-tight">Start a New Game</div>
                <div className="text-sm text-gray-500">
                    Enter the team names to add a match to the scoreboard.
                </div>
            </div>

            <div className="p-6 pt-0">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                            <label htmlFor="homeTeam" className="text-sm font-medium">
                                Home Team
                            </label>
                            <input
                                id="homeTeam"
                                name="homeTeam"
                                value={homeTeam}
                                onChange={handleHomeTeamInputChange}
                                placeholder="e.g. Brazil"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-base"
                            />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                            <label htmlFor="awayTeam" className="text-sm font-medium">
                                Away Team
                            </label>
                            <input
                                id="awayTeam"
                                name="awayTeam"
                                value={awayTeam}
                                onChange={handleAwayTeamInputChange}
                                placeholder="e.g. Argentina"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-base"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleStartGame}
                            className="h-10 w-full  cursor-pointer rounded-md bg-blue-500 px-4 text-sm font-medium text-white hover:bg-blue-600">
                            Start Game
                        </button>
                        <button
                            onClick={handleDisplaySummary}
                            className="cursor-pointer px-4 text-sm font-medium text-blue-500 hover:text-blue-600">
                            Games Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default StartGameForm;
