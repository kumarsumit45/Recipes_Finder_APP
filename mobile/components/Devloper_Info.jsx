import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";


const Devloper_Info = () => {
    
    const handelPress =()=>{
        Linking.openURL('https://www.linkedin.com/in/sumit-kumar-yadav950/')

    }
  return (
    <View style={styles.container}>
      <Text style={styles.linkText}>This app is developed by </Text>
      <TouchableOpacity 
      activeOpacity={0.6}
      onPress={handelPress}
     >
        <Text style={styles.link}>@Sumit Kumar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position:"static",
    // borderWidth:1
  },
  link:{
    color:COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: COLORS.text,
  }
});
export default Devloper_Info;
