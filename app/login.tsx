import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import Text from "@/components/Text";
import globalStyles from "../constants/styles";
import { SQLiteRunResult, useSQLiteContext } from "expo-sqlite";
import { colors } from "@/constants/colors";

export function Header() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState("");

  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ "sqlite_version()": string }>(
        "SELECT sqlite_version()"
      );
      if (result) {
        setVersion(result["sqlite_version()"]);
      }
    }
    setup();
  }, []);
  return (
    <View style={{}}>
      <Text style={{}}>SQLite version: {version}</Text>
    </View>
  );
}

const LoginScreen = () => {
  // Hooks
  const db = useSQLiteContext();

  // State
  const [email, setEmail] = useState<string>("admin@gmail.com");
  const [password, setPassword] = useState<string>("abcd1234");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    console.log(email, password);
    if (email != "" && email != null && password != "" && password != null) {
      const result: any = db.getAllSync(
        "SELECT * FROM users WHERE email=? AND password=?",
        email,
        password
      );
      setLoading(false);

      if (result.length > 0) {
        await AsyncStorage.setItem("IS_LOGIN", "1");

        const role = result[0]["role"];
        await AsyncStorage.setItem("ROLE", role);
        await AsyncStorage.setItem("USER_ID", `${result[0]["id"]}`);

        if (role == "superadmin") {
          router.replace("/dashboard");
        } else {
          router.replace("/appointment/form");
        }
      } else {
        Alert.alert("Error", "Invalid credentials!");
      }
    } else {
      Alert.alert("Error", "Invalid credentials!");
    }
  };

  if (loading)
    return (
      <View style={[styles.container, globalStyles.justifyCenter]}>
        <ActivityIndicator />
      </View>
    );
  return (
    <View style={styles.container}>
      <Header />
      <View style={globalStyles.paddLg} />
      <Text style={{ ...globalStyles.text4Xl, ...globalStyles.textBold }}>
        Login
      </Text>
      <View style={globalStyles.paddMd} />
      <InputField
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      <InputField
        placeholder="Password"
        keyboardType="default"
        value={password}
        secureTextEntry={true}
      />

      <CustomButton onPress={() => handleLogin()} title="Login" />
      <View style={globalStyles.paddLg} />
      <Text style={globalStyles.textCenter}>Please select user</Text>
      <View style={globalStyles.paddSm} />
      <View
        style={[
          globalStyles.flex,
          globalStyles.row,
          globalStyles.justifyCenter,
        ]}
      >
        <CustomButton
          onPress={() => setEmail("admin@gmail.com")}
          title="Admin"
          disabled={email == "admin@gmail.com"}
          containerStyles={{ width: Dimensions.get("window").width / 2.3 }}
          color={colors.primary}
        />
        <View style={globalStyles.paddSm} />
        <CustomButton
          onPress={() => setEmail("user@gmail.com")}
          title="User"
          disabled={email == "user@gmail.com"}
          containerStyles={{ width: Dimensions.get("window").width / 2.3 }}
          color={colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default LoginScreen;
