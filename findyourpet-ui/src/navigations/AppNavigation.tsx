import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/Home';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import AdminScreen from '../screens/AdminScreen/AdminScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator({ handleLogoutClick }: { handleLogoutClick: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        headerRight: () => (
          <Ionicons
            name='log-out'
            size={24}
            color='black'
            style={{ marginRight: 10 }}
            onPress={handleLogoutClick}
          />
        ),
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Messages' component={MessagesScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AppContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

const AppStackNavigator: React.FC = () => {
  const [firstTimeAccess, setFirstTimeAccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  const getCurrentUser = () => {
    // mocked data
    return { isAdmin: false };
  };

  const handleSignUpSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    AsyncStorage.getItem('isFirstTimeAccess')
      .then((value) => {
        if (value === null) {
          setFirstTimeAccess(true);
        } else {
          setFirstTimeAccess(false);
          const userData = getCurrentUser();
          setUser(userData);
        }
      })
      .catch((error) =>
        console.error(
          'Error retrieving isFirstTimeAccess from AsyncStorage:',
          error
        )
      );
  }, []);

  return (
    <Stack.Navigator>
      {firstTimeAccess ? (
        <Stack.Screen
          name='SignUp'
          options={{
            headerTitle: 'Sign Up',
          }}
        >
          {() => <SignUpScreen onSignUpSuccess={handleSignUpSuccess} />}
        </Stack.Screen>
      ) : user ? (
        user.isAdmin ? (
          <Stack.Screen
            name='Admin'
            component={AdminScreen}
            options={{
              headerTitle: 'Admin',
              headerRight: () => (
                <Ionicons
                  name='log-out'
                  size={24}
                  color='black'
                  style={{ marginRight: 10 }}
                  onPress={handleLogout}
                />
              ),
            }}
          />
        ) : (
          <Stack.Screen
          name='TabNavigator'
          options={{
            headerShown: false,
          }}
        >
          {() => <TabNavigator handleLogoutClick={handleLogout} />}
        </Stack.Screen>


        )
      ) : (
        <Stack.Screen
          name='Login'
          options={{
            headerTitle: 'Login',
          }}
        >
          {() => <LoginScreen onLoginSuccess={handleLoginSuccess} />}
        </Stack.Screen>
      )}
      <Stack.Screen
        name='Details'
        component={DetailsScreen}
        options={{
          headerTitle: 'Details',
        }}
      />
    </Stack.Navigator>
  );
};
export default AppContainer;
