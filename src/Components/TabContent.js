import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import DetailsSection from './DetailsSection';
import ScrollContext from '../ScrollContext';

const width = Dimensions.get('screen').width;

class TabContent extends React.Component {
  list = React.createRef(null);
  scrollY = React.createRef(0);
  state = {
    sectionDetails: {},
  };

  componentDidMount() {
    const {id} = this.props;

    id
      ? fetch(
          `https://6005c08875860e0017c5d096.mockapi.io/sections/${id}/section/`,
          {
            method: 'GET',
          },
        )
          .then((data) => data.json())
          .then((data) =>
            this.setState({
              sectionDetails: data,
            }),
          )
          .catch(console.error)
      : null;
  }

  render() {
    const {sectionDetails} = this.state;
    const {id, headerHeight, previousScrollY} = this.props;
    return (
      <ScrollContext.Consumer>
        {({scrollY}) => (
          <View style={[{width}]}>
            <FlatList
              ref={this.list}
              data={sectionDetails}
              keyExtractor={(item) => item.id}
              getItemLayout={(_, index) => ({
                length: 80,
                offset: 80 * index,
                index,
              })}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.list.current.scrollToIndex({animated: true, index: 0})
                  }>
                  <DetailsSection
                    key={'' + item.id}
                    title={`${id} - ${item.title}`}
                    image={item.image}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollContext.Consumer>
    );
  }
}

TabContent.contextType = ScrollContext;

export default TabContent;
