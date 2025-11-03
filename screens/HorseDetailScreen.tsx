import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Alert } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import HorseDetail from '../components/HorseDetail';
import Header from '../components/Header';
import useExpoStorage from '../hooks/useExpoStorage';
import { exportHorsesData } from '../utils/exportUtils';
import { importHorsesData } from '../utils/importUtils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'HorseDetail'>;

export default function HorseDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { horses, deleteHorse, importData, dbReady } = useExpoStorage();

  const selectedHorse = useMemo(
    () => horses.find(h => h.id === route.params.horseId),
    [horses, route.params.horseId]
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
                navigation.navigate('HorseList');
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao ler o arquivo. Verifique se é um JSON válido.');
    }
  }, [importData, navigation]);

  const handleEdit = useCallback(() => {
    navigation.navigate('HorseForm', { horseId: selectedHorse?.id, mode: 'edit' });
  }, [navigation, selectedHorse]);

  const handleDelete = useCallback(() => {
    if (!selectedHorse) return;
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este cavalo? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteHorse(selectedHorse.id);
            navigation.navigate('HorseList');
          },
        },
      ]
    );
  }, [selectedHorse, deleteHorse, navigation]);

  const handleAddMating = useCallback(() => {
    if (!selectedHorse) return;
    navigation.navigate('MatingForm', { femaleHorseId: selectedHorse.id });
  }, [selectedHorse, navigation]);

  if (!dbReady || !selectedHorse) {
    return null;
  }

  return (
    <>
      <Header
        title={selectedHorse.name}
        onBack={handleBack}
        onImport={handleImport}
        onExport={handleExport}
      />
      <HorseDetail
        horse={selectedHorse}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddMating={handleAddMating}
      />
    </>
  );
}

