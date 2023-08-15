import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  ViewToken,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootStackParams } from "../stack/RootStackScreen";

import { SelectNoteTheme, TextAreaComponent } from "../components";
import {
  ButtonComponent,
  DateTimePickerComponent,
  MessageComponent,
  SelectItemPickerComponent,
  TextInputComponent,
} from "../components/global";
import Container from "../components/global/Container";
import {
  NoteProps,
  checkNotesCollection,
  saveNotesCollection,
  viewNotesArchiveCollection,
  viewNotesCollection,
} from "../model/NoteModel";
import { generateId } from "../utils/Utilities";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";

const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Archive">;

const MyArchiveItem: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBack = (): void => {
    navigation.goBack();
  };
  const [dataNotes, setDataNotes] = useState([]);
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const [newNote, setNewNote] = useState<NoteProps>({
    id: generateId(),
    category: "Day Routine",
    title: "",
    summary: "",
    date: "",
    theme: "#FAEBD7",
    archive: false,
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setDataNotes([]);
    try {
      const checkStorage = await checkNotesCollection();
      if (checkStorage) {
        var notes = await viewNotesArchiveCollection();
        setDataNotes(notes);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const onViewableItemsChanged = useCallback(({ viewableItems: item }) => {
    viewableItems.value = item;
  }, []);

  const onPressDetail = (data: NoteProps): void => {
    navigation.push("Detail", {
      note: data,
    });
  };
  return (
    <View
      style={{
        flex: 1,
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
            Arsip Saya
          </Text>
        </View>
        {/* <TouchableOpacity>
          <AntDesign size={30} name="questioncircle" />
        </TouchableOpacity> */}
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : null}
      {dataNotes.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Arsip tersimpan belum ada</Text>
        </View>
      ) : null}
      <FlatList
        data={dataNotes}
        contentContainerStyle={{ paddingTop: 20 }}
        onViewableItemsChanged={onViewableItemsChanged}
        // keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              viewableItems={viewableItems}
              key={index}
              index={index}
              item={item}
              onPressDetail={onPressDetail}
            />
          );
        }}
      />
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

export default MyArchiveItem;
