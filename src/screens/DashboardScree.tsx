import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RootStackParams } from "../stack/RootStackScreen";
const { height, width } = Dimensions.get("window");

import { useTheme } from "@react-navigation/native";
import { NotesItemComponent } from "../components";
import {
  NoteProps,
  checkNotesCollection,
  viewNotesCollection,
} from "../model/NoteModel";
import Container from "../components/global/Container";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import ListItem from "../components/ListItem";
import { useSharedValue } from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParams, "Dashboard">;

const dummy = new Array(50).fill(0).map((_, index) => ({ id: index }));
const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [dataNotes, setDataNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const scrollableItems = useSharedValue<ViewToken[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const requestWithSocket = () => {
    console.log("norif");

    // PushNotification.createChannel(
    //   {
    //     channelId: "test 2", // (required)
    //     channelName: "My channel", // (required)
    //     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //     playSound: false, // (optional) default: true
    //     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    //     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    //   },
    //   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    // );
    // 4. Send a push notification
    PushNotification.localNotification({
      channelId: "test",
      title: "Inovadok",
      message: "hello brader",
    });
  };

  const fetchNotes = async () => {
    setLoading(true);
    setDataNotes([]);
    try {
      const checkStorage = await checkNotesCollection();
      if (checkStorage) {
        var notes = await viewNotesCollection();
        setDataNotes(notes);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleCreate = (): void => {
    navigation.navigate("Create");
  };

  const onPressDetail = (data: NoteProps): void => {
    navigation.push("Detail", {
      note: data,
    });
  };

  const onViewableItemsChanged = useCallback(({ viewableItems: item }) => {
    viewableItems.value = item;
  }, []);

  return (
    <Container onPress={() => navigation.navigate("Profile")}>
      <View
        style={{
          height: 3,
          width: width - 15,
          backgroundColor: colors.border,
          alignSelf: "center",
          marginVertical: 20,
        }}
      />
      <TouchableOpacity
        onPress={handleCreate}
        style={{
          position: "absolute",
          right: width / 2.5,
          bottom: height / 20,
          zIndex: 1,
          // borderWidth: 1.5,
          // borderColor: colors.text,
          borderRadius: 100,
          shadowOffset: {
            width: -2,
            height: 4,
          },
          shadowColor: colors.shadow,
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
          }}
        >
          <FontAwesome size={30} name="plus" color={colors.primary} />
        </View>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : null}
      {dataNotes.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Catatan belum ada</Text>
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
    </Container>
  );
};

export default DashboardScreen;
