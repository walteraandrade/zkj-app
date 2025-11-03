import React from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Horse, Gender } from '../types';
import { HorseIcon, EditIcon, TrashIcon, PlusIcon } from './Icons';

interface HorseDetailProps {
  horse: Horse;
  onEdit: () => void;
  onDelete: () => void;
  onAddMating: () => void;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
};

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

const HorseDetail: React.FC<HorseDetailProps> = ({ horse, onEdit, onDelete, onAddMating }) => {
  const sortedMatingHistory = [...horse.matingHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageSection}>
          {horse.picture ? (
            <Image source={{ uri: horse.picture }} style={styles.image} />
          ) : (
            <HorseIcon width={96} height={96} color="#9ca3af" />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.horseName}>{horse.name}</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Idade</Text>
              <Text style={styles.value}>{calculateAge(horse.birthDate)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Sexo</Text>
              <Text style={[
                styles.value,
                horse.gender === Gender.Male ? styles.genderMale : styles.genderFemale
              ]}>
                {horse.gender}
              </Text>
            </View>
            {horse.registro && (
              <View style={styles.gridItem}>
                <Text style={styles.label}>Registro</Text>
                <Text style={styles.value}>{horse.registro}</Text>
              </View>
            )}
            {horse.chip && (
              <View style={styles.gridItem}>
                <Text style={styles.label}>Chip</Text>
                <Text style={styles.value}>{horse.chip}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Nascimento</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Data</Text>
              <Text style={styles.rowValue}>{formatDate(horse.birthDate)}</Text>
            </View>
            {horse.birthPlace && (
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Local</Text>
                <Text style={styles.rowValue}>{horse.birthPlace}</Text>
              </View>
            )}
            {horse.deliveryDetails && (
              <View style={styles.textRow}>
                <Text style={styles.rowLabel}>Detalhes do Parto</Text>
                <Text style={styles.rowValue}>{horse.deliveryDetails}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filiação</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Pai</Text>
              <Text style={styles.rowValue}>{horse.father || 'Não informado'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Mãe</Text>
              <Text style={styles.rowValue}>{horse.mother || 'Não informada'}</Text>
            </View>
          </View>
        </View>

        {horse.gender === Gender.Female && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Histórico de Acasalamento</Text>
              <Pressable onPress={onAddMating} style={styles.addButton}>
                <PlusIcon width={16} height={16} color="#2563eb" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </Pressable>
            </View>
            <View style={styles.card}>
              {sortedMatingHistory.length > 0 ? (
                sortedMatingHistory.map(mating => (
                  <View key={mating.id} style={styles.matingRow}>
                    <View>
                      <Text style={styles.matingName}>{mating.maleName}</Text>
                      <Text style={styles.matingDate}>{formatDate(mating.date)}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>Nenhum registro de acasalamento.</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Pressable onPress={onDelete} style={[styles.footerButton, styles.deleteButton]}>
          <TrashIcon color="#991b1b" />
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </Pressable>
        <Pressable onPress={onEdit} style={[styles.footerButton, styles.editButton]}>
          <EditIcon color="white" />
          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    height: 192,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: -32,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  horseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#1f2937',
  },
  genderMale: {
    color: '#2563eb',
    fontWeight: '700',
  },
  genderFemale: {
    color: '#ec4899',
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  rowLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
    textAlign: 'right',
  },
  textRow: {
    paddingVertical: 8,
  },
  matingRow: {
    paddingVertical: 12,
  },
  matingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  matingDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: 'white',
    borderColor: '#d1d5db',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#991b1b',
  },
  editButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default HorseDetail;
