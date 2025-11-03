import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HorseList from '../components/HorseList';
import Header from '../components/Header';
import useExpoStorage from '../hooks/useExpoStorage';
import { exportHorsesData } from '../utils/exportUtils';
import { importHorsesData } from '../utils/importUtils';
import { Alert } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HorseListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { horses, importData, dbReady } = useExpoStorage();

  const handleExport = useCallback(async () => {
    await exportHorsesData(horses);
  }, [horses]);

  const handleImport = useCallback(async () => {
    try {
      const importedData = await importHorsesData();
      if (importedData) {
        Alert.alert(
          'Confirmar Importação',
          'Tem certeza que deseja importar este arquivo? Todos os dados atuais serão substituídos.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Importar',
              style: 'destructive',
              onPress: async () => {
                await importData(importedData);
                Alert.alert('Sucesso', 'Dados importados com sucesso!');
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao ler o arquivo. Verifique se é um JSON válido.');
    }
  }, [importData]);

  const handleSelectHorse = useCallback((id: string) => {
    navigation.navigate('HorseDetail', { horseId: id });
  }, [navigation]);

  const handleAddHorse = useCallback(() => {
    navigation.navigate('HorseForm', {});
  }, [navigation]);

  if (!dbReady) {
    return null;
  }

  return (
    <>
      <Header
        title="Meus Cavalos"
        onImport={handleImport}
        onExport={handleExport}
      />
      <HorseList
        horses={horses}
        onSelectHorse={handleSelectHorse}
        onAddHorse={handleAddHorse}
      />
    </>
  );
}

