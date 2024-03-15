import React from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SaveImage } from '../../utils/SaveImage';

const TakePhoto = ({ children, setPhotoUrls }: any) => {
  async function uploadPhoto() {
    try {
      const cameraResp = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: true,
        base64: false,
      });

      if (!cameraResp.canceled) {
        const photoUrls = [];
        for (const asset of cameraResp.assets) {
          try {
            const url = await SaveImage.saveAndAddImage(asset.uri);
            photoUrls.push(url);
          } catch (error) {
            console.error('Error saving image:', error);
          }
        }
        setPhotoUrls(photoUrls);
      }
    } catch (e: any) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  }

  return <TouchableOpacity style={styles.button} onPress={uploadPhoto}>{children}</TouchableOpacity>;
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