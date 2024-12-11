import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import Text from "@/components/Text";
import globalStyles from "../styles";

const AppointmentForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleLogin = () => {};

  return (
    <View style={styles.container}>
      <Text style={{ ...globalStyles.text4Xl, ...globalStyles.textBold }}>
        Appointment Form
      </Text>
      <InputField
        placeholder="Patient Name"
        onChangeText={(val) => setEmail(val)}
      />
      <InputField
        placeholder="Phone"
        keyboardType="phone-pad"
        onChangeText={(val) => setPhone(val)}
      />
      <View style={globalStyles.paddSm} />
      <View style={[globalStyles.col, globalStyles.alignCenter]}>
        <Text>Appointment Date</Text>
        <View style={globalStyles.paddSm} />
        <Calendar
          onDayPress={(day: any) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate as string]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      </View>
      <View style={globalStyles.paddSm} />
      <CustomButton onPress={handleLogin} title="Submit" />
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
