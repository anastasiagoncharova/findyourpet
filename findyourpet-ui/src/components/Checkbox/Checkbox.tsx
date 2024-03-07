import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({item, selectedItem, onCheckboxPress}: any) => {
  return (
    <TouchableOpacity
      style={[styles.checkbox, selectedItem === item && styles.selected]}
      onPress={() => {
        onCheckboxPress(item);
      }}
    >
      <MaterialIcons
        name={
          selectedItem === item ? 'check-box' : 'check-box-outline-blank'
        }
        size={24}
        color='#007bff'
      />
      <Text style={styles.checkboxLabel}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 5,
  },
  checkboxLabel: {
    marginLeft: 5,
    textTransform: 'capitalize'
  },
});

export default Checkbox;
