import React from 'react';
import { TouchableOpacity, Alert, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SaveImage } from '../../utils/SaveImage';

const TakePhoto = ({ children, setPhotoUrl }: any) => {
  async function takePhoto() {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const url = await SaveImage.saveAndAddImage(cameraResp.assets[0].uri);
        setPhotoUrl(url);
      }
    } catch (e: any) { 
      Alert.alert('Error Uploading Image ' + e.message);
    }
  }

  return <TouchableOpacity style={styles.button} onPress={takePhoto}><View>{children}</View></TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  }
});

export default TakePhoto;