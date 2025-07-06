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

describe('finishGame', () => {
    let scoreBoard: ScoreBoardStore;

    beforeEach(() => {
        scoreBoard = new ScoreBoardStore();
    });

    it('should remove an existing game', () => {
        scoreBoard.startGame('Brazil', 'Argentina');
        const gameId = scoreBoard.games[0].id;
        const initialGamesCount = scoreBoard.games.length;

        scoreBoard.finishGame(gameId);

        expect(scoreBoard.games.length).toBe(initialGamesCount - 1);
        expect(scoreBoard.games.find(game => game.id === gameId)).toBeUndefined();
    });

    it('should throw an exception when trying to finish a non-existent game', () => {
        const nonExistentGameId = 'game-NonExistent-Team';

        expect(() => scoreBoard.finishGame(nonExistentGameId)).toThrow('Game does not exist!');
    });

    it('should throw an error when gameId is null or undefined', () => {
        expect(() => scoreBoard.finishGame(null as never)).toThrow('Game ID cannot be empty');
        expect(() => scoreBoard.finishGame(undefined as never)).toThrow('Game ID cannot be empty');
    });

    it('should throw an error when gameId is whitespace', () => {
        expect(() => scoreBoard.finishGame('')).toThrow('Game ID cannot be empty');
        expect(() => scoreBoard.finishGame('   ')).toThrow('Game ID cannot be empty');
    });

    it('should finish the correct game when multiple games exist', () => {
        scoreBoard.startGame('France', 'Germany');
        scoreBoard.startGame('England', 'Portugal');
        scoreBoard.startGame('Mexico', 'Canada');

        const gameToFinish = scoreBoard.games[1];
        const gameToKeep1 = scoreBoard.games[0];
        const gameToKeep2 = scoreBoard.games[2];

        scoreBoard.finishGame(gameToFinish.id);

        expect(scoreBoard.games.length).toBe(2);
        expect(scoreBoard.games).toContain(gameToKeep1);
        expect(scoreBoard.games).toContain(gameToKeep2);
        expect(scoreBoard.games).not.toContain(gameToFinish);
    });
});

describe('getSummaryOfGamesByTotalScore', () => {
    it('should sort games by total score in descending order', () => {});

    it('should sort by creation date when total scores are equal', () => {});

    it('should handle games with zero scores', () => {});

    it('should handle mixed scenarios with different scores and creation dates', () => {});
});
