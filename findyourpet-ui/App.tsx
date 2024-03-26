import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/store/store';
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
  
      const isFirstLogin = await AsyncStorage.getItem('isFirstLogin');
      if (isFirstLogin === null) {
        await AsyncStorage.setItem('isFirstLogin', 'false');
        enableFingerprintAuthentication();
      }
    })();
  }, []);

  const enableFingerprintAuthentication = async () => {
    const result = await Authenthicator.unlock();
    result ? console.log('Fingerprint authentication enabled!') : console.log('Fingerprint authentication setup failed.');
  };

  return (
    <>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </>
  );
}

export default App;
