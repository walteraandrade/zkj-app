import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HorseForm from '../components/HorseForm';
import Header from '../components/Header';
import useExpoStorage from '../hooks/useExpoStorage';
import { Horse } from '../types';
import { Alert } from 'react-native';
import { generateUUID } from '../utils/uuid';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'HorseForm'>;

export default function HorseFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { horses, addHorse, updateHorse, dbReady } = useExpoStorage();

  const horseToEdit = useMemo(
    () => route.params?.horseId ? horses.find(h => h.id === route.params.horseId) : undefined,
    [horses, route.params]
  );

  const handleSave = useCallback(async (horseData: Omit<Horse, 'id' | 'matingHistory'> & { id?: string }) => {
    try {
      if (horseToEdit) {
        await updateHorse({ ...horseToEdit, ...horseData, matingHistory: horseToEdit.matingHistory });
        navigation.navigate('HorseDetail', { horseId: horseToEdit.id });
      } else {
        const newHorse: Horse = {
          ...horseData,
          id: generateUUID(),
          matingHistory: [],
        };
        await addHorse(newHorse);
        navigation.navigate('HorseList');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o cavalo.');
    }
  }, [horseToEdit, addHorse, updateHorse, navigation]);

  const handleCancel = useCallback(() => {
    if (horseToEdit) {
      navigation.navigate('HorseDetail', { horseId: horseToEdit.id });
    } else {
      navigation.navigate('HorseList');
    }
  }, [horseToEdit, navigation]);

  const title = horseToEdit ? 'Editar Cavalo' : 'Adicionar Cavalo';

  if (!dbReady) {
    return null;
  }

  return (
    <>
      <Header title={title} onBack={handleCancel} onImport={() => {}} onExport={() => {}} />
      <HorseForm onSave={handleSave} onCancel={handleCancel} horseToEdit={horseToEdit} />
    </>
  );
}

