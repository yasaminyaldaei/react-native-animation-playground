import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PROFILE_PLACEHOLDER from '../Assets/profile.png';

const ListItem = ({avatar, name, id}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        id
          ? navigation.navigate('Details', {
              id,
            })
          : null
      }>
      <ImageBackground
        source={PROFILE_PLACEHOLDER}
        style={{}}
        imageStyle={styles.image}>
        <Image source={{uri: avatar}} style={styles.image} />
      </ImageBackground>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

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
