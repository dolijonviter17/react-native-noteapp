import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { RootStackParams } from "../../stack/RootStackScreen";
import { useTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  ButtonComponent,
  MessageComponent,
  TextInputComponent,
} from "../../components/global";
import { NoteProps } from "../../model/NoteModel";
type Props = NativeStackScreenProps<RootStackParams, "EditProfiles">;

interface ProfileProps {
  name: string;
  profession: string;
  place: string;
}

const EditProfileScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileProps>({
    name: "",
    profession: "",
    place: "",
  });
  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = (): void => {
    console.log("profile");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: Platform.OS == "android" ? 10 : 70,
          paddingHorizontal: 15,
          paddingBottom: 10,
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
            Edit Profile
          </Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : null}
      <MessageComponent
        status="success"
        visible={visible}
        message="Data has been created"
      />
      <ScrollView
        style={{
          // paddingTop: 15,
          paddingHorizontal: 10,
          // alignItems: "center",
        }}
      >
        <TextInputComponent
          label="Name"
          placeholder="Write Name"
          value={profile.name}
          borderColor={colors.border}
          onChangeText={(e) =>
            setProfile({
              ...profile,
              name: e,
            })
          }
        />
        <TextInputComponent
          label="Profession"
          placeholder="Write Profession"
          value={profile.profession}
          borderColor={colors.border}
          onChangeText={(e) =>
            setProfile({
              ...profile,
              profession: e,
            })
          }
        />
        <TextInputComponent
          label="Place"
          placeholder="Write Place"
          value={profile.place}
          borderColor={colors.border}
          onChangeText={(e) =>
            setProfile({
              ...profile,
              place: "",
            })
          }
        />

        <ButtonComponent
          title="Save"
          style={{ marginBottom: 20 }}
          onPress={handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
