import React from 'react';
import { PlusIcon } from './Icons';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
      aria-label="Adicionar novo cavalo"
    >
      <PlusIcon className="w-8 h-8" />
    </button>
  );
};

export default FloatingActionButton;
