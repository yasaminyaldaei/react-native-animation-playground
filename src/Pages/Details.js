import React, {Component, createRef} from 'react';
import {Animated, View, FlatList, ScrollView} from 'react-native';
import CollapsibleImageHeader from '../Components/CollapsibleImageHeader';
import DetailsNavbar from '../Components/DetailsNavbar';
import TabContent from '../Components/TabContent';
import ScrollContext from '../ScrollContext';

class Details extends Component {
  scrollY = new Animated.Value(0);
  previousScrollY = createRef(0);
  previousY = new Animated.Value(0);
  direction = createRef(0);
  collapsibleHeader = React.createRef(null);
  list = React.createRef(null);
  state = {
    details: {},
    headerHeight: 0,
    stickyHeaderHeight: 0,
    tabs: {},
    selectedTab: 0,
  };
  componentDidMount() {
    const {route} = this.props;
    const {id} = route.params;
    fetch(`https://6005c08875860e0017c5d096.mockapi.io/contacts/${id}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          details: data,
        }),
      )
      .catch(console.error);

    fetch(`https://6005c08875860e0017c5d096.mockapi.io/sections/`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          tabs: data,
        }),
      )
      .catch(console.error);

    this.scrollY.addListener(this.setScrollY);
    this.previousY.addListener(({value}) => console.log(value));
  }

  onPressBack = () => this.props.navigation.navigate('Home');

  onHeaderLayout = (headerHeight) => {
    this.setState({
      headerHeight,
    });
  };

  onStickyHeaderLayout = (stickyHeaderHeight) => {
    this.setState({
      stickyHeaderHeight,
    });
    this.collapsibleHeader?.current?.onStickyHeaderLayout(stickyHeaderHeight);
  };

  onChangeTab = (selectedTab) => {
    this.setState(
      {
        selectedTab,
      },
      () => {
        this.list?.current?.scrollToIndex({
          animated: true,
          index: this.state.selectedTab,
        });
        this.previousY.setValue(this.previousScrollY.current);
      },
    );
  };

  setScrollY = ({value}) => {
    this.direction.current = value - this.previousScrollY.current > 0 ? 1 : -1;
    this.previousScrollY.current = value;
  };

  scrollContextValue = {
    scrollY: this.scrollY,
    setScrollY: this.setScrollY,
  };

  render() {
    const {
      details,
      headerHeight,
      stickyHeaderHeight,
      tabs,
      selectedTab,
    } = this.state;
    return (
      <ScrollContext.Provider value={this.scrollContextValue}>
        <DetailsNavbar
          onPress={this.onPressBack}
          scrollY={this.scrollY}
          onLayout={this.onStickyHeaderLayout}
        />
        <CollapsibleImageHeader
          ref={this.collapsibleHeader}
          avatar={details.avatar}
          onLayout={this.onHeaderLayout}
          scrollY={this.scrollY}
          previousScrollY={this.previousY}
          stickyHeaderHeight={stickyHeaderHeight}
          direction={this.direction.current}
          onTabChange={this.onChangeTab}
        />
        {tabs && tabs.length !== 0 ? (
          <FlatList
            ref={this.list}
            data={tabs}
            keyExtractor={(item) => '' + item.id}
            horizontal
            nestedScrollEnabled
            renderItem={({item, index}) => (
              <TabContent
                id={item.id}
                active={index === selectedTab}
                headerHeight={headerHeight}
                previousScrollY={this.previousY}
              />
            )}
          />
        ) : null}
      </ScrollContext.Provider>
    );
  }
}

export default Details;
