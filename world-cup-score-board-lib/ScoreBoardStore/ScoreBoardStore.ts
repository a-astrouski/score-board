import { GameStore } from '@/world-cup-score-board-lib/GameStore/GameStore';
import { action, makeAutoObservable, observable } from 'mobx';

export class ScoreBoardStore {
    public games: GameStore[] = [];

    public constructor() {
        makeAutoObservable(this, {
            games: observable,
            startGame: action.bound,
            finishGame: action.bound,
            getSummaryOfGamesByTotalScore: action.bound,
        });
    }

    public startGame(homeTeam: string, awayTeam: string) {
        if (this.doesTeamAlreadyPlay(homeTeam)) {
            throw new Error(`Team [${homeTeam}] already plays in another match!`);
        } else if (this.doesTeamAlreadyPlay(awayTeam)) {
            throw new Error(`Team [${awayTeam}] already plays in another match!`);
        }

        this.games = [new GameStore(homeTeam, awayTeam), ...this.games];
    }

    public finishGame(gameId: string) {
        if (!gameId || gameId.trim().length === 0) {
            throw new Error('Game ID cannot be empty');
        }

        if (this.games.findIndex(game => game.id === gameId) === -1) {
            throw new Error('Game does not exist!');
        }

        this.games = this.games.filter(game => game.id !== gameId);
    }

    public getSummaryOfGamesByTotalScore() {
        return [...this.games].sort((a, b) => {
            const totalA = a.homeTeam.score + a.awayTeam.score;
            const totalB = b.homeTeam.score + b.awayTeam.score;

            if (totalA !== totalB) {
                return totalB - totalA;
            }

            return a.creationDate - b.creationDate;
        });
    }

    private doesTeamAlreadyPlay(team: string): boolean {
        return (
            this.games.findIndex(({ homeTeam, awayTeam }) =>
                [homeTeam.name.toUpperCase(), awayTeam.name.toUpperCase()].includes(team.toUpperCase()),
            ) !== -1
        );
    }
}
