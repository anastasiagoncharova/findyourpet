import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DetailsScreenParams = {
  pet: any;
};

const DetailsScreen: React.FC<any> = ({ route }) => {
  const { pet } = route.params as DetailsScreenParams;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={pet.image as any} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text>
            {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}{' '}
            {pet.type}
          </Text>
          <Text>
            {pet.vaccinated ? 'Vaccinated ' : 'Not vaccinated '}
            <Ionicons
              name={
                pet.vaccinated ? 'ios-checkmark-circle' : 'ios-close-circle'
              }
              size={20}
              color={pet.vaccinated ? 'green' : 'red'}
            />
          </Text>
          <Text>
            {pet.sterilized ? 'Sterilized ' : 'Not sterilized '}
            <Ionicons
              name={
                pet.sterilized ? 'ios-checkmark-circle' : 'ios-close-circle'
              }
              size={20}
              color={pet.sterilized ? 'green' : 'red'}
            />
          </Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default DetailsScreen;
