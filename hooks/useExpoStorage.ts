import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Horse } from '../types';

const DB_NAME = 'haras-db.db';

let db: SQLite.SQLiteDatabase | null = null;

async function initDB() {
  if (db) return db;
  
  db = await SQLite.openDatabaseAsync(DB_NAME);
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS horses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      birthDate TEXT NOT NULL,
      gender TEXT NOT NULL,
      father TEXT,
      mother TEXT,
      chip TEXT,
      registro TEXT,
      picture TEXT,
      matingHistory TEXT,
      birthPlace TEXT,
      deliveryDetails TEXT
    );
  `);
  
  return db;
}

export default function useExpoStorage() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function setupAndFetch() {
      try {
        await initDB();
        setDbReady(true);
        
        if (db) {
          const result = await db.getAllAsync<any>('SELECT * FROM horses');
          const parsedHorses = result.map((row: any) => ({
            ...row,
            matingHistory: row.matingHistory ? JSON.parse(row.matingHistory) : []
          })) as Horse[];
          setHorses(parsedHorses);
        }
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    }
    
    setupAndFetch();
  }, []);

  const addHorse = async (horse: Horse) => {
    if (!db) return;
    
    try {
      await db.runAsync(
        'INSERT INTO horses (id, name, birthDate, gender, father, mother, chip, registro, picture, matingHistory, birthPlace, deliveryDetails) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          horse.id,
          horse.name,
          horse.birthDate,
          horse.gender,
          horse.father || null,
          horse.mother || null,
          horse.chip || null,
          horse.registro || null,
          horse.picture || null,
          JSON.stringify(horse.matingHistory),
          horse.birthPlace || null,
          horse.deliveryDetails || null
        ]
      );
      setHorses(prev => [...prev, horse]);
    } catch (error) {
      console.error('Error adding horse:', error);
    }
  };

  const updateHorse = async (horse: Horse) => {
    if (!db) return;
    
    try {
      await db.runAsync(
        'UPDATE horses SET name = ?, birthDate = ?, gender = ?, father = ?, mother = ?, chip = ?, registro = ?, picture = ?, matingHistory = ?, birthPlace = ?, deliveryDetails = ? WHERE id = ?',
        [
          horse.name,
          horse.birthDate,
          horse.gender,
          horse.father || null,
          horse.mother || null,
          horse.chip || null,
          horse.registro || null,
          horse.picture || null,
          JSON.stringify(horse.matingHistory),
          horse.birthPlace || null,
          horse.deliveryDetails || null,
          horse.id
        ]
      );
      setHorses(prev => prev.map(h => h.id === horse.id ? horse : h));
    } catch (error) {
      console.error('Error updating horse:', error);
    }
  };

  const deleteHorse = async (id: string) => {
    if (!db) return;
    
    try {
      await db.runAsync('DELETE FROM horses WHERE id = ?', [id]);
      setHorses(prev => prev.filter(h => h.id !== id));
    } catch (error) {
      console.error('Error deleting horse:', error);
    }
  };

  const importData = async (importedHorses: Horse[]) => {
    if (!db) return;
    
    try {
      await db.execAsync('BEGIN TRANSACTION');
      await db.runAsync('DELETE FROM horses');
      
      for (const horse of importedHorses) {
        await db.runAsync(
          'INSERT INTO horses (id, name, birthDate, gender, father, mother, chip, registro, picture, matingHistory, birthPlace, deliveryDetails) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            horse.id,
            horse.name,
            horse.birthDate,
            horse.gender,
            horse.father || null,
            horse.mother || null,
            horse.chip || null,
            horse.registro || null,
            horse.picture || null,
            JSON.stringify(horse.matingHistory),
            horse.birthPlace || null,
            horse.deliveryDetails || null
          ]
        );
      }
      
      await db.execAsync('COMMIT');
      setHorses(importedHorses);
    } catch (error) {
      console.error('Error importing data:', error);
      await db.execAsync('ROLLBACK');
      throw error;
    }
  };

  return { horses, addHorse, updateHorse, deleteHorse, importData, dbReady };
}

