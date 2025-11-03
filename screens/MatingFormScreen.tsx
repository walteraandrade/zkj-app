import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MatingForm from '../components/MatingForm';
import Header from '../components/Header';
import useExpoStorage from '../hooks/useExpoStorage';
import { Gender, MatingRecord } from '../types';
import { Alert } from 'react-native';
import { generateUUID } from '../utils/uuid';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'MatingForm'>;

export default function MatingFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { horses, updateHorse, dbReady } = useExpoStorage();

  const femaleHorse = useMemo(
    () => horses.find(h => h.id === route.params.femaleHorseId),
    [horses, route.params.femaleHorseId]
  );

  const maleHorses = useMemo(
    () => horses.filter(h => h.gender === Gender.Male),
    [horses]
  );

  const handleSave = useCallback(async (matingData: Omit<MatingRecord, 'id'>) => {
    if (!femaleHorse) return;
    
    try {
      const newMatingRecord: MatingRecord = {
        ...matingData,
        id: generateUUID(),
      };
      const updatedHorse = {
        ...femaleHorse,
        matingHistory: [...femaleHorse.matingHistory, newMatingRecord],
      };
      await updateHorse(updatedHorse);
      navigation.navigate('HorseDetail', { horseId: femaleHorse.id });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o acasalamento.');
    }
  }, [femaleHorse, updateHorse, navigation]);

  const handleCancel = useCallback(() => {
    if (femaleHorse) {
      navigation.navigate('HorseDetail', { horseId: femaleHorse.id });
    } else {
      navigation.navigate('HorseList');
    }
  }, [femaleHorse, navigation]);

  if (!dbReady || !femaleHorse) {
    return null;
  }

  return (
    <>
      <Header title="Novo Acasalamento" onBack={handleCancel} onImport={() => {}} onExport={() => {}} />
      <MatingForm
        femaleHorse={femaleHorse}
        maleHorses={maleHorses}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
}

