import React from 'react';
import {Animated, StyleSheet} from 'react-native';

class StickyHeader extends React.Component {
  translateY = new Animated.Value(0);
  state = {
    measured: false,
    layoutY: 0,
    layoutHeight: 0,
    nextHeaderLayoutY: this.props.nextHeaderLayoutY,
  };

  setNextHeaderLayoutY = (nextHeaderLayoutY) => {
    this.setState({
      nextHeaderLayoutY,
    });
  };

  onLayout = ({
    nativeEvent: {
      layout: {y, height},
    },
  }) => {
    const {onLayout} = this.props;
    this.setState({
      measured: true,
      layoutY: y,
      layoutHeight: height,
    });
    onLayout && onLayout(y);
  };

  render() {
    const {measured, layoutHeight, layoutY, nextHeaderLayoutY} = this.state;
    const {height, backgroundColor, scrollY} = this.props;
    const inputRange = [-1, 0];
    const outputRange = [0, 0];

    if (measured) {
      inputRange.push(layoutY);
      outputRange.push(0);
      const collisionPoint = (nextHeaderLayoutY || 0) - layoutHeight;
      if (collisionPoint >= layoutY) {
        inputRange.push(collisionPoint, collisionPoint + 1);
        outputRange.push(collisionPoint - layoutY, collisionPoint - layoutY);
      } else {
        inputRange.push(layoutY + 1);
        outputRange.push(1);
      }
    }
    this.translateY = scrollY.interpolate({
      inputRange,
      outputRange,
    });

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[
          styles.container,
          {
            height: height,
            backgroundColor: backgroundColor,
            transform: [{translateY: this.translateY}],
          },
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
});

export default StickyHeader;
