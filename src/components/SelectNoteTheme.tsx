import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const { height, width } = Dimensions.get("window");

const datatypes: string[] = [
  "#FAEBD7",
  "#0000FF",
  "#88dded",
  "#3C873A",
  "#FF0000",
];

interface ThemeProp {
  selectedTheme: (state: string) => void;
}
const SelectNoteTheme: React.FC<ThemeProp> = ({ selectedTheme }) => {
  const { colors } = useTheme();
  const [themes, setTheme] = useState<string[]>(datatypes);

  const [selectTheme, setSelectTheme] = useState<string>("");

  const handleSelectTheme = (state: string) => {
    setSelectTheme(state);
    selectedTheme(state);
  };

  return (
    <View
      style={{
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Montserrat-Medium",
          color: colors.text,
        }}
      >
        Theme :{" "}
      </Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          // paddingHorizontal: 20,
        }}
      >
        {themes.map((item) => {
          return (
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                backgroundColor: item,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
              onPress={() => handleSelectTheme(item)}
            >
              {selectTheme === item ? (
                <AntDesign size={30} name="check" />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SelectNoteTheme;
