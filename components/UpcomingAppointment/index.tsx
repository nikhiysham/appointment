import { Appointment } from "@/app/dashboard";
import { colors } from "@/constants/colors";
import globalStyles from "@/constants/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type UpcomingAppointmentProps = {
  color?: string;
  containerStyles?: object;
  textStyles?: object;
  date: string;
  appointments: Appointment[];
};

const UpcomingAppointment = ({
  appointments,
  containerStyles = {},
  date,
}: UpcomingAppointmentProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text
        style={[globalStyles.textMd, globalStyles.textBold, { color: "white" }]}
      >
        You have {appointments.length} Upcoming Appointment
      </Text>
      <View style={globalStyles.paddSm} />
      {appointments &&
        appointments.map((a, idx) => (
          <View style={globalStyles.row} key={idx}>
            <View>
              <Text style={[globalStyles.textMd, { color: "white" }]}>
                Date:{" "}
              </Text>
            </View>
            <View>
              <Text style={[globalStyles.textMd, { color: "white" }]}>
                {a.created_at}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.warning,
  },
  textStyles: {
    color: "white",
    textAlign: "center",
  },
});

export default UpcomingAppointment;
