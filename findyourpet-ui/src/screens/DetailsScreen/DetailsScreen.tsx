import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type DetailsScreenParams = {
  pet: any;
};

const DetailsScreen: React.FC<any> = ({ route }) => {
  const { pet } = route.params as DetailsScreenParams;

  return (
    <View style={styles.container}>
      <Image source={pet.image as any} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.description}>{pet.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
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