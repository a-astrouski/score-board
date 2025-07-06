export class TeamStore {
    public id: string;
    public name: string;
    public score: number;

    public constructor(name: string) {
        this.name = name;
        this.score = 0;
        this.id = `team-${name}}`;
    }

    public getScore() {}

    public setScore() {}
}
