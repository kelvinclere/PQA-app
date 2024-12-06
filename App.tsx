import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';
import Register from './screens/Register';
import NewQuestionScreen from './screens/NewQuestionScreen';
import AllQuestionsScreen from './screens/AllQuestions';
import QuestionDetail from './screens/QuestionDetail';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export type RootStackParamList = {
  Login: undefined;
  ForgotPasswordScreen: undefined;
  Home: undefined;
  Register: undefined;
  NewQuestionScreen: undefined; 
};

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Home"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: 'Forgot Password' }}
      />
      
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Register' }}
      />
      
      <Stack.Screen
        name="NewQuestionScreen"
        component={NewQuestionScreen} 
        options={{ title: 'New Question' }}
      />
        <Stack.Screen
        name="AllQuestions"
        component={AllQuestionsScreen} 
        options={{ title: 'All Questions' }}
      />
        <Stack.Screen
        name="QuestionDetail"
        component={QuestionDetail}
        options={{ title: 'Question Detail' }}
      />

          
   
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="NewQuestion" component={NewQuestionScreen} />
      <Drawer.Screen name="AllQuestions" component={AllQuestionsScreen} />
      
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
