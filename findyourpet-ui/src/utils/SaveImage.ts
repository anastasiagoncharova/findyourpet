import * as FileSystem from 'expo-file-system';

export const SaveImage = {
  async saveAndAddImage(imageUri: any) {
    try {
      const fileName = `${Date.now()}_uploadedImage.jpg`;
      const destinationPath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.copyAsync({
        from: imageUri,
        to: destinationPath,
      });
      return destinationPath;
    } catch (error) {
      console.error('Error saving image:', error);
      return '';
    }
  }
}