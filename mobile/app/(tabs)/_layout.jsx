import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";

const Tab_Layout = () => {
  const { isSignedIn ,isLoaded } = useAuth();

  if(!isLoaded) return null;

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor:COLORS.primary,
      tabBarInactiveTintColor:COLORS.textLight,
      // tabBarActiveBackgroundColor:COLORS.textLight,
      tabBarStyle:{
        marginBottom:10,
        paddingVertical:10,
        borderRadius:20,
        marginHorizontal:10,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        // flex:1,
        paddingTop:5
      },
      tabBarLabelStyle:{
        fontSize:13,
        fontWeight:"800"
      }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),

          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),

          title: "Search",
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),

          title: "Favorites",
        }}
      />
    </Tabs>
  );
};

export default Tab_Layout;
