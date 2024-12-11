import React from "react";
import { StyleSheet, Text as RNText } from "react-native";

type TextProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style?: object;
};

const Text = ({ onPress, style = {}, children }: TextProps) => {
  return (
    <RNText style={{ ...styles.text, ...style }} onPress={onPress}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
  },
});

export default Text;
