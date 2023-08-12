import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RootStackParams } from "../stack/RootStackScreen";
const { height, width } = Dimensions.get("window");

import { useTheme } from "@react-navigation/native";
import {
  NoteProps,
  checkNotesCollection,
  saveNotesCollection,
  viewNotesCollection,
} from "../model/NoteModel";

type Props = NativeStackScreenProps<RootStackParams, "Dashboard">;

interface NoteItemProps {
  note: NoteProps;
  index: number;
  onPressDetail: (note: NoteProps) => void;
}

const NotesItem: React.FC<NoteItemProps> = ({ index, note, onPressDetail }) => {
  const { colors } = useTheme();
  const [tagStatus, setTagStatus] = useState<boolean>(note.archive);
  useEffect(() => {
    setTagStatus(note.archive);
  }, []);

  const handleTag = async (tag: boolean) => {
    await setTagStatus(tag);
    var notes = await viewNotesCollection();
    notes[index].archive = tag;
    await saveNotesCollection(notes);
  };
  return (
    <TouchableOpacity
      onPress={() => onPressDetail(note)}
      key={note.id}
      style={{
        width: "90%",
        minHeight: 100,
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 10,
        backgroundColor: note.theme,
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Montserrat-Medium",
            color: colors.text,
          }}
        >
          {note.title}
        </Text>
        <TouchableOpacity onPress={() => handleTag(!tagStatus)}>
          <AntDesign name={tagStatus ? "tag" : "tago"} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Montserrat-Medium",
          }}
        >
          {note.summary}
        </Text>
      </View>

      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          height: 40,
          alignItems: "center",
          borderTopColor: colors.border,
          borderTopWidth: 1.5,
        }}
      >
        <Text>{note.date}</Text>
        <Text>{"#" + note.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotesItem;
