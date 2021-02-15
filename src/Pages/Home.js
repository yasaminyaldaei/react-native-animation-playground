import React, {createRef, Component} from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import ListItem from '../Components/ListItem';
import CollapsibleHeader from '../Components/CollapsibleHeader';
import Navbar from '../Components/Navbar';

class Home extends Component {
  scrollY = new Animated.Value(0);
  header = createRef(null);

  state = {
    headerHeight: 0,
    stickyHeaderHeight: 0,
    contacts: [],
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

  componentDidMount() {
    fetch('https://6005c08875860e0017c5d096.mockapi.io/contacts/', {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          contacts: data,
        }),
      )
      .catch(console.error);
  }
  render() {
    const {stickyHeaderHeight, contacts} = this.state;
    return (
      <>
        <Animated.FlatList
          contentContainerStyle={{paddingTop: this.state.headerHeight}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {useNativeDriver: true},
          )}
          data={contacts}
          renderItem={({item}) => (
            <ListItem name={item.name} avatar={item.avatar} id={item.id} />
          )}
          keyExtractor={(item) => item.id}
        />
        <CollapsibleHeader
          ref={this.header}
          onLayout={this.onHeaderLayout}
          scrollY={this.scrollY}
          stickyHeaderHeight={stickyHeaderHeight}>
          <Text style={styles.sectionTitle}>WhatsApp</Text>
          <Navbar onLayout={this.onStickyHeaderLayout} />
        </CollapsibleHeader>
      </>
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

export default Home;
