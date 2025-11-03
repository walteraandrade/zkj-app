import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Horse } from '../types';

export const importHorsesData = async (): Promise<Horse[] | null> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return null;
    }

    const asset = result.assets[0];
    const content = await FileSystem.readAsStringAsync(asset.uri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const importedHorses = JSON.parse(content);

    if (Array.isArray(importedHorses) && (importedHorses.length === 0 || importedHorses[0].id)) {
      return importedHorses;
    } else {
      throw new Error('Arquivo de importação inválido');
    }
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
};

