import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  color?: string;
  containerStyles?: object;
  textStyles?: object;
  buttonStyles?: object;
  onPress: () => void;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  color,
  containerStyles = {},
  textStyles = {},
  buttonStyles = {},
  disabled = false,
  onPress,
}: ButtonProps) => {
  return (
    <View style={containerStyles}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          buttonStyles,
          color && !disabled
            ? { backgroundColor: color }
            : { backgroundColor: colors.primary },
          disabled && { backgroundColor: colors.secondary },
        ]}
        disabled={disabled}
      >
        <Text style={[styles.textStyles, textStyles]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  textStyles: {
    color: "white",
    textAlign: "center",
  },
});

export default CustomButton;
