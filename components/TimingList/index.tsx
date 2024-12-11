import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

type TimingListProps = {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
};

type TimeInfo = {
  time: string;
};

const TimingList = (props: TimingListProps) => {
  const renderItem = ({ item }: ListRenderItemInfo<TimeInfo>) => {
    const { selectedTime } = props;
    const { time } = item;
    return (
      <View
        style={[
          styles.cellContainer,
          selectedTime ? (selectedTime == time ? styles.activeCell : "") : "",
        ]}
        key={time}
      >
        <TouchableHighlight
          onPress={() => props.onTimeSelect(time)}
          underlayColor="transparent"
        >
          <Text style={styles.name}>{time}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.separator} />

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        automaticallyAdjustContentInsets={false}
        style={styles.container}
        data={[]}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cellContainer: {
    flex: 1,
    backgroundColor: "#e7e7e7",
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 5,
    marginTop: 10,
    marginBottom: 0,
  },
  activeCell: {
    // backgroundColor: Colors.red
  },
  cellWrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    paddingRight: 5,
    paddingLeft: 5,
  },
  titleWrapper: {
    justifyContent: "flex-start",
    flex: 2,
  },
  name: {
    color: "#FFFFFD",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f5f5",
  },
});

export default TimingList;
