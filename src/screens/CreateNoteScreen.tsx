import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootStackParams } from "../stack/RootStackScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
} from "../model/NoteModel";
import { generateId } from "../utils/Utilities";
import { Text } from "react-native";

const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Create">;

const CreateNoteScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBack = (): void => {
    navigation.goBack();
  };
  const [visible, setVisible] = useState<boolean>(false);
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
  const handleSelectTheme = (state: string) => {
    setSelectTheme(state);
    setNewNote({
      ...newNote,
      theme: state,
    });
    // console.log({ state });
  };

  const selectedDate = (state: string) => {
    setNewNote({
      ...newNote,
      date: state,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    var notes = [];
    try {
      const checkStorage = await checkNotesCollection();
      if (checkStorage) {
        notes = JSON.parse(checkStorage);
        await notes.push(newNote);
        await saveNotesCollection(notes);
      } else {
        var createNote: NoteProps[] = [{ ...newNote }];
        await saveNotesCollection(createNote);
      }
      setVisible(true);
    } catch (error) {
    } finally {
      setLoading(false);
      setVisible(false);
      setTimeout(() => {
        navigation.push("Dashboard");
      }, 2000);
      // navigate with refresh
    }
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
      </View>
      {/* 
      <TouchableOpacity onPress={handleBack} style={{ paddingLeft: 15 }}>
        <AntDesign size={30} name="arrowleft" />
      </TouchableOpacity> */}
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
          paddingHorizontal: 20,
          // alignItems: "center",
        }}
      >
        <SelectNoteTheme selectedTheme={handleSelectTheme} />
        {/* Select Category */}
        <SelectItemPickerComponent
          label="Category"
          backgroundColor={selectTheme ? selectTheme : colors.border}
          onSelect={(selectedItem, index) => {
            setNewNote({
              ...newNote,
              category: selectedItem,
            });
            console.log(selectedItem, index);
          }}
        />
        {/* Select Category */}
        {/* Input */}

        <TextInputComponent
          label="Title"
          placeholder="Write Title"
          value={newNote.title}
          borderColor={selectTheme ? selectTheme : colors.border}
          onChangeText={(e) =>
            setNewNote({
              ...newNote,
              title: e,
            })
          }
        />
        <DateTimePickerComponent
          label="Activity Date"
          borderColor={selectTheme ? selectTheme : colors.border}
          selectedDate={selectedDate}
        />

        <TextAreaComponent
          borderColor={selectTheme ? selectTheme : colors.border}
          value={newNote.summary}
          onChangeText={(e) =>
            setNewNote({
              ...newNote,
              summary: e,
            })
          }
        />
      </ScrollView>
      <ButtonComponent
        title="Save"
        style={{ marginBottom: 20 }}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default CreateNoteScreen;
