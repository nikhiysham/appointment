import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Text from "@/components/Text";
import globalStyles from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";

export function SplashScreen() {
  const router = useRouter();
  const [hasLogin, setHasLogin] = useState<boolean>(false);
  const [hasRole, setHasRole] = useState<string>("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const isLogin = await AsyncStorage.getItem("IS_LOGIN");
    const role = await AsyncStorage.getItem("ROLE");
    setHasLogin(isLogin == "1" ? true : false);
    setHasRole(role ?? "");

    if (isLogin) {
      if (role == "superadmin") {
        return router.replace("/dashboard");
      } else {
        return router.replace("/appointment/form");
      }
    } else {
      return router.replace("/login");
    }
  };

  return (
    <View
      style={[
        styles.container,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
      ]}
    >
      <Text style={{ ...globalStyles.text4Xl, ...globalStyles.textBold }}>
        Appointment App
      </Text>
      <View style={globalStyles.paddMd} />
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default SplashScreen;
