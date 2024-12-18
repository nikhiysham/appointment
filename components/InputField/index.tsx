import globalStyles from "@/constants/styles";
import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import Text from "@/components/Text";

interface TextInputProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholderColor?: string;
  secureTextEntry?: boolean;
  customStyles?: object;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
}

const InputField: FC<TextInputProps> = ({
  placeholder,
  keyboardType = "default",
  placeholderColor,
  onChangeText,
  value,
  secureTextEntry,
  multiline,
  numberOfLines,
  customStyles,
  error,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.input, customStyles]}
        placeholderTextColor={placeholderColor}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline ?? false}
        numberOfLines={numberOfLines ?? 1}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        textAlignVertical="top"
      />
      {/* {error && <View style={globalStyles.paddSm} />} */}
      {error && (
        <Text style={{ ...globalStyles.textSm, ...{ color: "red" } }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    // margin: 12,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "grey",
  },
});

export default InputField;
