import React from 'react';
import { Horse, Gender } from '../types';
import { HorseIcon } from './Icons';

interface HorseCardProps {
  horse: Horse;
  onClick: () => void;
}

const calculateAge = (birthDate: string): string => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return `${age} ano${age !== 1 ? 's' : ''}`;
};


const HorseCard: React.FC<HorseCardProps> = ({ horse, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-4 space-x-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {horse.picture ? (
          <img src={horse.picture} alt={horse.name} className="w-full h-full object-cover" />
        ) : (
          <HorseIcon className="w-12 h-12 text-gray-400" />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-900">{horse.name}</h3>
        <p className="text-sm text-gray-600">{calculateAge(horse.birthDate)}</p>
        <p className={`text-sm font-semibold ${horse.gender === Gender.Male ? 'text-blue-500' : 'text-pink-500'}`}>{horse.gender}</p>
      </div>
    </div>
  );
};

export default HorseCard;
