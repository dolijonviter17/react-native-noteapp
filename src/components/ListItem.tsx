import React, { useEffect, useState } from "react";
import { View, Text, ViewToken, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  NoteProps,
  checkNotesCollection,
  saveNotesCollection,
  viewNotesCollection,
} from "../model/NoteModel";
import { useTheme } from "@react-navigation/native";

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: NoteProps;
  onPressDetail: (note: NoteProps) => void;
  index: number;
};
const ListItem: React.FC<ListItemProps> = React.memo(
  ({ index, viewableItems, item, onPressDetail }) => {
    const { colors } = useTheme();
    const [tagStatus, setTagStatus] = useState<boolean>(item.archive);
    const [tagMessage, setTagMessage] = useState<string>("");
    useEffect(() => {
      setTagStatus(item.archive);
    }, []);
    const rStyles = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
      };
    }, []);
    const handleTag = async (tag: boolean) => {
      await setTagStatus(tag);
      if (tag) {
        setTagMessage("save");
      } else {
        setTagMessage("unsave");
      }
      setTimeout(() => {
        setTagMessage("");
      }, 1000);
      var notes = await viewNotesCollection();
      notes[index].archive = tag;
      await saveNotesCollection(notes);
    };
    return (
      <>
        <Animated.View
          style={[
            {
              width: "90%",
              minHeight: 100,
              borderRadius: 10,
              alignSelf: "center",
              marginBottom: 10,
              backgroundColor: item.theme,
              paddingHorizontal: 15,
            },
            rStyles,
          ]}
        >
          <TouchableOpacity onPress={() => onPressDetail(item)}>
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
                {item.title}
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
                {item.summary}
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
              <Text>{item.date}</Text>
              <Text>{"#" + item.category}</Text>
            </View>
          </TouchableOpacity>
          {tagMessage !== "" ? (
            <View
              style={{
                position: "absolute",
                right: "50%",
                bottom: 5,
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Montserrat-Medium",
                  color: item.theme,
                }}
              >
                {tagMessage}
              </Text>
            </View>
          ) : null}
        </Animated.View>
      </>
    );
  }
);

export default ListItem;
