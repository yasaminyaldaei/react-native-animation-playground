/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {createRef} from 'react';
import {StyleSheet, View, Text, StatusBar, Animated} from 'react-native';

import List from './src/Components/List';
import NavBar from './src/Components/Navbar';
import CollapsibleHeader from './src/Components/CollapsibleHeader';
import {NavigationContainer} from '@react-navigation/native';

class App extends React.Component {
  scrollY = new Animated.Value(0);
  header = createRef(null);

  state = {
    headerHeight: 0,
    stickyHeaderHeight: 0,
  };

  onHeaderLayout = (headerHeight) => {
    this.setState({
      headerHeight,
    });
  };

  onStickyHeaderLayout = (stickyHeaderHeight) => {
    this.setState({
      stickyHeaderHeight,
    });
    this.header?.current?.setStickyHeight(stickyHeaderHeight);
  };

  render() {
    const {stickyHeaderHeight} = this.state;
    return (
      <NavigationContainer>
        <View style={{flex: 1}}>
          <Animated.ScrollView
            contentContainerStyle={{paddingTop: this.state.headerHeight}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
              {useNativeDriver: true},
            )}>
            <List />
          </Animated.ScrollView>
          <CollapsibleHeader
            ref={this.header}
            onLayout={this.onHeaderLayout}
            scrollY={this.scrollY}
            stickyHeaderHeight={stickyHeaderHeight}>
            <Text style={styles.sectionTitle}>WhatsApp</Text>
            <NavBar onLayout={this.onStickyHeaderLayout} />
          </CollapsibleHeader>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    margin: 20,
  },
});

export default App;
