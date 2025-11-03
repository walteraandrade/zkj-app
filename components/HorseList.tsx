import React from 'react';
import { Horse } from '../types';
import HorseCard from './HorseCard';
import FloatingActionButton from './FloatingActionButton';

interface HorseListProps {
  horses: Horse[];
  onSelectHorse: (id: string) => void;
  onAddHorse: () => void;
}

const HorseList: React.FC<HorseListProps> = ({ horses, onSelectHorse, onAddHorse }) => {
  return (
    <div className="p-4 space-y-4 pb-24">
      {horses.length === 0 ? (
        <div className="text-center py-20 px-4">
          <h2 className="text-xl font-semibold text-gray-700">Nenhum cavalo registrado.</h2>
          <p className="text-gray-500 mt-2">Clique no botão '+' para adicionar seu primeiro cavalo.</p>
        </div>
      ) : (
        horses.map(horse => (
          <HorseCard key={horse.id} horse={horse} onClick={() => onSelectHorse(horse.id)} />
        ))
      )}
      <FloatingActionButton onClick={onAddHorse} />
    </div>
  );
};

export default HorseList;
