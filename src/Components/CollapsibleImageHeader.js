import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import Navbar from './Navbar';

class CollapsibleImageHeader extends React.Component {
  state = {
    layoutY: 0,
    layoutHeight: 0,
    stickyHeight: this.props.stickyHeaderHeight || 0,
    navbarHeight: 0,
  };
  onLayout = ({
    nativeEvent: {
      layout: {y, height},
    },
  }) => {
    this.setState({
      layoutY: y,
      layoutHeight: height,
    });
    this.props.onLayout && this.props.onLayout(height);
  };
  onStickyHeaderLayout = (height) => {
    this.setState({
      stickyHeight: height,
    });
  };

  onNavbarLayout = (height) => {
    this.setState({
      navbarHeight: height,
    });
  };

  render() {
    const {
      avatar,
      scrollY,
      onTabChange,
      previousScrollY,
      direction,
    } = this.props;
    const {layoutHeight, stickyHeight, navbarHeight} = this.state;
    const stickyHeaderHeight = layoutHeight - stickyHeight - navbarHeight;
    const interpolateValue = Animated.add(
      previousScrollY,
      Animated.multiply(scrollY, direction || 1),
    );
    const opacity = layoutHeight
      ? interpolateValue.interpolate({
          inputRange: [0, stickyHeaderHeight],
          outputRange: [1, 0],
        })
      : 0;
    const translateY = layoutHeight
      ? interpolateValue.interpolate({
          inputRange: [0, stickyHeaderHeight],
          outputRange: [0, -stickyHeaderHeight],
          extrapolate: 'clamp',
        })
      : 0;
    const separatorOpacity = layoutHeight
      ? interpolateValue.interpolate({
          inputRange: [0, stickyHeaderHeight],
          outputRange: [0, 0.3],
          extrapolate: 'clamp',
        })
      : 0;
    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[styles.container, {transform: [{translateY}]}]}>
        <Animated.Image
          source={{uri: avatar}}
          style={[styles.image, {opacity}]}
        />
        <Animated.View
          style={[styles.separator, {opacity: separatorOpacity}]}
        />
        <Navbar onLayout={this.onNavbarLayout} onChange={onTabChange} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    zIndex: 2,
  },
  image: {
    height: 300,
  },
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: 'dimgray',
  },
});

export default CollapsibleImageHeader;
