import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/DashboadScreen";
import AdminScreen from "../screens/AdminScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        drawerActiveTintColor: "green",
        drawerInactiveTintColor: "gray",
      }}
    >
      {/* Home Screen */}
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="home" size={20} color={color} />
          ),
        }}
      />

      {/* Admin Screen */}
      {user?.status === "1" && (
        <Drawer.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="admin-panel-settings" size={24} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
