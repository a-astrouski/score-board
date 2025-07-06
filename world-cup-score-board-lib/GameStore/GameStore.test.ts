import { GameStore } from '@/world-cup-score-board-lib/GameStore/GameStore';

it('should throw an exception if away team and home team are the same', () => {
    // prettier-ignore
    expect(() => new GameStore('Mexico', 'Mexico'))
        .toThrow('Teams should be different! HomeTeam: [Mexico], AwayTeam: [Mexico]');
});
