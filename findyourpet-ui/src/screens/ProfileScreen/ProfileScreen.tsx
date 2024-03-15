import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { petTypeMap, genderMap, vaccinatedMap, sterilizedMap } from '../../models/Checkbox';
import UserData from '../../components/UserData/UserData';
import Slider from '../../components/Slider/Slider';
import Checkbox from '../../components/Checkbox/Checkbox';

export default function ProfileScreen() {
  const [selectedType, setSelectedType] = useState('both');
  const [selectedGender, setSelectedGender] = useState('both');
  const [vaccinated, setVaccinated] = useState(true);
  const [sterilized, setSterilized] = useState(true);
  const [ageSliderValue, setAgeSliderValue] = useState([0, 30]);
  const [locationSliderValue, setLocationSliderValue] = useState([0, 600]);

  const handleTypeChange = (item: any) => {
    setSelectedType(item);
  };

  const handleGenderChange = (item: any) => {
    setSelectedGender(item);
  };

  const handleVaccinatedChange = (item: any) => {
    setVaccinated(item === 'yes');
  };

  const handleSterilizedChange = (item: any) => {
    setSterilized(item === 'yes');
  };

  const handleAgeSliderChange = (values: any) => {
    setAgeSliderValue(values);
  };

  const handleLocationSliderChange = (values: any) => {
    setLocationSliderValue(values);
  };

  const handleSave = () => {
    //
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <UserData />
      <View style={styles.container}>
        <Text style={styles.text}>
          What type of pets are you searching for?
        </Text>
        <View style={styles.innerContainer}>
          {petTypeMap.map((item) => {
            return (
              <Checkbox
                key={item.name}
                item={item.name}
                selectedItem={selectedType}
                onCheckboxPress={handleTypeChange}
              />
            );
          })}
        </View>
        <Text style={styles.text}>Select age range</Text>
        <View style={styles.innerContainer}>
          <View style={styles.sliderWrapper}>
            <View style={styles.labelWrapper}>
              <Text>{ageSliderValue[0]}</Text>
              <Text>{ageSliderValue[1]}</Text>
            </View>
            <Slider
              values={[ageSliderValue[0], ageSliderValue[1]]}
              min={0}
              max={30}
              onSliderChange={handleAgeSliderChange}
            />
          </View>
        </View>
        <Text style={styles.text}>Select pet gender</Text>
        <View style={styles.innerContainer}>
          {genderMap.map((item) => {
            return (
              <Checkbox
                key={item.name}
                item={item.name}
                selectedItem={selectedGender}
                onCheckboxPress={handleGenderChange}
              />
            );
          })}
        </View>
        <Text style={styles.text}>Select location range</Text>
        <View style={styles.innerContainer}>
          <View style={styles.sliderWrapper}>
            <View style={styles.labelWrapper}>
              <Text>{locationSliderValue[0]} km</Text>
            </View>
            <Slider
              values={[locationSliderValue[0]]}
              min={0}
              max={600}
              onSliderChange={handleLocationSliderChange}
            />
          </View>
        </View>
        <Text style={styles.text}>Vaccinated?</Text>
        <View style={styles.innerContainer}>
          {vaccinatedMap.map((item) => {
            return (
              <Checkbox
                key={item.name}
                item={item.name}
                selectedItem={vaccinated ? 'yes' : 'no'}
                onCheckboxPress={handleVaccinatedChange}
              />
            );
          })}
        </View>
        <Text style={styles.text}>Sterilized?</Text>
        <View style={styles.innerContainer}>
          {sterilizedMap.map((item) => {
            return (
              <Checkbox
                key={item.name}
                item={item.name}
                selectedItem={sterilized ? 'yes' : 'no'}
                onCheckboxPress={handleSterilizedChange}
              />
            );
          })}
        </View>
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderWrapper: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
});
