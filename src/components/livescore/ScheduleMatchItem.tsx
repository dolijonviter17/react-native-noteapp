import React, { useContext, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { RootStackParams } from "../../stack/RootStackScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelectors";
import { LeaguesProps } from "../../state/actions";
import { useNavigation, useTheme } from "@react-navigation/native";
import HeaderLiveScore from "../../components/livescore/HeaderLiveScore";
import { AppContext, ThemeContextType } from "../../context/AppContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const scheduleMatch = [
  {
    timetable: "12 Aug",
    play_hours: "12 : 00",
    team_home: {
      name: "Barcelona",
      logo: "https://a.espncdn.com/i/teamlogos/soccer/500/5.png",
    },
    team_away: {
      name: "Real Madrid",
      logo: "https://a.espncdn.com/i/teamlogos/soccer/500/5.png",
    },
  },
  {
    timetable: "12 Aug",
    play_hours: "12 : 00",
    team_home: {
      name: "Arsenal",
      logo: "https://a.espncdn.com/i/teamlogos/soccer/500/5.png",
    },
    team_away: {
      name: "Manchester City",
      logo: "https://a.espncdn.com/i/teamlogos/soccer/500/5.png",
    },
  },
];

const ScheduleMatchItem = () => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: colors.border,
        borderBottomWidth: 0.5,
        marginBottom: 10,
        backgroundColor: colors.incomeBackground,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <View style={{ width: 70 }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: "Montserrat-ExtraBold",
              }}
            >
              {"12 Aug"}
            </Text>
          </View>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
            source={{
              uri: "https://a.espncdn.com/i/teamlogos/soccer/500/5.png",
            }}
          />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-ExtraBold",
            }}
          >
            {"Barcelone"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: 70 }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: "Montserrat-ExtraBold",
                //   paddingRight: 5,
              }}
            >
              {"12 : 00"}
            </Text>
          </View>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
            source={{
              uri: "https://a.espncdn.com/i/teamlogos/soccer/500/19.png",
            }}
          />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-ExtraBold",
            }}
          >
            {"Real Madrid"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome name="star-o" size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleMatchItem;
