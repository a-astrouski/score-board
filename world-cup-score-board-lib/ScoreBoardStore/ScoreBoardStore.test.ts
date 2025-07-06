import { ScoreBoardStore } from '@/world-cup-score-board-lib/ScoreBoardStore/ScoreBoardStore';
import { GameStore } from '@/world-cup-score-board-lib/GameStore/GameStore';

describe('startGame', () => {
    let scoreBoard: ScoreBoardStore;
    const A_TEAM_NAME = 'Mexico';
    const B_TEAM_NAME = 'Canada';

    beforeEach(() => {
        scoreBoard = new ScoreBoardStore();
    });

    it('should create a new game', () => {
        scoreBoard.startGame(A_TEAM_NAME, B_TEAM_NAME);

        expect(scoreBoard.games.length).toBe(1);
    });

    it('should create a new game with two teams', () => {
        scoreBoard.startGame(A_TEAM_NAME, B_TEAM_NAME);

        const game = scoreBoard.games[0];
        expect(game.homeTeam.name).toBe(A_TEAM_NAME);
        expect(game.awayTeam.name).toBe(B_TEAM_NAME);
    });

    it('should throw an exception if team already plays in another match', () => {
        scoreBoard.games.push(new GameStore(A_TEAM_NAME, B_TEAM_NAME));

        expect(() => scoreBoard.startGame(A_TEAM_NAME, 'USA')).toThrow(
            `Team [${A_TEAM_NAME}] already plays in another match!`,
        );
        expect(() => scoreBoard.startGame('USA', B_TEAM_NAME)).toThrow(
            `Team [${B_TEAM_NAME}] already plays in another match!`,
        );
    });
});
