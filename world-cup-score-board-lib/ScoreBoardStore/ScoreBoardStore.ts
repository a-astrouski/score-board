import { GameStore } from '@/world-cup-score-board-lib/GameStore/GameStore';

export class ScoreBoardStore {
    public games: GameStore[] = [];

    public constructor() {}

    public startGame(homeTeam: string, awayTeam: string) {
        if (this.doesTeamAlreadyPlay(homeTeam)) {
            throw new Error(`Team [${homeTeam}] already plays in another match!`);
        } else if (this.doesTeamAlreadyPlay(awayTeam)) {
            throw new Error(`Team [${awayTeam}] already plays in another match!`);
        }

        this.games.unshift(new GameStore(homeTeam, awayTeam));
    }

    public finishGame() {}

    public getSummaryOfGamesByTotalScore() {}

    private doesTeamAlreadyPlay(team: string): boolean {
        return (
            this.games.findIndex(({ homeTeam, awayTeam }) =>
                [homeTeam.name.toUpperCase(), awayTeam.name.toUpperCase()].includes(team.toUpperCase()),
            ) !== -1
        );
    }
}
