import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PhotoPreview = ({ uri }: any) => {
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
});

export default PhotoPreview;