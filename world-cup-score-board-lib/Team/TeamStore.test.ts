import { beforeEach, describe, expect } from '@jest/globals';
import { TeamStore } from '@/world-cup-score-board-lib/Team/TeamStore';

const TEAM_NAME = 'Mexico';

it('should throw an exception if team name is not a string', () => {
    // prettier-ignore
    expect(() => new TeamStore(null as never))
        .toThrow(`Team name should be a string! Provided: object`);

    // prettier-ignore
    expect(() => new TeamStore(undefined as never))
        .toThrow(`Team name should be a string! Provided: undefined`);

    // prettier-ignore
    expect(() => new TeamStore(100 as never))
        .toThrow(`Team name should be a string! Provided: number`);

    // prettier-ignore
    expect(() => new TeamStore(['teamName'] as never))
        .toThrow(`Team name should be a string! Provided: object`);
});

it('should throw an exception if team name is a whitespace', () => {
    expect(() => new TeamStore(' ')).toThrow('Team name can not be empty!');
    expect(() => new TeamStore('   ')).toThrow('Team name can not be empty!');
});

describe('setScore', () => {
    let team: TeamStore;

    beforeEach(() => {
        team = new TeamStore(TEAM_NAME);
    });

    it('should set score', () => {
        team.setScore(1);
        expect(team.score).toBe(1);
    });

    it('should throw an exception if new score less than 0', () => {
        expect(() => team.setScore(-1)).toThrow('Score can not be less than 0!');
    });

    it('should throw an exception if score is not a number', () => {
        expect(() => team.setScore('100' as never)).toThrow('Score should be a number!');
    });

    it('should throw an exception if score is higher than 100', () => {
        expect(() => team.setScore(101)).toThrow('Score can not be greater than 100!');
    });
});
