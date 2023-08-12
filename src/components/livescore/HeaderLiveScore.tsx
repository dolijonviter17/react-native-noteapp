import React, { useContext } from "react";

import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import Entypo from "react-native-vector-icons/Entypo";

const HeaderLiveScore = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
      }}
    >
      <Text
        style={{
          marginRight: 10,
          fontSize: 25,
          color: colors.text,
          marginLeft: 5,
          fontFamily: "Montserrat-Bold",
        }}
      >
        FootballScore
      </Text>
      <MaterialCommunityIcons
        name="scoreboard"
        color={colors.expense}
        size={40}
      />
      <TouchableOpacity
        onPress={() => setIsDarkTheme(!isDarkTheme)}
        style={{
          position: "absolute",
          right: 15,
          top: 10,
        }}
      >
        <Entypo
          name={isDarkTheme ? "light-up" : "light-down"}
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderLiveScore;
