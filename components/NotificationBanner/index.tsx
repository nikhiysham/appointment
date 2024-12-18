import { Notifications } from "@/app/dashboard";
import { colors } from "@/constants/colors";
import globalStyles from "@/constants/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type NotificationProps = {
  notifications: Notifications[];
};

const NotificationBanner = ({ notifications }: NotificationProps) => {
  return (
    <View style={[styles.container]}>
      <Text
        style={[globalStyles.textMd, globalStyles.textBold, styles.textStyles]}
      >
        You have {notifications.length} notifications
      </Text>
      <View style={globalStyles.paddSm} />
      {notifications &&
        notifications.map((n, idx) => (
          <Text key={idx} style={[globalStyles.textMd, styles.textStyles]}>
            {n.message}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  textStyles: {
    color: "black",
  },
});

export default NotificationBanner;
