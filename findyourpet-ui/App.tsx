import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
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
    })();
  });

  return (
    <>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </>
  );
}

export default App;
