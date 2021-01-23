import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch('https://6005c08875860e0017c5d096.mockapi.io/contacts/', {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((data) => setContacts(data))
      .catch(console.error);
  }, []);

  return (
    <View>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          name={contact.name}
          avatar={contact.avatar}
        />
      ))}
    </View>
  );
};

export default List;
