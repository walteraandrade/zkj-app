import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ArrowLeftIcon, UploadIcon, DownloadIcon } from './Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onImport: () => void;
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, onImport, onExport }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {onBack && (
          <Pressable onPress={onBack} style={styles.backButton}>
            <ArrowLeftIcon color="#374151" />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightSection}>
        <Pressable onPress={onImport} style={styles.iconButton}>
          <UploadIcon color="#374151" />
        </Pressable>
        <Pressable onPress={onExport} style={styles.iconButton}>
          <DownloadIcon color="#374151" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default Header;
