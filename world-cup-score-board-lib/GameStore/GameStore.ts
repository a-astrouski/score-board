import { TeamStore } from '../Team/TeamStore';
import { action, makeAutoObservable } from 'mobx';

export class GameStore {
    public id: string;
    public homeTeam: TeamStore;
    public awayTeam: TeamStore;
    public creationDate: number;

    public constructor(homeTeam: string, awayTeam: string) {
        this.assertTeamNamesAreDifferent(homeTeam, awayTeam);
        this.homeTeam = new TeamStore(homeTeam);
        this.awayTeam = new TeamStore(awayTeam);
        this.id = `game-${homeTeam}-${awayTeam}`;
        this.creationDate = Date.now();

        makeAutoObservable(this, {
            updateScore: action.bound,
        });
    }

    public updateScore(homeTeamScore: number, awayTeamScore: number) {
        this.homeTeam.setScore(homeTeamScore);
        this.awayTeam.setScore(awayTeamScore);
    }

    private assertTeamNamesAreDifferent(homeTeam: string, awayTeam: string): void {
        if (homeTeam === awayTeam) {
            throw new Error(`Teams should be different! HomeTeam: [${homeTeam}], AwayTeam: [${awayTeam}]`);
        }
    }
}
