import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootStackParams } from "../stack/RootStackScreen";

import { NoteProps } from "../model/NoteModel";
import { generateId } from "../utils/Utilities";

const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Profile">;

const MyProfilesScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBack = (): void => {
    navigation.goBack();
  };
  const [selectTheme, setSelectTheme] = useState<string>("");
  const [newNote, setNewNote] = useState<NoteProps>({
    id: generateId(),
    category: "Day Routine",
    title: "",
    summary: "",
    date: "",
    theme: "#FAEBD7",
    archive: false,
  });

  const onSubmit = () => {
    setLoading(!loading);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: Platform.OS == "android" ? 20 : 70,
          paddingHorizontal: 15,
          paddingBottom: 20,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <AntDesign size={30} color={colors.text} name="arrowleft" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Pengaturan Akun
          </Text>
        </View>
        <TouchableOpacity>
          <AntDesign size={30} color={colors.text} name="questioncircle" />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={handleBack} style={{ paddingLeft: 15 }}>
        <AntDesign size={30} name="arrowleft" />
      </TouchableOpacity>
      <MessageComponent
        status="error"
        visible={loading}
        message="Data has been created"
      /> */}

      <ScrollView
        style={{
          backgroundColor: "#D8D8D8",
          paddingTop: 5,
        }}
      >
        {/* Profiles */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
            backgroundColor: colors.background,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Profile
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Profiles")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Profile Saya
            </Text>
            <AntDesign size={30} color={colors.text} name="arrowright" />
          </TouchableOpacity>
        </View>
        {/* Profiles */}

        {/* Archive */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.background,
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Catatan
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Archive")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Arsip
            </Text>
            <AntDesign size={30} color={colors.text} name="arrowright" />
          </TouchableOpacity>
        </View>
        {/* Archive */}
        {/* Mode */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.background,
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Tampilan
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Mode")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Mode
            </Text>
            <AntDesign size={30} color={colors.text} name="arrowright" />
          </TouchableOpacity>
        </View>
        {/* Mode */}
      </ScrollView>

      {/* <ButtonComponent
        title="Save"
        style={{ marginBottom: 20 }}
        onPress={onSubmit}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    height: 45,
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 1,
  },
});

export default MyProfilesScreen;
