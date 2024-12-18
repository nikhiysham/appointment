import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import Text from "@/components/Text";
import globalStyles from "../constants/styles";
import Logout from "@/components/Logout";
import { colors } from "@/constants/colors";
import CustomButton from "@/components/CustomButton";
import { useSQLiteContext } from "expo-sqlite";

export type Appointment = {
  id: number;
  date?: string;
  time: string;
  created_at: string;
  name?: string;
  email: string;
  phone: string;
  userId: number;
};

const Dashboard = () => {
  const db = useSQLiteContext();

  // Variables
  const [appointments, setAppointments] = useState<Appointment[]>();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const results: any = await db.getAllAsync(
      "SELECT a.id, a.date, a.time, b.id as userId, b.name, b.email,b.phone, a.created_at  FROM appointment as a INNER JOIN users as b on a.user_id = b.id"
    );
    // console.log("#APOINTMENT RESULT: ", results);
    setAppointments(results);
  };

  const deleteAppointment = async (app: Appointment) => {
    try {
      await db.runAsync("DELETE FROM appointment WHERE id = $value", {
        $value: app.id,
      });
      const insert = await db.runAsync(
        "INSERT INTO notification (message, status, user_id, created_at) VALUES (?,?,?,?)",
        `Your appointment ID[${app.id}] has been deleted`,
        "DELETE",
        app.userId,
        new Date().toISOString()
      );
      fetchAppointments();
      Alert.alert("Delete success", "Appointment has been deleted");
    } catch (e) {
      Alert.alert("Error", e?.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Logout />
      <Text style={{ ...globalStyles.text4Xl, ...globalStyles.textBold }}>
        Dashboard
      </Text>
      <View style={globalStyles.paddMd} />
      {appointments &&
        appointments.length > 0 &&
        appointments.map((app, idx) => {
          return (
            <View style={styles.card} key={`${idx}`}>
              <View style={[globalStyles.row, globalStyles.justifyBetween]}>
                <View style={{ width: Dimensions.get("window").width / 3 }}>
                  <Text style={globalStyles.textBold}>{app.name}</Text>
                  <Text style={globalStyles.textNormal}>{app.email}</Text>
                  <View style={globalStyles.paddSm} />
                  <View>
                    <Text style={globalStyles.textSm}>Phone:</Text>
                    <Text style={{ color: "blue" }}>{app.phone}</Text>
                  </View>
                </View>
                {/* <View style={globalStyles.paddSm} /> */}
                <View>
                  <Text style={globalStyles.textSm}>Appointment Date:</Text>
                  <View style={globalStyles.paddXs} />
                  <View style={{ backgroundColor: "red", borderRadius: 2 }}>
                    <Text
                      style={{
                        ...globalStyles.textNormal,
                        ...{ color: "white", padding: 5 },
                      }}
                    >
                      {app.date}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={globalStyles.paddSm} />
              <View style={[globalStyles.row, globalStyles.justifyEnd]}>
                <CustomButton
                  onPress={() => {}}
                  title="Edit"
                  buttonStyles={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  color={colors.primary}
                />
                <CustomButton
                  onPress={() => deleteAppointment(app)}
                  title="Delete"
                  buttonStyles={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  color={colors.warning}
                />
              </View>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default Dashboard;