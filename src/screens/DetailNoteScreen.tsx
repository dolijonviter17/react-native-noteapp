import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RootStackParams } from "../stack/RootStackScreen";

import {
  NoteProps,
  saveNotesCollection,
  viewNotesCollection,
} from "../model/NoteModel";
import { ButtonComponent, MessageComponent } from "../components/global";

const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Detail">;

const DetailNoteScreen: React.FC<Props> = ({ navigation, route }) => {
  const { note } = route.params;
  console.log("note", note);
  const [detailNote, setDetailNote] = useState({ ...note });
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState("Data has been update");
  const { colors } = useTheme();
  const handleBack = (): void => {
    navigation.goBack();
  };

  const handleSubmit = async (id: number) => {
    var notes = await viewNotesCollection();
    var selectNote = notes.filter((data: NoteProps) => {
      return data.id === id;
    });
    selectNote[0].summary = detailNote.summary;
    //CONCAT ==> This method combines two arrays together or add more items to an array and then return a new array.
    await notes.concat(selectNote[0]);
    await saveNotesCollection(notes);
    setVisible(true);
    setTimeout(() => {
      navigation.push("Dashboard");
    }, 2000);
  };
  const handleDelete = async (id: number) => {
    setMessage("Data has been deleted");
    var notes = await viewNotesCollection();
    var selectNote = notes.filter((data: NoteProps) => {
      return data.id !== id;
    });
    await saveNotesCollection(selectNote);
    setVisible(true);
    setTimeout(() => {
      navigation.push("Dashboard");
    }, 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: Platform.OS ? 70 : 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign size={30} color={colors.text} name="arrowleft" />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Detail
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(detailNote.id)}>
          <FontAwesome size={30} color={colors.text} name="trash" />
        </TouchableOpacity>
      </View>

      <MessageComponent status="success" visible={visible} message={message} />
      <ScrollView
        style={{
          // backgroundColor: "#D8D8D8",
          paddingTop: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat-Medium",
              color: colors.text,
            }}
          >
            {detailNote.date}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat-Medium",
              color: colors.text,
            }}
          >
            {detailNote.category}
          </Text>
        </View>
        <View
          style={{
            paddingTop: 25,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Montserrat-Medium",
              color: colors.text,
              //   textAlign: "center",
              marginLeft: 15,
              marginBottom: 15,
            }}
          >
            {detailNote.title}
          </Text>

          <View
            style={{
              alignSelf: "center",
              height: height,
              width: "98%",
              borderRadius: 7,
              paddingHorizontal: 10,
              flexDirection: "row",
              // alignItems: "center",
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
          >
            <TextInput
              editable
              multiline
              numberOfLines={100}
              maxLength={1000}
              placeholder="write a summary"
              value={detailNote.summary}
              onChangeText={(e) =>
                setDetailNote({
                  ...detailNote,
                  summary: e,
                })
              }
              style={{
                flex: 1,
                padding: 10,
                fontSize: 18,
                fontFamily: "Montserrat-Medium",
                color: colors.text,
              }}
            />
          </View>
        </View>
        <ButtonComponent
          title="Save"
          style={{ marginBottom: 20 }}
          onPress={() => handleSubmit(detailNote.id)}
        />
      </ScrollView>
    </View>
  );
};

export default DetailNoteScreen;
