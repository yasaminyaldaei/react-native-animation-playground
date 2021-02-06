import React from 'react';
import {Animated, StyleSheet} from 'react-native';

class CollapsibleHeader extends React.Component {
  state = {
    layoutY: 0,
    layoutHeight: 0,
    clampedScroll: 0,
    stickyHeight: this.props.stickyHeaderHeight,
  };
  setStickyHeight = (stickyHeight) => {
    this.setState({
      stickyHeight,
    });
  };
  onLayout = ({
    nativeEvent: {
      layout: {y, height},
    },
  }) => {
    this.setState({
      layoutY: y,
      layoutHeight: height,
      clampedScroll: Animated.diffClamp(this.props.scrollY, 0, height),
    });

    this.props.onLayout && this.props.onLayout(height);
  };
  render() {
    const {clampedScroll, layoutHeight, stickyHeight} = this.state;
    const translateY = clampedScroll
      ? clampedScroll.interpolate({
          inputRange: [0, layoutHeight - stickyHeight],
          outputRange: [0, -(layoutHeight - stickyHeight)],
          extrapolate: 'clamp',
        })
      : 0;
    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY}]}]}
        onLayout={this.onLayout}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 10,
  },
});

export default CollapsibleHeader;
