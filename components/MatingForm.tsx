import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Horse, MatingRecord } from '../types';

interface MatingFormProps {
  femaleHorse: Horse;
  maleHorses: Horse[];
  onSave: (matingRecord: Omit<MatingRecord, 'id'>) => void;
  onCancel: () => void;
}

const MatingForm: React.FC<MatingFormProps> = ({ femaleHorse, maleHorses, onSave, onCancel }) => {
  const [maleId, setMaleId] = useState<string>(maleHorses[0]?.id || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMalePicker, setShowMalePicker] = useState(false);

  const handleSubmit = () => {
    if (!maleId || !date) {
      setError('Por favor, selecione um macho e uma data.');
      return;
    }
    const selectedMale = maleHorses.find(h => h.id === maleId);
    if (!selectedMale) {
      setError('Macho selecionado inválido.');
      return;
    }
    onSave({
      maleId,
      maleName: selectedMale.name,
      date,
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar Acasalamento</Text>
      <Text style={styles.subtitle}>
        Registrando acasalamento para <Text style={styles.bold}>{femaleHorse.name}</Text>.
      </Text>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Macho (Pai)</Text>
        <Pressable onPress={() => setShowMalePicker(true)} style={styles.input}>
          <Text style={styles.inputText}>
            {maleId ? maleHorses.find(h => h.id === maleId)?.name : 'Selecione um macho'}
          </Text>
        </Pressable>
        {maleHorses.length === 0 && (
          <Text style={styles.warningText}>
            Nenhum macho registrado. Adicione um cavalo macho primeiro.
          </Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data do Acasalamento</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={styles.inputText}>{date || 'Selecione a data'}</Text>
        </Pressable>
      </View>

      <View style={styles.buttonRow}>
        <Pressable onPress={onCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </Pressable>
        <Pressable 
          onPress={handleSubmit} 
          disabled={maleHorses.length === 0}
          style={[styles.button, styles.submitButton, maleHorses.length === 0 && styles.submitButtonDisabled]}
        >
          <Text style={[styles.submitButtonText, maleHorses.length === 0 && styles.submitButtonTextDisabled]}>
            Salvar
          </Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      {showMalePicker && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione o Macho</Text>
              {maleHorses.map(horse => (
                <Pressable
                  key={horse.id}
                  onPress={() => {
                    setMaleId(horse.id);
                    setShowMalePicker(false);
                  }}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalOptionText}>{horse.name}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => setShowMalePicker(false)} style={[styles.modalOption, styles.cancelModalOption]}>
                <Text style={styles.cancelModalOptionText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 24,
  },
  bold: {
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#991b1b',
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 16,
    color: '#111827',
  },
  warningText: {
    fontSize: 14,
    color: '#d97706',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#d1d5db',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    borderColor: '#9ca3af',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  submitButtonTextDisabled: {
    color: '#f3f4f6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#111827',
  },
  cancelModalOption: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  cancelModalOptionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default MatingForm;
