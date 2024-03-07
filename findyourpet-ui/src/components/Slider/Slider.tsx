import React from 'react';
import { Platform } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const MultipleSlider = ({values, min, max, onSliderChange}: any) => {
  const multiSliderValuesChange = (values: any) => onSliderChange(values);

  return (
    <MultiSlider
      markerStyle={{
        ...Platform.select({
          ios: {
            height: 20,
            width: 20,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 1,
            shadowOpacity: 0.1,
          },
          android: {
            height: 20,
            width: 20,
            borderRadius: 50,
            backgroundColor: '#1792E8',
          },
        }),
      }}
      pressedMarkerStyle={{
        ...Platform.select({
          android: {
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: '#148ADC',
          },
        }),
      }}
      selectedStyle={{
        backgroundColor: '#1792E8',
      }}
      trackStyle={{
        backgroundColor: '#CECECE',
      }}
      touchDimensions={{
        height: 30,
        width: 30,
        borderRadius: 20,
        slipDisplacement: 30,
      }}
      values={values}
      sliderLength={280}
      onValuesChange={multiSliderValuesChange}
      min={min}
      max={max}
      allowOverlap={false}
      minMarkerOverlapDistance={10}
    />
  );
};

export default MultipleSlider;
