import React, { useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { RootStackParams } from "../../stack/RootStackScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelectors";
import { LeaguesProps } from "../../state/actions";
import HeaderLiveScore from "./HeaderLiveScore";
import { useTheme } from "@react-navigation/native";

interface LigaProps {
  league: LeaguesProps;
  onPressDetail: (league: LeaguesProps) => void;
}

const LeagueTeamList: React.FC<LigaProps> = ({ league, onPressDetail }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPressDetail(league)}
      style={{
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: colors.border,
        borderBottomWidth: 0.5,
        marginBottom: 25,
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            marginRight: 20,
          }}
          source={{
            uri: league.logos.light,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-ExtraBold",
              paddingBottom: 3,
            }}
          >
            {league.abbr}
          </Text>
          {/* #3C873A */}
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            {league.name}
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        color={colors.chevron}
        size={40}
      />
    </TouchableOpacity>
  );
};

export default LeagueTeamList;
