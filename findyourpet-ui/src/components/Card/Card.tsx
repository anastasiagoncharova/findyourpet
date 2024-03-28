import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedPets } from '../../store/petsSlice';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function Card({ pets }: any) {
  const [state, setState] = useState({ currentIndex: 0 });
  const [expanded, setExpanded] = useState(false);
  const selectedPets = useSelector((state: any) => state.pets.selectedPets);
  const dispatch = useDispatch();

  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const SCREEN_WIDTH = Dimensions.get('window').width;

  let position = new Animated.ValueXY();

  const expandIcon = expanded ? 'upcircle' : 'downcircle';

  const noIcon = 'close-circle-outline';

  const yesIcon = 'heart-circle-outline';

  const returnIcon = 'arrow-undo-circle-outline';

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
        if (
          !selectedPets.some(
            (pet: any) => pet.id === pets[state.currentIndex].id
          )
        ) {
          dispatch(addSelectedPets(pets[state.currentIndex]));
        }
        Animated.spring(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          setState((prevState) => ({
            currentIndex: prevState.currentIndex + 1,
          }));
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          setState((prevState) => ({
            currentIndex: prevState.currentIndex + 1,
          }));
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 4,
        }).start();
      }
    },
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const returnClick = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      friction: 4,
    }).start(() => {
      setState((prevState) => ({
        currentIndex: prevState.currentIndex - 1,
      }));
    });
  };

  const noClick = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
      position.setValue({ x: 0, y: 0 });
    });
  };

  const yesClick = () => {
    if (
      !selectedPets.some((pet: any) => pet.id === pets[state.currentIndex].id)
    ) {
      dispatch(addSelectedPets(pets[state.currentIndex]));
    }
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleReloadAll = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      friction: 4,
    }).start(() => {
      setState({ currentIndex: 0 });
    });
  };

  function renderPets() {
    return pets
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
                  padding: 10,
                  position: 'absolute',
                },
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
              <Image style={styles.image} source={item.image} />
              {!expanded && (
                <View style={styles.iconContainer}>
                  {state.currentIndex > 0 && (
                    <View>
                      <TouchableOpacity onPress={returnClick}>
                        <Ionicons
                          name={returnIcon}
                          size={60}
                          color='#ffc266'
                          style={styles.icon}
                        />
                        <View style={styles.iconBackground} />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View>
                    <TouchableOpacity onPress={noClick}>
                      <Ionicons
                        name={noIcon}
                        size={70}
                        color='#ff6666'
                        style={styles.icon}
                      />
                      <View style={styles.iconBackground} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={yesClick}>
                      <Ionicons
                        name={yesIcon}
                        size={70}
                        color='#00b300'
                        style={styles.icon}
                      />
                      <View style={styles.iconBackground} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={styles.textContainer}>
                <View style={styles.textRow}>
                  <Text style={styles.imageText}>
                    {item.name}, {item.age}
                  </Text>
                  <TouchableOpacity onPress={toggleExpand}>
                    <AntDesign name={expandIcon} size={40} color='#ff6666' />
                  </TouchableOpacity>
                </View>
                {expanded && (
                  <View style={styles.descriptionContainer}>
                    <Text>
                      {item.gender.charAt(0).toUpperCase() +
                        item.gender.slice(1)}{' '}
                      {item.type}
                    </Text>
                    <Text>
                      {item.vaccinated ? 'Vaccinated ' : 'Not vaccinated '}
                      <Ionicons
                        name={
                          item.vaccinated
                            ? 'ios-checkmark-circle'
                            : 'ios-close-circle'
                        }
                        size={20}
                        color={item.vaccinated ? 'green' : 'red'}
                      />
                    </Text>
                    <Text>
                      {item.sterilized ? 'Sterilized ' : 'Not sterilized '}
                      <Ionicons
                        name={
                          item.sterilized
                            ? 'ios-checkmark-circle'
                            : 'ios-close-circle'
                        }
                        size={20}
                        color={item.sterilized ? 'green' : 'red'}
                      />
                    </Text>
                    <Text>{item.description}</Text>
                  </View>
                )}
              </View>
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
                  padding: 10,
                  position: 'absolute',
                },
              ]}
            >
              <Image style={styles.image} source={item.image} />
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>
                  {item.name}, {item.age}
                </Text>
              </View>
            </Animated.View>
          );
        }
      })
      .reverse();
  }
  return (
    <View style={styles.container}>
      {state.currentIndex >= pets.length && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleReloadAll}
          >
            <Text>Reload all pets</Text>
          </TouchableOpacity>
        </View>
      )}
      {renderPets()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  buttonContainer: {
    margin: 'auto'
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 200,
    alignSelf: 'center',
    borderRadius: 5,
  },
  descriptionContainer: {
    maxHeight: 100,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
    zIndex: 1,
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
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 1,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '9%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 20,
  },
  iconBackground: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    left: 0,
    right: 0,
    bottom: '3%',
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#f2f2f2',
    shadowColor: '#f2f2f2',
  },
  icon: {
    zIndex: 25,
  },
});
