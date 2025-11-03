import React from 'react';
import { ArrowLeftIcon, UploadIcon, DownloadIcon } from './Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, onImport, onExport }) => {
  const importInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {onBack && (
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <input
            type="file"
            ref={importInputRef}
            className="hidden"
            accept=".json"
            onChange={onImport}
        />
        <button onClick={() => importInputRef.current?.click()} title="Importar Dados" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <UploadIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button onClick={onExport} title="Exportar Dados" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <DownloadIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
