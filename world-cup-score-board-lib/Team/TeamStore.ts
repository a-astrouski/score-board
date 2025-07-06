export class TeamStore {
    public id: string;
    public name: string;
    public score: number;

    public constructor(name: string) {
        this.guardTeamName(name);
        this.name = name;
        this.score = 0;
        this.id = `team-${name}}`;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.guardScore(score);
        this.score = score;
    }

    private guardTeamName(name: string): void {
        if (typeof name !== 'string') {
            throw new Error(`Team name should be a string! Provided: ${typeof name}`);
        }

        if (this.isStringEmpty(name)) {
            throw new Error('Team name can not be empty!');
        }
    }

    private guardScore(score: number): void {
        if (score < 0) {
            throw new Error('Score can not be less than 0!');
        } else if (score > 100) {
            throw new Error('Score can not be greater than 100!');
        }

        if (typeof score !== 'number') {
            throw new Error('Score should be a number!');
        }
    }

    private isStringEmpty(line: string): boolean {
        return line.trim().length === 0;
    }
}
