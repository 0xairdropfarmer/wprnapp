import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {List, Icon} from 'react-native-paper';
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Contact')}>
          <List.Item
            title="Contact Us"
            left={() => <List.Icon icon="chevron-right" />}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Setting;