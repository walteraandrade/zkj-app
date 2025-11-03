import React, { useState, useMemo } from 'react';
import { Horse } from '../types';
import HorseCard from './HorseCard';
import FloatingActionButton from './FloatingActionButton';
import { SearchIcon } from './Icons';

interface HorseListProps {
  horses: Horse[];
  onSelectHorse: (id: string) => void;
  onAddHorse: () => void;
}

const HorseList: React.FC<HorseListProps> = ({ horses, onSelectHorse, onAddHorse }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHorses = useMemo(() => {
    return horses.filter(horse =>
      horse.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [horses, searchTerm]);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Show search only if there are horses */}
      {horses.length > 0 && (
         <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
      )}
     
      {horses.length === 0 ? (
        <div className="text-center py-20 px-4">
          <h2 className="text-xl font-semibold text-gray-700">Nenhum cavalo registrado.</h2>
          <p className="text-gray-500 mt-2">Clique no botão '+' para adicionar seu primeiro cavalo.</p>
        </div>
      ) : filteredHorses.length === 0 ? (
        <div className="text-center py-10 px-4">
          <h2 className="text-xl font-semibold text-gray-700">Nenhum cavalo encontrado</h2>
          <p className="text-gray-500 mt-2">Tente um termo de busca diferente.</p>
        </div>
      ) : (
        filteredHorses.map(horse => (
          <HorseCard key={horse.id} horse={horse} onClick={() => onSelectHorse(horse.id)} />
        ))
      )}
      <FloatingActionButton onClick={onAddHorse} />
    </div>
  );
};

export default HorseList;