import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import Text from "@/components/Text";
import globalStyles from "../../constants/styles";

const AppointmentForm = () => {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const handleLogin = () => {};

  return (
    <View style={styles.container}>
      <Text style={{ ...globalStyles.text4Xl, ...globalStyles.textBold }}>
        Login
      </Text>
      <InputField
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      <InputField placeholder="Password" keyboardType="default" />

      <CustomButton onPress={handleLogin} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default AppointmentForm;
