import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Horse, Gender } from '../types';
import { HorseIcon } from './Icons';

interface HorseCardProps {
  horse: Horse;
  onClick: () => void;
}

const calculateAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return `${age} ano${age !== 1 ? 's' : ''}`;
};

const HorseCard: React.FC<HorseCardProps> = ({ horse, onClick }) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
    >
      <View style={styles.imageContainer}>
        {horse.picture ? (
          <Image source={{ uri: horse.picture }} style={styles.image} />
        ) : (
          <HorseIcon width={48} height={48} color="#9ca3af" />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{horse.name}</Text>
        <Text style={styles.age}>{calculateAge(horse.birthDate)}</Text>
        <Text style={[
          styles.gender,
          horse.gender === Gender.Male ? styles.genderMale : styles.genderFemale
        ]}>
          {horse.gender}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.7,
    shadowOpacity: 0.1,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  age: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  gender: {
    fontSize: 14,
    fontWeight: '600',
  },
  genderMale: {
    color: '#3b82f6',
  },
  genderFemale: {
    color: '#ec4899',
  },
});

export default HorseCard;
