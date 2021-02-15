import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class DetailsNavbar extends React.Component {
  onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    this.props.onLayout && this.props.onLayout(height);
  };
  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <TouchableOpacity onPress={this.props.onPress}>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} size={18} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3,
  },
  icon: {
    color: 'white',
    margin: 20,
  },
});

export default DetailsNavbar;
