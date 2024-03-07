import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserData = () => {
  const userData = useSelector((state: any) => state.userData.userData);
  const userPhoto = userData.photo ? { uri: userData.photo } : null;

  return (
    <View style={styles.container}>
    <View style={styles.userInfo}>
      <View style={styles.userData}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.name}</Text>
      </View>
      <View style={styles.userData}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>
      <View style={styles.userData}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{userData.phone}</Text>
      </View>
    </View>
    <View style={styles.userPhotoContainer}>
      {userPhoto ? (
        <Image source={userPhoto} style={styles.userPhoto} />
      ) : (
        <Ionicons name="person" size={50} color="#ccc" style={styles.userIcon} />
      )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  userInfo: {
    flex: 1,
  },
  userData: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  userPhotoContainer: {
    marginLeft: 20,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userIcon: {
    marginRight: 10,
  },
});

export default UserData;
