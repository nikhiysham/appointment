import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import globalStyles from "../../constants/styles";
import { router } from "expo-router";
import { Rating } from "@kolking/react-native-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSQLiteContext } from "expo-sqlite";

const RatingForm = () => {
  // Hooks
  const db = useSQLiteContext();

  // Variables
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem("USER_ID");
    try {
      const resp1 = await db.runAsync(
        "INSERT INTO rating (value, user_id, created_at) VALUES (?,?,?)",
        rating,
        userId,
        new Date().toISOString()
      );
      console.log("Insert rating response: ", resp1);
      Alert.alert(
        "SUCCESS",
        "Your feedback has been successfully submitted.Thank you!"
      );
    } catch (e) {
      if (e) {
        Alert.alert("ERROR", e.toString());
      }
    }
    router.replace("/splash");
  };

  const handleChange = useCallback(
    (value: number) => setRating(Math.round((rating + value) * 5) / 10),
    [rating]
  );

  return (
    <View
      style={[
        globalStyles.paddLg,
        globalStyles.alignCenter,
        globalStyles.justifyCenter,
      ]}
    >
      <Text style={globalStyles.text4Xl}>Thank You</Text>
      <View style={globalStyles.paddSm} />
      <Text style={globalStyles.textMd}>
        Your appointment has been scheduled and system will notify an
        administrator.
      </Text>
      <View style={globalStyles.padd2Xl} />
      <Text style={globalStyles.textMd}>How do you like our system?</Text>
      <View style={globalStyles.paddMd} />
      <View style={[globalStyles.row]}>
        <Rating size={40} rating={rating} onChange={handleChange} />
      </View>
      <View style={globalStyles.padd3Xl} />
      <CustomButton onPress={handleSubmit} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
    // marginHorizontal: 10,
  },
});
export default RatingForm;
