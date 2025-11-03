import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const pickImageAsync = async (): Promise<string | null> => {
  try {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' && mediaStatus !== 'granted') {
      Alert.alert('Erro', 'Permissão para acessar câmera e galeria é necessária.');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    const asset = result.assets[0];
    return asset.uri;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};

export const convertUriToBase64 = async (uri: string): Promise<string> => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  return `data:image/${fileType};base64,${base64}`;
};

