import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  adminPetTypeMap,
  adminGenderMap,
  vaccinatedMap,
  sterilizedMap,
} from '../../models/Checkbox';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Checkbox from '../../components/Checkbox/Checkbox';
import TakePhoto from '../../components/TakePhoto/TakePhoto';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';

const AdminScreen: React.FC = () => {
  const [petData, setPetData] = useState({
    name: '',
    description: '',
    gender: '',
    type: '',
    age: '',
    vaccinated: false,
    sterilized: false,
    image: '',
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlArray, setPhotoUrlArray] = useState([]);
  const [vaccinated, setVaccinated] = useState(true);
  const [sterilized, setSterilized] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed to access the photo gallery');
      }
    })();
  }, []);

  const handleVaccinatedChange = (item: any) => {
    setVaccinated(item === 'yes');
  };

  const handleSterilizedChange = (item: any) => {
    setSterilized(item === 'yes');
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setPetData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const takePhotoUrl = (url: any) => {
    setPhotoUrl(url);
  };

  const uploadPhotoUrl = (urls: any) => {
    setPhotoUrlArray(urls);
    setPhotoUrl(urls[0]);
  };

  const handleSubmit = () => {
    // Handle submitting the pet data (e.g., sending it to an API)
    console.log('Pet data submitted:', petData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder='Pet Name'
          value={petData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder='Description'
          value={petData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder='Age'
          value={petData.age.toString()}
          onChangeText={(value) => handleInputChange('age', value)}
          keyboardType='numeric'
        />
      </View>
      <Text style={styles.text}>Select pet gender</Text>
      <View style={styles.innerContainer}>
        {adminGenderMap.map((item) => {
          return (
            <View key={item.name} style={styles.checkbox}>
              <Checkbox
                item={item.name}
                selectedItem={petData.gender}
                onCheckboxPress={(value: any) =>
                  handleInputChange('gender', value)
                }
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.text}>Select pet type</Text>
      <View style={styles.innerContainer}>
        {adminPetTypeMap.map((item) => {
          return (
            <View key={item.name} style={styles.checkbox}>
              <Checkbox
                item={item.name}
                selectedItem={petData.type}
                onCheckboxPress={(value: any) =>
                  handleInputChange('type', value)
                }
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.text}>Vaccinated?</Text>
      <View style={styles.innerContainer}>
        {vaccinatedMap.map((item) => {
          return (
            <View key={item.name} style={styles.checkbox}>
              <Checkbox
                item={item.name}
                selectedItem={vaccinated ? 'yes' : 'no'}
                onCheckboxPress={handleVaccinatedChange}
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.text}>Sterilized?</Text>
      <View style={styles.innerContainer}>
        {sterilizedMap.map((item) => {
          return (
            <View key={item.name} style={styles.checkbox}>
              <Checkbox
                item={item.name}
                selectedItem={sterilized ? 'yes' : 'no'}
                onCheckboxPress={handleSterilizedChange}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.buttonsContainer}>
        <TakePhoto setPhotoUrl={takePhotoUrl}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TakePhoto>

        <UploadPhoto setPhotoUrls={uploadPhotoUrl}>
          <Text style={styles.buttonText}>Upload Photo</Text>
        </UploadPhoto>
      </View>
      {photoUrl && (
        <View style={styles.imagePreview}>
          <PhotoPreview uri={photoUrl} />
        </View>
      )}
      <View style={styles.formGroup}>
        <Button title='Submit' onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default AdminScreen;
