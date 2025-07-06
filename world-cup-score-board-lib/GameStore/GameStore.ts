import { TeamStore } from '../Team/TeamStore';

export class GameStore {
    public id: string;
    public homeTeam: TeamStore;
    public awayTeam: TeamStore;
    public creationDate: Date;

    public constructor(homeTeam: string, awayTeam: string) {
        this.homeTeam = new TeamStore(homeTeam);
        this.awayTeam = new TeamStore(awayTeam);
        this.id = `game-${homeTeam}-${awayTeam}`;
        this.creationDate = new Date();
    }

    public updateScore() {}
}
