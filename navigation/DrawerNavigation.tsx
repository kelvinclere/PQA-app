import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboadScreen from '../screens/DashboadScreen';
import AllQuestionsScreen from '../screens/AllQuestions';
import NewQuestionScreen from '../screens/NewQuestionScreen';
import AboutScreen from '../screens/AboutScreen';
import UnAssignedQuestionsScreen from '../screens/UnAssignedQuestionsScreen';
import AssignedQuestionsScreen from '../screens/AssignedQuestions';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AllUsers from 'screens/AllUsers';
import ProfileScreen from '../screens/Profile'; 

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [activeRoute, setActiveRoute] = useState('Dashboad');
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);

  const handleNavigation = (route) => {
    setActiveRoute(route);
    navigation.navigate(route);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.drawerContent}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Welcome Back! {user?.firstName || 'Guest User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
        
        
        <TouchableOpacity onPress={() => handleNavigation('Profile')} style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      

      <TouchableOpacity
        style={[styles.link, activeRoute === 'Dashboad' && styles.activeLink]}
        onPress={() => handleNavigation('Dashboad')}
      >
        <Icon name="home-outline" size={20} color={activeRoute === 'Dashboad' ? '#fff' : '#000'} />
        <Text style={[styles.linkText, activeRoute === 'Dashboad' && styles.activeLinkText]}>Dashboard</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={[styles.link, activeRoute === 'AllUsers' && styles.activeLink]}
        onPress={() => handleNavigation('AllUsers')}
      >
        <Icon name="people-outline" size={20} color={activeRoute === 'AllUsers' ? '#fff' : '#000'} />
        <Text style={[styles.linkText, activeRoute === 'AllUsers' && styles.activeLinkText]}>All Users</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

         <TouchableOpacity
        style={styles.link}
        onPress={() => setIsQuestionsOpen((prev) => !prev)}
      >
        <Icon name="help-circle-outline" size={20} color="#000" />
        <Text style={styles.linkText}>Questions</Text>
        <Icon
          name={isQuestionsOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color="#000"
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {isQuestionsOpen && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[
              styles.dropdownItem,
              activeRoute === 'AllQuestions' && styles.activeLink,
            ]}
            onPress={() => handleNavigation('AllQuestions')}
          >
            <Icon name="list-outline" size={18} color={activeRoute === 'AllQuestions' ? '#fff' : '#000'} />
            <Text style={[styles.dropdownText, activeRoute === 'AllQuestions' && styles.activeLinkText]}>
              All Questions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dropdownItem,
              activeRoute === 'NewQuestion' && styles.activeLink,
            ]}
            onPress={() => handleNavigation('NewQuestion')}
          >
            <Icon name="add-circle-outline" size={18} color={activeRoute === 'NewQuestion' ? '#fff' : '#000'} />
            <Text style={[styles.dropdownText, activeRoute === 'NewQuestion' && styles.activeLinkText]}>
              Add New Question
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dropdownItem,
              activeRoute === 'UnAssignedQuestions' && styles.activeLink,
            ]}
            onPress={() => handleNavigation('UnAssignedQuestions')}
          >
            <Icon name="document-outline" size={18} color={activeRoute === 'UnAssignedQuestions' ? '#fff' : '#000'} />
            <Text style={[styles.dropdownText, activeRoute === 'UnAssignedQuestions' && styles.activeLinkText]}>
              Unassigned Questions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dropdownItem,
              activeRoute === 'AssignedQuestions' && styles.activeLink,
            ]}
            onPress={() => handleNavigation('AssignedQuestions')}
          >
            <Icon name="checkmark-circle-outline" size={18} color={activeRoute === 'AssignedQuestions' ? '#fff' : '#000'} />
            <Text style={[styles.dropdownText, activeRoute === 'AssignedQuestions' && styles.activeLinkText]}>
              Assigned Questions
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.divider} />

      
      <TouchableOpacity
        style={[styles.link, activeRoute === 'About' && styles.activeLink]}
        onPress={() => handleNavigation('About')}
      >
        <Icon name="information-circle-outline" size={20} color={activeRoute === 'About' ? '#fff' : '#000'} />
        <Text style={[styles.linkText, activeRoute === 'About' && styles.activeLinkText]}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={handleLogout}
      >
        <Icon name="log-out-outline" size={20} color="#000" />
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboad" component={DashboadScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="AllUsers" component={AllUsers} />
      <Drawer.Screen name="AllQuestions" component={AllQuestionsScreen} />
      <Drawer.Screen name="NewQuestion" component={NewQuestionScreen} />
      <Drawer.Screen name="UnAssignedQuestions" component={UnAssignedQuestionsScreen} />
      <Drawer.Screen name="AssignedQuestions" component={AssignedQuestionsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
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
    color: "#ff7900",
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d',
  },
  editProfileButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff7900',
    borderRadius: 5,
  },
  editProfileText: {
    color: '#fff',
    fontWeight: 'bold',
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
    backgroundColor: '#ff7900',
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
  dropdownContainer: {
    marginLeft: 30,
    marginVertical: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 10,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
});
