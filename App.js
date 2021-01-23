/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import StickyHeader from './src/Components/StickyHeader';
import List from './src/Components/List';
import NavBar from './src/Components/Navbar';

class App extends React.Component {
  scrollY = new Animated.Value(0);
  first = createRef(null);
  second = createRef(null);
  state = {
    headerLayoutYs: {},
  };

  onStickyHeaderLayout = (layoutY, key) => {
    this.setState(({headerLayoutYs}) => ({
      headerLayoutYs: {
        ...headerLayoutYs,
        [key]: layoutY,
      },
    }));

    if (key !== 0) {
      this.first.current.setNextHeaderLayoutY(layoutY);
    }
  };

  render() {
    const {headerLayoutYs} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Animated.ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
              {useNativeDriver: true},
            )}>
            <StickyHeader
              ref={this.first}
              nextHeaderLayoutY={headerLayoutYs[1]}
              onLayout={(y) => this.onStickyHeaderLayout(y, 0)}
              scrollAnimationValue={this.scrollY}
              backgroundColor={'black'}>
              <Text style={styles.sectionTitle}>WhatsApp</Text>
            </StickyHeader>
            <StickyHeader
              ref={this.second}
              nextHeaderLayoutY={null}
              onLayout={(y) => this.onStickyHeaderLayout(y, 1)}
              scrollAnimationValue={this.scrollY}
              backgroundColor={'black'}>
              <NavBar />
            </StickyHeader>
            <View style={styles.body}>
              <List />
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    margin: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
