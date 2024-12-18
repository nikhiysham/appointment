import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Calendar } from "react-native-calendars";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import Text from "@/components/Text";
import globalStyles from "../../constants/styles";
import { colors } from "@/constants/colors";
import UpcomingAppointment from "@/components/UpcomingAppointment";
import NotificationBanner from "@/components/NotificationBanner";
import { useSQLiteContext } from "expo-sqlite";
import Logout from "@/components/Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../dashboard";

const AppointmentForm = () => {
  // Hooks
  const db = useSQLiteContext();

  // State
  const [patientName, setPatientName] = useState<string>();
  const [patientPhone, setPatientPhone] = useState<string>();
  const [bookingReason, setBookingReason] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [notifications, setNotifications] = useState<[]>();
  const [times, setTimes] = useState<string[]>();
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [meridian, setMeridian] = useState<string>("AM");
  const [appointments, setAppointments] = useState<Appointment[]>();

  // Variables
  const curDate = new Date();
  const curTime = new Date().toLocaleTimeString([], {
    timeStyle: "short",
  });
  const getDate = new Date(
    curDate.getFullYear(),
    curDate.getMonth(),
    curDate.getDate()
  );
  const isoDate = new Date(
    getDate.getTime() - getDate.getTimezoneOffset() * 60000
  );
  const hour = curTime.toString().split(":")[0];
  const mdian = curTime.toString().split(" ")[1];

  useEffect(() => {
    init();
    fetchNotification();
    fetchAppointments();
  }, []);

  useEffect(() => {
    generateTime();
  }, [date]);

  const fetchNotification = async () => {
    const userId = await AsyncStorage.getItem("USER_ID");

    try {
      const results: any = await db.getAllAsync(
        "SELECT * FROM notification WHERE user_id=?",
        userId
      );

      console.log("#NOTI RESULT: ", results);
      setNotifications(results);
    } catch (e) {
      Alert.alert("Error", e?.toString());
    }
  };

  const fetchAppointments = async () => {
    const results: any = await db.getAllAsync(
      "SELECT a.id, a.date, a.time, b.id as userId, b.name, b.email,b.phone, a.created_at  FROM appointment as a INNER JOIN users as b on a.user_id = b.id"
    );
    console.log("#APOINTMENT RESULT: ", results);
    setAppointments(results);
  };

  const init = () => {
    // set default calendar to todays date
    setSelectedDate(
      `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()}`
    );
    const getTime =
      curTime.split(" ")[0] + " " + curTime.split(" ")[1].toUpperCase();
    console.log("#GET TIME: ", getTime);
    setDate(isoDate);
    setTime(getTime);
  };

  const generateTime = () => {
    setMeridian(mdian.toUpperCase());

    const genTimes = Array(12)
      .fill(12)
      .map((_, i) => {
        const idx: number = i + 1;
        if (isoDate.getTime() == date?.getTime()) {
          if (idx > parseInt(hour)) {
            if (idx < 10) {
              return `${i + 3}:00`;
            } else {
              return `${i + 1}:00`;
            }
          } else {
            return "-";
          }
        } else {
          if (idx < 10) {
            return `0${i + 1}:00`;
          } else {
            return `${i + 1}:00`;
          }
        }
      });

    setTimes(genTimes.filter((item) => item != "-"));
  };

  const validateForm = () => {
    let errors: any = {};

    if (!patientName) {
      errors.name = "Name is required.";
    }

    if (!patientPhone) {
      errors.phone = "Phone is required.";
    }

    if (!date) {
      errors.date = "Date is required.";
    }

    if (!time) {
      errors.time = "Time is required.";
    }
    if (!bookingReason) {
      errors.reason = "Booking reason is required.";
    }

    console.log(
      "FORM: ",
      patientName,
      patientPhone,
      date,
      time,
      bookingReason,
      Object.keys(errors).length
    );

    // Set the errors and update form validity
    if (Object.keys(errors).length === 0) {
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    const isFormValid = validateForm();
    console.log("#FORM VALID: ", isFormValid);
    if (isFormValid) {
      const userId = await AsyncStorage.getItem("USER_ID");

      try {
        const resp1 = await db.runAsync(
          "INSERT INTO appointment (reason, date, time, status, user_id, created_at) VALUES (?,?,?,?,?,?)",
          bookingReason ?? null,
          date ? date.toISOString() : null,
          time ?? null,
          "ACTIVE",
          userId,
          new Date().toISOString()
        );
        const resp2 = await db.runAsync(
          "INSERT INTO notification (message, status, user_id, created_at) VALUES (?,?,?,?)",
          `Upcoming appointment is on ${date?.getDay()}-${
            date!.getMonth() + 1
          }-${date!.getFullYear()}  )}`,
          "ACTIVE",
          userId,
          new Date().toISOString()
        );
        console.log(resp1, resp2);
      } catch (e) {
        if (e) {
          Alert.alert("ERROR", e.toString());
        }
      }

      router.navigate("/appointment/rating");
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.paddLg}>
      <Logout />
      <View style={globalStyles.paddMd} />
      {notifications && notifications.length > 0 && (
        <NotificationBanner notifications={notifications} />
      )}
      {notifications && notifications.length > 0 && (
        <View style={globalStyles.paddMd} />
      )}
      {appointments && appointments.length > 0 && (
        <UpcomingAppointment date="20-02-2020" appointments={appointments} />
      )}
      <View style={globalStyles.paddMd} />
      <View
        style={[
          globalStyles.flex,
          globalStyles.row,
          globalStyles.justifyBetween,
        ]}
      >
        <Text
          style={{
            ...globalStyles.text4Xl,
            ...globalStyles.textBold,
            // ...globalStyles.paddXMd,
          }}
        >
          Appointment Form
        </Text>
      </View>
      <View style={globalStyles.paddSm} />
      <InputField
        placeholder="Patient Name"
        onChangeText={(val) => setPatientName(val)}
        error={
          patientName == "" || patientName == null
            ? " * Please enter patient name"
            : ""
        }
      />
      <View style={globalStyles.paddMd} />
      <InputField
        placeholder="Phone"
        keyboardType="phone-pad"
        onChangeText={(val) => setPatientPhone(val)}
        error={
          patientPhone == "" || patientPhone == null
            ? " * Please enter patient phone"
            : ""
        }
      />
      <View style={[globalStyles.col, globalStyles.paddMd]}>
        <Text>Appointment Date</Text>
        <View style={globalStyles.paddSm} />
        <Calendar
          onDayPress={(day: any) => {
            const selIsoDate = new Date(day.year, day.month - 1, day.day);
            setSelectedDate(day.dateString);
            var selIsoDateTime = new Date(
              selIsoDate.getTime() - selIsoDate.getTimezoneOffset() * 60000
            );
            console.log("SELECTED DATE:", day, selIsoDateTime);
            setDate(selIsoDateTime);
          }}
          markedDates={{
            [selectedDate as string]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
        <View style={globalStyles.paddSm} />
        {selectedDate == "" ||
          (selectedDate == null && (
            <Text style={{ ...globalStyles.textSm, ...{ color: "red" } }}>
              * Please enter appointment date
            </Text>
          ))}
      </View>
      <View style={[globalStyles.col, globalStyles.paddMd]}>
        <Text>Appointment Time</Text>
        <View style={globalStyles.paddSm} />
        <View style={[globalStyles.flex, globalStyles.row]}>
          <Picker
            placeholder="Select Appointment Time"
            style={styles.dropdown}
            onValueChange={(itemValue, itemIndex) => {
              console.log("TIME: ", itemValue);
              setTime(itemValue + " " + meridian);
            }}
          >
            {times &&
              times.length > 0 &&
              times.map((t: string) => (
                <Picker.Item key={t} label={t} value={t} />
              ))}
          </Picker>
          <View
            style={[
              globalStyles.row,
              globalStyles.alignCenter,
              { marginLeft: 10 },
            ]}
          >
            <CustomButton
              onPress={() => setMeridian("AM")}
              title="AM"
              buttonStyles={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              color={meridian == "AM" ? colors.primary : colors.secondary}
            />
            <CustomButton
              onPress={() => setMeridian("PM")}
              title="PM"
              buttonStyles={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              color={meridian == "PM" ? colors.primary : colors.secondary}
            />
          </View>
        </View>
        <View style={globalStyles.paddSm} />
        {selectedDate == "" ||
          (selectedDate == null && (
            <Text style={{ ...globalStyles.textSm, ...{ color: "red" } }}>
              * Please enter appointment time
            </Text>
          ))}
      </View>
      <View style={globalStyles.paddSm} />
      <InputField
        placeholder="Reason for booking"
        multiline={true}
        numberOfLines={3}
        customStyles={{ height: 100 }}
        onChangeText={(val) => setBookingReason(val)}
      />
      {/* <View style={globalStyles.paddSm} /> */}
      {bookingReason == "" ||
        (bookingReason == null && (
          <Text style={{ ...globalStyles.textSm, ...{ color: "red" } }}>
            * Please enter booking reason
          </Text>
        ))}
      <View style={globalStyles.paddLg} />
      <CustomButton onPress={handleSubmit} title="Submit" />
    </ScrollView>
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
export default AppointmentForm;
