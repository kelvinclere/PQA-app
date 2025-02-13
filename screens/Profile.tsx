import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { useAuth } from "../context/AuthContext"; 

const Profile = () => {
  const { user } = useAuth(); 

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data found. Please log in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="My Account"
          titleStyle={styles.cardTitle}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="account"
              size={50}
              style={styles.avatar}
            />
          )}
        />

        <Card.Content>
          <View style={styles.userInfo}>
         

            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.userUsername}>{user.username}</Text>
            </View>
          </View>

          <Card style={styles.roleCard}>
            <Card.Title
              title="Role"
              titleStyle={styles.roleTitle}
              subtitle="My system role"
              subtitleStyle={styles.roleSubtitle}
            />
            <Card.Content>
              <Text style={styles.roleText}>{user.role}</Text>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    borderRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: "#ff7900",
  },
  avatarFallback: {
    backgroundColor: "#ccc",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userDetails: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userUsername: {
    fontSize: 14,
    color: "#666",
  },
  roleCard: {
    marginTop: 16,
    borderRadius: 8,
    elevation: 2,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roleSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  roleText: {
    fontSize: 16,
    color: "#333",
  },
});