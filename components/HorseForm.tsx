import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, Image, Modal, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Horse, Gender } from '../types';
import { pickImageAsync, convertUriToBase64 } from '../utils/imageUtils';
import { CameraIcon } from './Icons';

interface HorseFormProps {
  onSave: (horse: Omit<Horse, 'id' | 'matingHistory'> & { id?: string }) => void;
  onCancel: () => void;
  horseToEdit?: Horse;
}

const HorseForm: React.FC<HorseFormProps> = ({ onSave, onCancel, horseToEdit }) => {
  const [formData, setFormData] = useState({
    name: horseToEdit?.name || '',
    birthDate: horseToEdit?.birthDate || '',
    gender: horseToEdit?.gender || Gender.Female,
    father: horseToEdit?.father || '',
    mother: horseToEdit?.mother || '',
    chip: horseToEdit?.chip || '',
    registro: horseToEdit?.registro || '',
    picture: horseToEdit?.picture || '',
    birthPlace: horseToEdit?.birthPlace || '',
    deliveryDetails: horseToEdit?.deliveryDetails || '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(horseToEdit?.picture || null);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
      try {
      const uri = await pickImageAsync();
      if (uri) {
        const base64 = await convertUriToBase64(uri);
        setImagePreview(base64);
        handleChange('picture', base64);
      }
      } catch (err) {
        console.error("Error converting file to base64", err);
        setError("Não foi possível carregar a imagem.");
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.birthDate || !formData.gender) {
      setError('Nome, Data de Nascimento e Sexo são obrigatórios.');
      return;
    }
    onSave({ ...formData, id: horseToEdit?.id });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      handleChange('birthDate', selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      
      <View style={styles.imageSection}>
        <Pressable onPress={handleImagePick} style={styles.imageButton}>
          {imagePreview ? (
            <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <CameraIcon color="#6b7280" />
              <Text style={styles.imagePlaceholderText}>Foto</Text>
            </View>
          )}
        </Pressable>
        <Text style={styles.imageHint}>Toque para adicionar uma foto</Text>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          placeholder="Nome do cavalo"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Data de Nascimento *</Text>
          <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={formData.birthDate ? styles.inputText : styles.inputPlaceholder}>
              {formData.birthDate || 'Selecione a data'}
            </Text>
          </Pressable>
        </View>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Sexo *</Text>
          <Pressable onPress={() => setShowGenderPicker(true)} style={styles.input}>
            <Text style={styles.inputText}>{formData.gender}</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Local de Nascimento</Text>
        <TextInput
          style={styles.input}
          value={formData.birthPlace}
          onChangeText={(value) => handleChange('birthPlace', value)}
          placeholder="Local de nascimento"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Detalhes do Parto</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.deliveryDetails}
          onChangeText={(value) => handleChange('deliveryDetails', value)}
          placeholder="Detalhes do parto"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pai</Text>
        <TextInput
          style={styles.input}
          value={formData.father}
          onChangeText={(value) => handleChange('father', value)}
          placeholder="Nome do pai"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mãe</Text>
        <TextInput
          style={styles.input}
          value={formData.mother}
          onChangeText={(value) => handleChange('mother', value)}
          placeholder="Nome da mãe"
        />
      </View>
      
      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Chip</Text>
          <TextInput
            style={styles.input}
            value={formData.chip}
            onChangeText={(value) => handleChange('chip', value)}
            placeholder="Número do chip"
          />
        </View>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Registro</Text>
          <TextInput
            style={styles.input}
            value={formData.registro}
            onChangeText={(value) => handleChange('registro', value)}
            placeholder="Número de registro"
          />
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <Pressable onPress={onCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </Pressable>
        <Pressable onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
          <Text style={styles.submitButtonText}>Salvar</Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={formData.birthDate ? new Date(formData.birthDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      {showGenderPicker && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione o Sexo</Text>
              <Pressable
                onPress={() => {
                  handleChange('gender', Gender.Female);
                  setShowGenderPicker(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{Gender.Female}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleChange('gender', Gender.Male);
                  setShowGenderPicker(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{Gender.Male}</Text>
              </Pressable>
              <Pressable onPress={() => setShowGenderPicker(false)} style={[styles.modalOption, styles.cancelModalOption]}>
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
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageButton: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: '#9ca3af',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  imageHint: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
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
    fontSize: 16,
  },
  inputText: {
    color: '#111827',
  },
  inputPlaceholder: {
    color: '#9ca3af',
  },
  textArea: {
    height: 80,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
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
  submitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
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

export default HorseForm;
