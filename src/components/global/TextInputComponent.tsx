import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface TextInputProps {
  value: string | undefined;
  placeholder?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  label: string | undefined;
  borderColor?: string;
}
const TextInputComponent: React.FC<TextInputProps> = ({
  value,
  placeholder,
  onChangeText,
  label,
  borderColor = "#D8D8D8",
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Montserrat-Medium",
          color: colors.text,
          marginBottom: 7,
        }}
      >
        {label} :{" "}
      </Text>
      <View
        style={{
          height: 60,
          borderRadius: 5,
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={{ flex: 1, color: colors.text }}
          placeholderTextColor={colors.text}
        />
        {!value ? (
          <FontAwesome size={15} name="pencil" color={colors.text} />
        ) : null}
      </View>
    </View>
  );
};

export default TextInputComponent;
