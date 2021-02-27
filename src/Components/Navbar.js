import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

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

class NavBar extends React.Component {
  state = {
    selected: 0,
  };

  onViewLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    const {onLayout} = this.props;
    onLayout && onLayout(height);
  };

  onTabChange = (selected) => {
    this.setState(
      {
        selected,
      },
      () => {
        const {onChange} = this.props;
        onChange && onChange(this.state.selected);
      },
    );
  };

  render() {
    const {selected} = this.state;
    return (
      <View style={styles.container} onLayout={this.onViewLayout}>
        <FlatList
          horizontal
          data={TABS}
          keyExtractor={(item) => '' + item.key}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.onTabChange(index)}>
              <Text
                style={[
                  styles.tab,
                  selected === index ? styles.selectedTab : null,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

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
