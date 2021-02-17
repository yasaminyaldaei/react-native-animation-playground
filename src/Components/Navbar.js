import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const TABS = [
  {
    title: 'Section 1',
    key: 0,
  },
  {
    title: 'Section 2',
    key: 1,
  },
  {
    title: 'Section 3',
    key: 2,
  },
];

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
      <FlatList
        horizontal
        data={TABS}
        keyExtractor={(item) => '' + item.key}
        renderItem={({item, index}) => (
          <Text
            style={[
              styles.tab,
              selected === index ? styles.selectedTab : null,
            ]}>
            {item.title}
          </Text>
        )}
      />
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
    marginRight: 10,
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
});

export default NavBar;
