import React from "react";

import { useTheme } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TeamProps } from "../../state/actions";
interface LeagueProps {
  club: TeamProps;
  onPressDetail: (club: TeamProps) => void;
}
const StandingTeam: React.FC<LeagueProps> = ({ club, onPressDetail }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onPressDetail(club)}
      style={{
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "grey",
        borderBottomWidth: 0.2,
        marginBottom: 25,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
          }}
          source={{
            uri: club.logo,
          }}
        />
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            color: colors.text,
            fontFamily: "Montserrat-ExtraBold",
          }}
        >
          {club.name}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        color={colors.chevron}
        size={40}
      />
    </TouchableOpacity>
  );
};

export default StandingTeam;
