import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer' 
import HomeScreen from '../screens/Home/Home';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  const drawerOptions: DrawerNavigationOptions | any = {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerStyle: {
      width: 250
    },
    drawerContent: ({ navigation }: any) => <DrawerContainer navigation={navigation} />,
  };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      {...drawerOptions}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  );
}

const AppContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

export default AppContainer;