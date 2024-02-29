import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MessagesScreen() {
  const navigation: any = useNavigation();
  const selectedPets = useSelector((state: any) => state.pets.selectedPets);

  const handlePress = (pet: any) => {
    navigation.navigate('Details', { pet: pet });
  };

  function renderPets() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
      {selectedPets.map((item: Pet, i: number) => (
        <TouchableOpacity key={i} onPress={() => handlePress(item)}>
          <View style={[styles.itemContainer, i !== 0 && styles.border]}>
            <Image source={item.image as any} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    );
  }
  return <View style={{ flex: 1 }}>{renderPets()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    paddingTop: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'grey',
  },
});