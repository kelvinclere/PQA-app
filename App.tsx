import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewQuestionScreen from './screens/NewQuestionScreen';
import DrawerNavigation from './navigation/DrawerNavigation';
import AllQuestionsScreen from './screens/AllQuestions';
import RegisterScreen from './screens/Register';
import QuestionDetail from './screens/QuestionDetail';
import { AuthProvider } from './context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  NewQuestion: undefined;
  AllQuestions: undefined;
  About: undefined;
  QuestionDetail: { questionId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

type NavigationProps = StackNavigationProp<RootStackParamList>;

// Create a QueryClient instance
const queryClient = new QueryClient();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={DrawerNavigation} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: true, title: 'Forgot Password' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true, title: 'Register' }}
      />
      <Stack.Screen
        name="NewQuestion"
        component={NewQuestionScreen}
        options={{ headerShown: true, title: 'New Question' }}
      />
      <Stack.Screen
        name="AllQuestions"
        component={AllQuestionsScreen}
        options={{ headerShown: true, title: 'All Questions' }}
      />
      <Stack.Screen
        name="QuestionDetail"
        component={QuestionDetail}
        options={{ headerShown: true, title: 'Question Detail' }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
