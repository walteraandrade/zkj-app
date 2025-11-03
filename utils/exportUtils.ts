import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Horse } from '../types';

export const exportHorsesData = async (horses: Horse[]): Promise<void> => {
  try {
    const jsonString = JSON.stringify(horses, null, 2);
    const date = new Date().toISOString().split('T')[0];
    const filename = `haras_backup_${date}.json`;
    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, jsonString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Exportar dados',
      });
    } else {
      alert('Compartilhamento não está disponível neste dispositivo.');
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    alert('Erro ao exportar dados.');
  }
};

