import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function DetailsSection({title}) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'white',
  },
});

export default DetailsSection;
