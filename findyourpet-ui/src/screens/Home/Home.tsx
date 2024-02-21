import React, { useLayoutEffect } from "react";
import { useSelector } from 'react-redux';
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import Card from "../../components/Card/Card";

export default function HomeScreen(props: any) {
  const { navigation } = props;
  const cats = useSelector((state: any) => state.cats.cats);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  return (
    <View>
      <Card cats={cats}></Card>
    </View>
  );
}
