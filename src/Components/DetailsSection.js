import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function DetailsSection({title, image}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginRight: 10,
  },
});

export default DetailsSection;
