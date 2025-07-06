import { scoreBoardStore } from '@/store/RootStore';
import { observer } from 'mobx-react-lite';
import MatchCard from '@/components/MatchCard/MatchCard';
import { useMemo } from 'react';

const MatchList: React.FC = observer(({}) => {
    const { games } = scoreBoardStore;

    const gameCards = useMemo(() => {
        return games.map(game => <MatchCard key={game.id} driver={game} />);
    }, [games]);

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{gameCards}</div>;
});

export default MatchList;
