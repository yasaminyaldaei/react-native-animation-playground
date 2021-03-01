import React, {Component, createRef} from 'react';
import {Animated, FlatList} from 'react-native';
import CollapsibleImageHeader from '../Components/CollapsibleImageHeader';
import TabContent from '../Components/TabContent';
import ScrollContext from '../ScrollContext';
import TabBar from '../Components/TabBar';
import StickyHeader from '../Components/StickyHeader';

class Details extends Component {
  scrollView = createRef(null);
  scrollY = new Animated.Value(0);
  scrollYRef = createRef(0);
  previousScrollY = createRef(0);
  collapsibleHeader = React.createRef(null);
  list = React.createRef(null);
  stickyHeader = React.createRef(null);

  tabsScrollValues = new Map();
  state = {
    details: {},
    headerHeight: 0,
    stickyHeaderHeight: 0,
    tabs: {},
    selectedTab: 0,
    navbarHeight: 0,
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
        this.setState(
          {
            tabs: data,
          },
          () => {
            this.state.tabs.map((tab, index) =>
              this.tabsScrollValues.set(index, 0),
            );
          },
        ),
      )
      .catch(console.error);

    this.scrollY.addListener(this.setScrollY);
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

  onNavbarLayout = (height, y) => {
    this.setState({
      navbarHeight: height,
    });
  };

  onTabBarLayout = (height, y) => {
    this.setState({
      tabBarHeight: height,
      tabBarY: y,
    });

    // this.stickyHeader.current.setNextHeaderLayoutY(y);
  };

  getNextTabScrollY = (nextIndex) => {
    const {headerHeight} = this.state;
    const currentScrollY = this.scrollYRef.current;
    const nextTabInitialScrollY = this.tabsScrollValues.get(nextIndex);
    if (currentScrollY <= headerHeight) {
      return currentScrollY;
    } else {
      if (nextTabInitialScrollY <= headerHeight) {
        return headerHeight;
      } else {
        return nextTabInitialScrollY;
      }
    }
  };

  onChangeTab = (selectedTab) => {
    this.tabsScrollValues.set(this.state.selectedTab, this.scrollYRef.current);
    this.scrollView.current.scrollTo({
      x: 0,
      y: this.getNextTabScrollY(selectedTab),
      animated: true,
    });
    this.setState(
      {
        selectedTab,
      },
      () => {
        this.list?.current?.scrollToIndex({
          animated: true,
          index: this.state.selectedTab,
        });
      },
    );
  };

  setScrollY = ({value}) => {
    this.scrollYRef.current = value;
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
      navbarHeight,
    } = this.state;
    return (
      <ScrollContext.Provider value={this.scrollContextValue}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {useNativeDriver: true},
          )}
          stickyHeaderIndices={[0, 1]}
          ref={this.scrollView}
          showsVerticalScrollIndicator={false}>
          <CollapsibleImageHeader
            ref={this.collapsibleHeader}
            avatar={details.avatar}
            onViewLayout={this.onHeaderLayout}
            scrollY={this.scrollY}
            previousScrollY={this.previousY}
            stickyHeaderHeight={stickyHeaderHeight}
            onPressBack={this.onPressBack}
            onNavbarLayout={this.onStickyHeaderLayout}
          />
          <TabBar onChange={this.onChangeTab} onLayout={this.onTabBarLayout} />
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
                  previousScrollY={this.previousScrollY}
                />
              )}
            />
          ) : null}
        </Animated.ScrollView>
      </ScrollContext.Provider>
    );
  }
}

export default Details;
