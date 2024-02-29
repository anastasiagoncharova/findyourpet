import React from "react";
import { useSelector } from 'react-redux';
import { View } from "react-native";
import Card from "../../components/Card/Card";

export default function HomeScreen() {
  const pets = useSelector((state: any) => state.pets.pets);

  return (
    <View>
      <Card pets={pets}></Card>
    </View>
  );
}
