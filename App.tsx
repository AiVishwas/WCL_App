import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens();

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import { RootStackParamList } from './src/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide the header for the Login screen
        />
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ headerShown: false }} // Hide the header for the TaskList screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
