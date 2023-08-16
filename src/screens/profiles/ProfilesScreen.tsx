import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParams } from "../../stack/RootStackScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "@react-navigation/native";
import Profiles from "../../assets/images/profiles.jpg";
type Props = NativeStackScreenProps<RootStackParams, "Profiles">;

const h = Dimensions.get("window").height;

const w = Dimensions.get("window").width;

interface BiodataProps {
  label?: string;
  content?: string;
  sosmed?: {
    icon: string;
    name: string;
  }[];
}

const MySosmed: BiodataProps["sosmed"] = [
  {
    icon: "instagram",
    name: "@jonviterr",
  },
  {
    icon: "github",
    name: "@dolijonviter17",
  },
  {
    icon: "twitter",
    name: "@Jonviterr",
  },
  {
    icon: "linkedin-square",
    name: "@dolijonviter17",
  },
];

const MyProfile = () => {
  return (
    <TouchableOpacity>
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
        }}
        source={Profiles}
      />
      <Text
        style={{
          fontSize: 16,
          marginTop: 10,
          color: "#f26a50",
          fontFamily: "Montserrat-Medium",
        }}
      >
        Jonviter
      </Text>
    </TouchableOpacity>
  );
};

const BiodataComponent: React.FC<BiodataProps> = ({ label, content }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        borderBottomColor: colors.text,
        borderBottomWidth: 1.5,
        paddingBottom: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Montserrat-Medium",
          color: colors.text,
        }}
      >
        {label} :
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Montserrat-Bold",
          color: colors.text,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

const SosmedComponent = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: "80%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      {MySosmed.map((item) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <AntDesign name={item.icon} color={colors.text} size={35} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 13,
                fontFamily: "Montserrat-Bold",
                textDecorationLine: "underline",
                color: colors.text,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ProfilesScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const handleEditProfile = () => {
    navigation.navigate("EditProfiles");
  };

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <ImageBackground
        style={{
          height: 0.4 * h,
          overflow: "hidden",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
        source={require("../../assets/images/bgprofile.jpg")}
      >
        <View
          style={{
            marginTop: 60,
            paddingRight: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <AntDesign size={25} color={"#fff"} name="arrowleft" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditProfile}>
            <AntDesign name="edit" color={"#fff"} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 30,
            left: w / 2.5,
          }}
        >
          <MyProfile />
        </View>
      </ImageBackground>

      <View
        style={{
          paddingTop: 15,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            marginVertical: 20,
            fontFamily: "Montserrat-Bold",
          }}
        >
          My Profile
        </Text>
        <BiodataComponent label="Name" content="Jonviter Simbolon" />
        <BiodataComponent label="Profession" content="Mobile Developer" />
        <BiodataComponent label="Place" content="Bandung City" />
        <SosmedComponent />
      </View>

      {/* <TouchableOpacity>
        <LinearGradient
          style={{
            height: 50,
            width: "80%",
            alignSelf: "center",
            borderRadius: 30,
            marginTop: 10,
          }}
          colors={["#f26a50", "#f20042", "#f20045"]}
        >
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              color: colors.text,
              textAlign: "center",
              fontFamily: "Montserrat-Bold",
            }}
          >
            Logout
          </Text>
        </LinearGradient>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default ProfilesScreen;
