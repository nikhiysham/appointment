import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

interface TextInputProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholderColor?: string;
  secureTextEntry?: boolean;
}

const InputField: FC<TextInputProps> = ({
  placeholder,
  keyboardType = "default",
  placeholderColor,
  onChangeText,
  value,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={placeholderColor}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default InputField;
