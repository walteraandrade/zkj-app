import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Horse } from '../types';

export type RootStackParamList = {
  HorseList: undefined;
  HorseDetail: { horseId: string };
  HorseForm: { horseId?: string; mode?: 'edit' };
  MatingForm: { femaleHorseId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HorseList" component={require('../screens/HorseListScreen').default} />
      <Stack.Screen name="HorseDetail" component={require('../screens/HorseDetailScreen').default} />
      <Stack.Screen name="HorseForm" component={require('../screens/HorseFormScreen').default} />
      <Stack.Screen name="MatingForm" component={require('../screens/MatingFormScreen').default} />
    </Stack.Navigator>
  );
}

