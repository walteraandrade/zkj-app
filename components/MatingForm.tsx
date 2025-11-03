import React, { useState } from 'react';
import { Horse, Gender, MatingRecord } from '../types';

interface MatingFormProps {
  femaleHorse: Horse;
  maleHorses: Horse[];
  onSave: (matingRecord: Omit<MatingRecord, 'id'>) => void;
  onCancel: () => void;
}

const MatingForm: React.FC<MatingFormProps> = ({ femaleHorse, maleHorses, onSave, onCancel }) => {
  const [maleId, setMaleId] = useState<string>(maleHorses[0]?.id || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maleId || !date) {
      setError('Por favor, selecione um macho e uma data.');
      return;
    }
    const selectedMale = maleHorses.find(h => h.id === maleId);
    if (!selectedMale) {
        setError('Macho selecionado inválido.');
        return;
    }
    onSave({
      maleId,
      maleName: selectedMale.name,
      date,
    });
  };
  
  return (
    <div className="p-4 space-y-6 fade-in">
        <h2 className="text-xl font-bold text-gray-800">Adicionar Acasalamento</h2>
        <p className="text-gray-600">Registrando acasalamento para <span className="font-semibold">{femaleHorse.name}</span>.</p>
        
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="maleId" className="block text-sm font-medium text-gray-700">Macho (Pai)</label>
                <select 
                    id="maleId" 
                    value={maleId} 
                    onChange={(e) => setMaleId(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="" disabled>Selecione um macho</option>
                    {maleHorses.map(horse => (
                        <option key={horse.id} value={horse.id}>{horse.name}</option>
                    ))}
                </select>
                {maleHorses.length === 0 && <p className="text-sm text-yellow-600 mt-2">Nenhum macho registrado. Adicione um cavalo macho primeiro.</p>}
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data do Acasalamento</label>
                <input 
                    type="date" 
                    id="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
             <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cancelar
                </button>
                <button type="submit" disabled={maleHorses.length === 0} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
                    Salvar
                </button>
            </div>
        </form>
    </div>
  )
}


export default MatingForm;
