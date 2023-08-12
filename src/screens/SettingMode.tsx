import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootStackParams } from "../stack/RootStackScreen";
import { RadioGroup } from "react-native-radio-buttons-group";
import { useSharedValue } from "react-native-reanimated";
import { AppContext } from "../context/AppContext";
import { NoteProps } from "../model/NoteModel";
import { generateId } from "../utils/Utilities";
const { height, width } = Dimensions.get("window");

interface ModeProps {
  id: string;
  label: string;
  value: string;
  status: boolean;
}
const radioButton: ModeProps[] = [
  {
    id: "1",
    label: "Dark Mode",
    value: "Dark Mode",
    status: true,
  },
  {
    id: "2",
    label: "Light Mode",
    value: "Light Mode",
    status: false,
  },
];

type Props = NativeStackScreenProps<RootStackParams, "Mode">;

const SettingMode: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const handleBack = (): void => {
    navigation.goBack();
  };
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

  const [selectedMode, setSelectedMode] = useState<string>("");

  const handleSelectMode = (mode: string): void => {
    console.log(mode);
    setSelectedMode(mode);
    var filtermode = [...radioButton].filter((item: any) => {
      return item.id === mode;
    });
    var status = filtermode[0].status;
    setIsDarkTheme(status);

    // setSelectedMode(filtermode[0].status);
    // setIsDarkTheme(!isDarkTheme)
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
          paddingTop: Platform.OS == "android" ? 10 : 70,
          paddingHorizontal: 15,
          paddingBottom: 20,
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
            Seting Tampilan
          </Text>
        </View>
        <TouchableOpacity>
          <AntDesign size={30} color={colors.text} name="questioncircle" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          backgroundColor: "#D8D8D8",
          paddingTop: 20,
          paddingLeft: 25,
        }}
      >
        <RadioGroup
          containerStyle={{
            alignItems: "flex-start",
            // backgroundColor: colors.text,
          }}
          // selected={radioButton.status === selectedMode}
          radioButtons={radioButton}
          onPress={handleSelectMode}
          selectedId={selectedMode}
        />
      </ScrollView>
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

export default SettingMode;
