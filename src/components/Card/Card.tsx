import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

export default function Card({ cats }: any) {
  const [state, setState] = useState({currentIndex: 0});
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  let position = new Animated.ValueXY();
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }, useNativeDriver: true,
        }).start(() => {
          setState(prevState => ({
            currentIndex: prevState.currentIndex + 1
          }));
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }, useNativeDriver: true,
        }).start(() => {
          setState(prevState => ({
            currentIndex: prevState.currentIndex + 1
          }));
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 }, useNativeDriver: true,
          friction: 4,
        }).start();
      }
    },
  });

  function renderCats() {
    return cats
      .map((item: any, i: number) => {
        if (i < state.currentIndex) {
          return null;
        } else if (i == state.currentIndex) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              key={i}
              style={[
                rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                },
                styles.container,
              ]}
            >
              <Animated.View
                style={[{ opacity: likeOpacity }, styles.likeTextView]}
              >
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>
              <Animated.View
                style={[{ opacity: nopeOpacity }, styles.nopeTextView]}
              >
                <Text style={styles.nopeText}>NOPE</Text>
              </Animated.View>
              <Image style={styles.image} source={item.uri} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={i}
              style={[
                {
                  opacity: nextCardOpacity,
                  transform: [{ scale: nextCardScale }],
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                },
                styles.container,
              ]}
            >
              <Image style={styles.image} source={item.uri} />
            </Animated.View>
          );
        }
      })
      .reverse();
  }
  return <View style={{ flex: 1 }}>{renderCats()}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'absolute',
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  likeTextView: {
    transform: [{ rotate: '-30deg' }],
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1000,
  },
  nopeTextView: {
    transform: [{ rotate: '30deg' }],
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000,
  },
  likeText: {
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
  nopeText: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
});
