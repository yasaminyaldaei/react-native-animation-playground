import React, {Component} from 'react';
import {Animated, View} from 'react-native';
import DetailsSection from '../Components/DetailsSection';
import CollapsibleImageHeader from '../Components/CollapsibleImageHeader';
import DetailsNavbar from '../Components/DetailsNavbar';

class Details extends Component {
  scrollY = new Animated.Value(0);
  collapsibleHeader = React.createRef(null);
  state = {
    details: {},
    headerHeight: 0,
    stickyHeaderHeight: 0,
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

  render() {
    const {details, headerHeight, stickyHeaderHeight} = this.state;
    return (
      <>
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
          stickyHeaderHeight={stickyHeaderHeight}
        />
        <Animated.ScrollView
          contentContainerStyle={{paddingTop: headerHeight}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {useNativeDriver: true},
          )}>
          {Array(20)
            .fill(1)
            .map((_, index) => (
              <DetailsSection key={'' + index} title={`section ${index + 1}`} />
            ))}
        </Animated.ScrollView>
      </>
    );
  }
}

export default Details;
