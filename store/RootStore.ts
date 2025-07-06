import { ScoreBoardStore } from '@/world-cup-score-board-lib/ScoreBoardStore/ScoreBoardStore';

class RootStore {
    public scoreBoardStore = new ScoreBoardStore();
}

export const { scoreBoardStore } = new RootStore();
