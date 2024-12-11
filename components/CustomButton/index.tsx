import React from "react";
import { StyleSheet, Button, View } from "react-native";

type ButtonProps = {
  title: string;
  color?: string;
  onPress: () => void;
};

const CustomButton = ({ title, color, onPress }: ButtonProps) => {
  return (
    <View style={styles.button}>
      <Button onPress={onPress} title={title} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default CustomButton;
