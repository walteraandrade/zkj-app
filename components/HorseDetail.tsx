import React from 'react';
import { Horse, Gender } from '../types';
import { HorseIcon, EditIcon, TrashIcon, PlusIcon } from './Icons';

interface HorseDetailProps {
  horse: Horse;
  onEdit: () => void;
  onDelete: () => void;
  onAddMating: () => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(date);
};

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


const HorseDetail: React.FC<HorseDetailProps> = ({ horse, onEdit, onDelete, onAddMating }) => {
  return (
    <div className="pb-16 fade-in">
      <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {horse.picture ? (
          <img src={horse.picture} alt={horse.name} className="w-full h-full object-cover" />
        ) : (
          <HorseIcon className="w-24 h-24 text-gray-400" />
        )}
      </div>

      <div className="p-4 space-y-4 bg-white -mt-8 mx-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">{horse.name}</h2>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-600">
                <p className="font-semibold">Idade</p>
                <p>{calculateAge(horse.birthDate)}</p>
            </div>
            <div className="text-gray-600">
                <p className="font-semibold">Sexo</p>
                <p className={`font-bold ${horse.gender === Gender.Male ? 'text-blue-600' : 'text-pink-600'}`}>{horse.gender}</p>
            </div>
            {horse.registro && <div className="text-gray-600">
                <p className="font-semibold">Registro</p>
                <p>{horse.registro}</p>
            </div>}
            {horse.chip && <div className="text-gray-600">
                <p className="font-semibold">Chip</p>
                <p>{horse.chip}</p>
            </div>}
        </div>
      </div>

      <div className="p-4 mt-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Dados do Nascimento</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center py-2 border-b text-sm">
                <span className="text-gray-500">Data</span>
                <span className="font-medium text-gray-800">{formatDate(horse.birthDate)}</span>
            </div>
            {horse.birthPlace && (
            <div className="flex justify-between items-center py-2 border-b text-sm">
                <span className="text-gray-500">Local</span>
                <span className="font-medium text-gray-800 text-right">{horse.birthPlace}</span>
            </div>
            )}
            {horse.deliveryDetails && (
            <div className="py-2 text-sm">
                <span className="text-gray-500 block">Detalhes do Parto</span>
                <p className="font-medium text-gray-800 whitespace-pre-wrap mt-1">{horse.deliveryDetails}</p>
            </div>
            )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Filiação</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">Pai</span>
                <span className="font-medium text-gray-800">{horse.father || 'Não informado'}</span>
            </div>
            <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Mãe</span>
                <span className="font-medium text-gray-800">{horse.mother || 'Não informada'}</span>
            </div>
        </div>
      </div>
      
      {horse.gender === Gender.Female && (
        <div className="p-4 mt-2 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Histórico de Acasalamento</h3>
                <button onClick={onAddMating} className="flex items-center space-x-2 text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    <span>Adicionar</span>
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
                {horse.matingHistory.length > 0 ? (
                    [...horse.matingHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(mating => (
                        <div key={mating.id} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="font-semibold text-gray-800">{mating.maleName}</p>
                                <p className="text-gray-500">{formatDate(mating.date)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">Nenhum registro de acasalamento.</p>
                )}
            </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex justify-end space-x-4">
        <button onClick={onDelete} className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <TrashIcon className="w-5 h-5" />
          <span>Excluir</span>
        </button>
        <button onClick={onEdit} className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <EditIcon className="w-5 h-5" />
          <span>Editar</span>
        </button>
      </div>
    </div>
  );
};

export default HorseDetail;