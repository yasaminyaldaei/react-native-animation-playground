import React from 'react';
import {Animated, StyleSheet} from 'react-native';

class CollapsibleHeader extends React.Component {
  state = {
    layoutHeight: 0,
    clampedScroll: 0,
    stickyHeight: this.props.stickyHeaderHeight,
  };

  componentDidUpdate() {
    const {scrollY, stickyHeaderHeight} = this.props;
    const {layoutHeight, clampedScroll} = this.state;

    if (stickyHeaderHeight && layoutHeight && !clampedScroll) {
      this.setState({
        clampedScroll: Animated.diffClamp(
          scrollY,
          0,
          layoutHeight - stickyHeaderHeight,
        ),
      });
    }
  }

  setStickyHeight = (stickyHeight) => {
    this.setState({
      stickyHeight,
    });
  };
  onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    this.setState({
      layoutHeight: height,
    });

    this.props.onLayout && this.props.onLayout(height);
  };
  render() {
    const {clampedScroll, layoutHeight, stickyHeight} = this.state;
    const translateY =
      clampedScroll && layoutHeight && stickyHeight
        ? Animated.multiply(clampedScroll, -1)
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
