import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { PlusIcon } from './Icons';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed
      ]}
      accessibilityLabel="Adicionar novo cavalo"
    >
      <PlusIcon color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: '#1d4ed8',
    transform: [{ scale: 0.95 }],
  },
});

export default FloatingActionButton;
