import React from 'react';
import {Animated, StyleSheet} from 'react-native';

class CollapsibleImageHeader extends React.Component {
  state = {
    layoutY: 0,
    layoutHeight: 0,
    stickyHeight: this.props.stickyHeaderHeight || 0,
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
  render() {
    const {avatar, scrollY} = this.props;
    const {layoutHeight, stickyHeight} = this.state;
    const opacity = layoutHeight
      ? scrollY.interpolate({
          inputRange: [0, layoutHeight],
          outputRange: [1, 0],
        })
      : 0;
    const translateY = layoutHeight
      ? scrollY.interpolate({
          inputRange: [0, layoutHeight - stickyHeight],
          outputRange: [0, -(layoutHeight - stickyHeight)],
          extrapolate: 'clamp',
        })
      : 0;
    return (
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
        <Animated.Image
          onLayout={this.onLayout}
          source={{uri: avatar}}
          style={[styles.image, {opacity}]}
        />
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
});

export default CollapsibleImageHeader;
