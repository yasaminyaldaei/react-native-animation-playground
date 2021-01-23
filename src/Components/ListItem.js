import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const ListItem = ({avatar, name}) => (
  <View style={styles.container}>
    <Image source={{uri: avatar}} style={styles.image} />
    <Text>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
  },
});
export default ListItem;
