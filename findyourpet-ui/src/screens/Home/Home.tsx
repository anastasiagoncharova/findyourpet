import React from "react";
import { useSelector } from 'react-redux';
import { View } from "react-native";
import Card from "../../components/Card/Card";

export default function HomeScreen() {
  const cats = useSelector((state: any) => state.cats.cats);

  return (
    <View>
      <Card cats={cats}></Card>
    </View>
  );
}
