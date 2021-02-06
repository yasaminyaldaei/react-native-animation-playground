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
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
export default ListItem;
