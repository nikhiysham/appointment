import React from "react";
import globalStyles from "@/constants/styles";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[
        globalStyles.row,
        globalStyles.justifyEnd,
        globalStyles.alignCenter,
      ]}
      onPress={async () => {
        await AsyncStorage.clear();
        router.replace("/login");
      }}
    >
      <Text style={globalStyles.textNormal}>Logout</Text>
      <View style={globalStyles.paddSm} />
      <Ionicons name="log-out" size={30} />
    </TouchableOpacity>
  );
};

export default Logout;
