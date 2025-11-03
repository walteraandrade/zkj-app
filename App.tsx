import React, { useState, useMemo } from 'react';
import { Horse, Gender, MatingRecord } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import HorseList from './components/HorseList';
import HorseDetail from './components/HorseDetail';
import HorseForm from './components/HorseForm';
import MatingForm from './components/MatingForm';

type View = 'LIST' | 'DETAIL' | 'ADD' | 'EDIT' | 'MATE';

const App: React.FC = () => {
  const [horses, setHorses] = useLocalStorage<Horse[]>('horses', []);
  const [view, setView] = useState<View>('LIST');
  const [selectedHorseId, setSelectedHorseId] = useState<string | null>(null);

  const selectedHorse = useMemo(() => {
    return horses.find(h => h.id === selectedHorseId) || null;
  }, [horses, selectedHorseId]);

  const handleAddHorse = (horseData: Omit<Horse, 'id' | 'matingHistory'>) => {
    const newHorse: Horse = {
      ...horseData,
      id: crypto.randomUUID(),
      matingHistory: [],
    };
    setHorses(prev => [...prev, newHorse]);
    setView('LIST');
  };
  
  const handleUpdateHorse = (horseData: Omit<Horse, 'matingHistory'>) => {
    setHorses(prev => prev.map(h => h.id === horseData.id ? { ...h, ...horseData } : h));
    setView('DETAIL');
  };

  const handleDeleteHorse = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cavalo? Esta ação não pode ser desfeita.')) {
      setHorses(prev => prev.filter(h => h.id !== id));
      setView('LIST');
      setSelectedHorseId(null);
    }
  };

  const handleAddMating = (matingData: Omit<MatingRecord, 'id'>) => {
    if (!selectedHorse || selectedHorse.gender !== Gender.Female) return;
    const newMatingRecord: MatingRecord = {
        ...matingData,
        id: crypto.randomUUID(),
    };
    const updatedHorse = {
        ...selectedHorse,
        matingHistory: [...selectedHorse.matingHistory, newMatingRecord],
    };
    handleUpdateHorse(updatedHorse);
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(horses, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `haras_backup_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!window.confirm("Tem certeza que deseja importar este arquivo? Todos os dados atuais serão substituídos.")) {
        event.target.value = ''; // Reset file input
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result;
            if (typeof text === 'string') {
                const importedHorses = JSON.parse(text);
                // Basic validation
                if (Array.isArray(importedHorses) && (importedHorses.length === 0 || importedHorses[0].id)) {
                    setHorses(importedHorses);
                    alert("Dados importados com sucesso!");
                    setView('LIST');
                } else {
                    alert("Arquivo de importação inválido.");
                }
            }
        } catch (error) {
            alert("Erro ao ler o arquivo. Verifique se é um JSON válido.");
        } finally {
            event.target.value = ''; // Reset file input
        }
    };
    reader.readAsText(file);
  };


  const renderContent = () => {
    switch (view) {
      case 'DETAIL':
        return selectedHorse && (
          <HorseDetail
            horse={selectedHorse}
            onEdit={() => setView('EDIT')}
            onDelete={() => handleDeleteHorse(selectedHorse.id)}
            onAddMating={() => setView('MATE')}
          />
        );
      case 'ADD':
        return <HorseForm onSave={handleAddHorse} onCancel={() => setView('LIST')} />;
      case 'EDIT':
        return selectedHorse && (
            <HorseForm 
                horseToEdit={selectedHorse}
                onSave={(data) => handleUpdateHorse({ ...selectedHorse, ...data })} 
                onCancel={() => setView('DETAIL')} 
            />
        );
      case 'MATE':
        const maleHorses = horses.filter(h => h.gender === Gender.Male);
        return selectedHorse && (
            <MatingForm
                femaleHorse={selectedHorse}
                maleHorses={maleHorses}
                onSave={handleAddMating}
                onCancel={() => setView('DETAIL')}
            />
        )
      case 'LIST':
      default:
        return (
          <HorseList
            horses={[...horses].sort((a, b) => a.name.localeCompare(b.name))}
            onSelectHorse={(id) => {
              setSelectedHorseId(id);
              setView('DETAIL');
            }}
            onAddHorse={() => setView('ADD')}
          />
        );
    }
  };

  const getTitle = () => {
    switch (view) {
        case 'DETAIL':
            return selectedHorse?.name || 'Detalhes';
        case 'ADD':
            return 'Adicionar Cavalo';
        case 'EDIT':
            return 'Editar Cavalo';
        case 'MATE':
            return 'Novo Acasalamento';
        case 'LIST':
        default:
            return 'Meus Cavalos';
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-2xl">
      <Header 
        title={getTitle()}
        onBack={view !== 'LIST' ? () => setView(view === 'EDIT' || view === 'MATE' ? 'DETAIL' : 'LIST') : undefined}
        onImport={handleImport}
        onExport={handleExport}
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
