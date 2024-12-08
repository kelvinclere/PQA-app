import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AllQuestionsScreen from '../screens/AllQuestions';
import NewQuestionScreen from '../screens/NewQuestionScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const { user } = useContext(AuthContext);

 
  const [activeRoute, setActiveRoute] = useState('Home');

  const handleNavigation = (route) => {
    setActiveRoute(route);
    navigation.navigate(route);
  };

  return (
    <View style={styles.drawerContent}>
      
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
      </View>

       <View style={styles.divider} />

     
      <TouchableOpacity
        style={[
          styles.link,
          activeRoute === 'Home' && styles.activeLink, 
        ]}
        onPress={() => handleNavigation('Home')}
      >
        <Icon name="home-outline" size={20} color={activeRoute === 'Home' ? '#fff' : '#000'} />
        <Text style={[styles.linkText, activeRoute === 'Home' && styles.activeLinkText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.link,
          activeRoute === 'AllQuestions' && styles.activeLink, 
        ]}
        onPress={() => handleNavigation('AllQuestions')}
      >
        <Icon name="list-outline" size={20} color={activeRoute === 'AllQuestions' ? '#fff' : '#000'} />
        <Text
          style={[
            styles.linkText,
            activeRoute === 'AllQuestions' && styles.activeLinkText,
          ]}
        >
          All Questions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.link,
          activeRoute === 'NewQuestion' && styles.activeLink, 
        ]}
        onPress={() => handleNavigation('NewQuestion')}
      >
        <Icon name="add-outline" size={20} color={activeRoute === 'NewQuestion' ? '#fff' : '#000'} />
        <Text
          style={[
            styles.linkText,
            activeRoute === 'NewQuestion' && styles.activeLinkText,
          ]}
        >
          Add New Question
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="AllQuestions" component={AllQuestionsScreen} />
      <Drawer.Screen name="NewQuestion" component={NewQuestionScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 40,
    backgroundColor: '#f8f9fa', 
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d', 
  },
  link: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent', 
  },
  activeLink: {
    backgroundColor: '#007BFF', 
  },
  linkText: {
    fontSize: 16,
    color: 'black', 
    marginLeft: 10, 
  },
  activeLinkText: {
    color: '#fff', 
  },
    divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc', 
    marginVertical: 10, 
  },
});
