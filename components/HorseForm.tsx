import React, { useState } from 'react';
import { Horse, Gender } from '../types';
import { fileToBase64 } from '../utils/fileUtils';
import { CameraIcon } from './Icons';

interface HorseFormProps {
  onSave: (horse: Omit<Horse, 'id' | 'matingHistory'> & { id?: string }) => void;
  onCancel: () => void;
  horseToEdit?: Horse;
}

const HorseForm: React.FC<HorseFormProps> = ({ onSave, onCancel, horseToEdit }) => {
  const [formData, setFormData] = useState({
    name: horseToEdit?.name || '',
    birthDate: horseToEdit?.birthDate || '',
    gender: horseToEdit?.gender || Gender.Female,
    father: horseToEdit?.father || '',
    mother: horseToEdit?.mother || '',
    chip: horseToEdit?.chip || '',
    registro: horseToEdit?.registro || '',
    picture: horseToEdit?.picture || '',
    birthPlace: horseToEdit?.birthPlace || '',
    deliveryDetails: horseToEdit?.deliveryDetails || '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(horseToEdit?.picture || null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'chip' || name === 'registro') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        setImagePreview(base64);
        setFormData(prev => ({ ...prev, picture: base64 }));
      } catch (err) {
        console.error("Error converting file to base64", err);
        setError("Não foi possível carregar a imagem.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.gender) {
      setError('Nome, Data de Nascimento e Sexo são obrigatórios.');
      return;
    }
    onSave({ ...formData, id: horseToEdit?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 fade-in">
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
      
      <div className="flex flex-col items-center">
        <label htmlFor="picture-upload" className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-gray-400 hover:border-blue-500 transition-colors">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-gray-500">
              <CameraIcon className="w-10 h-10 mx-auto"/>
              <span className="text-xs">Foto</span>
            </div>
          )}
        </label>
        <input id="picture-upload" type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
        <p className="text-sm text-gray-500 mt-2">Toque para adicionar uma foto</p>
      </div>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome *</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Data de Nascimento *</label>
          <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Sexo *</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value={Gender.Female}>Fêmea</option>
            <option value={Gender.Male}>Macho</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">Local de Nascimento</label>
        <input type="text" name="birthPlace" id="birthPlace" value={formData.birthPlace} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label htmlFor="deliveryDetails" className="block text-sm font-medium text-gray-700">Detalhes do Parto</label>
        <textarea name="deliveryDetails" id="deliveryDetails" value={formData.deliveryDetails} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label htmlFor="father" className="block text-sm font-medium text-gray-700">Pai</label>
        <input type="text" name="father" id="father" value={formData.father} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      
      <div>
        <label htmlFor="mother" className="block text-sm font-medium text-gray-700">Mãe</label>
        <input type="text" name="mother" id="mother" value={formData.mother} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="chip" className="block text-sm font-medium text-gray-700">Chip</label>
          <input type="text" inputMode="numeric" name="chip" id="chip" value={formData.chip} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="registro" className="block text-sm font-medium text-gray-700">Registro</label>
          <input type="text" inputMode="numeric" name="registro" id="registro" value={formData.registro} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Cancelar
        </button>
        <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default HorseForm;