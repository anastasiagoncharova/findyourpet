import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as LocalAuthentication from 'expo-local-authentication';
import { Authenthicator } from './src/utils/Auth';

function App(): React.JSX.Element {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  Authenthicator.unlock();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  return (
    <>
      <Provider store={store}>
        <AppContainer />
      </Provider>
      <Text>
        {' '}
        {isBiometricSupported
          ? 'Your device is compatible with Biometrics'
          : 'Face or Fingerprint scanner is not available on this device'}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
