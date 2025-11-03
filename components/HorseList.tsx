import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Horse } from '../types';
import HorseCard from './HorseCard';
import FloatingActionButton from './FloatingActionButton';

interface HorseListProps {
  horses: Horse[];
  onSelectHorse: (id: string) => void;
  onAddHorse: () => void;
}

const HorseList: React.FC<HorseListProps> = ({ horses, onSelectHorse, onAddHorse }) => {
  const sortedHorses = [...horses].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      {horses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum cavalo registrado.</Text>
          <Text style={styles.emptyText}>Clique no botão '+' para adicionar seu primeiro cavalo.</Text>
        </View>
      ) : (
        <FlatList
          data={sortedHorses}
          renderItem={({ item }) => (
            <HorseCard horse={item} onClick={() => onSelectHorse(item.id)} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      <FloatingActionButton onClick={onAddHorse} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    padding: 16,
    paddingBottom: 96,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HorseList;
