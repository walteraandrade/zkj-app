import { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { Horse } from '../types';

const DB_NAME = 'haras-db';
const STORE_NAME = 'horses';
const DB_VERSION = 1;

async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return db;
}

function useIndexedDB() {
  const [horses, setHorses] = useState<Horse[]>([]);

  useEffect(() => {
    async function fetchData() {
      const db = await initDB();
      const allHorses = await db.getAll(STORE_NAME);
      setHorses(allHorses);
    }
    fetchData();
  }, []);

  const addHorse = async (horse: Horse) => {
    const db = await initDB();
    await db.add(STORE_NAME, horse);
    setHorses(prev => [...prev, horse]);
  };

  const updateHorse = async (horse: Horse) => {
    const db = await initDB();
    await db.put(STORE_NAME, horse);
    setHorses(prev => prev.map(h => h.id === horse.id ? horse : h));
  };

  const deleteHorse = async (id: string) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    setHorses(prev => prev.filter(h => h.id !== id));
  };
  
  const importData = async (importedHorses: Horse[]) => {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      await tx.store.clear();
      await Promise.all(importedHorses.map(horse => tx.store.add(horse)));
      await tx.done;
      setHorses(importedHorses);
  };

  return { horses, addHorse, updateHorse, deleteHorse, importData };
}

export default useIndexedDB;