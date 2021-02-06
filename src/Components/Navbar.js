import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TABS = ['Chats'];

const NavBar = ({onLayout}) => {
  const [selected, setSelected] = useState(0);
  const onViewLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    onLayout && onLayout(height);
  };
  return (
    <View style={styles.container} onLayout={onViewLayout}>
      {TABS.map((tab, index) => (
        <View key={'' + index}>
          <Text
            style={[
              styles.tab,
              selected === index ? styles.selectedTab : null,
            ]}>
            {tab}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'baseline',
    backgroundColor: 'black',
  },
  tab: {
    fontSize: 14,
    color: 'white',
    padding: 10,
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
});

export default NavBar;
