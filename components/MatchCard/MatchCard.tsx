import React, { useCallback } from 'react';
import { ScoreInput } from '@/components/ScoreInput/ScoreInput';
import { observer } from 'mobx-react-lite';
import { GameStore } from '@/world-cup-score-board-lib/GameStore/GameStore';
import { scoreBoardStore } from '@/store/RootStore';

interface MatchCardProps {
    driver: GameStore;
}

const MatchCard: React.FC<MatchCardProps> = observer(({ driver }) => {
    const { awayTeam, homeTeam, id, updateScore } = driver;

    const [localHomeScore, setLocalHomeScore] = React.useState(homeTeam.score);
    const [localAwayScore, setLocalAwayScore] = React.useState(awayTeam.score);

    const { finishGame } = scoreBoardStore;

    const handleUpdate = useCallback(() => {
        try {
            updateScore(localHomeScore, localAwayScore);
        } catch (e) {
            const error = e as Error;
            alert(error?.message);
        }
    }, [localAwayScore, localHomeScore, updateScore]);

    return (
        <div className="rounded-lg border bg-card text-card-foreground w-full overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight flex items-center justify-between text-2xl font-headline">
                    <span className="truncate">{homeTeam.name}</span>
                    <span className="text-muted-foreground mx-2">vs</span>
                    <span className="truncate">{awayTeam.name}</span>
                </div>
                <div className="text-center text-4xl font-bold pt-2 text-foreground">
                    {homeTeam.score} - {awayTeam.score}
                </div>
            </div>

            <div className="p-6 pb-1 pt-0">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <ScoreInput
                            label={`${homeTeam.name} Score`}
                            value={localHomeScore}
                            onChange={setLocalHomeScore}
                        />
                        <ScoreInput
                            label={`${awayTeam.name} Score`}
                            value={localAwayScore}
                            onChange={setLocalAwayScore}
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="whitespace-nowrap rounded-md text-white text-sm font-medium cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-500 text-destructive-foreground hover:bg-gray-600 h-10 px-4 py-2 w-full">
                        Update Score
                    </button>
                </div>
            </div>

            <div className="flex items-center p-6 pt-0">
                <button
                    onClick={() => finishGame(id)}
                    className="text-gray-500 text-sm font-medium cursor-pointer disabled:opacity-50 hover:text-gray-600 h-10 px-4 w-full">
                    Finish Game
                </button>
            </div>
        </div>
    );
});

export default MatchCard;
