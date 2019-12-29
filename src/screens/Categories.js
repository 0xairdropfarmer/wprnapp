import React from 'react';
import {FlatList, ScrollView, View, TouchableOpacity} from 'react-native';
import {Card, Title} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
const cacheKey = 'CacheCategories';
import {withNavigationFocus} from 'react-navigation';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      categories: [],
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchCategorie();
    });
  }
  async fetchCategorie() {
    this.setState({loading: true});

    const networkState = await NetInfo.fetch();

    if (!networkState.isConnected) {
      const _cachedData = await AsyncStorage.getItem(cacheKey);
      if (!_cachedData) {
        alert("You're currently offline and no local data was found.");
      } else {
        alert('Your are offline but still have cache data');
      }
      this.setState({
        categories: categories,
        isloading: false,
      });
    } else {
      const response = await fetch(`http://kriss.pro/wp-json/wp/v2/categories`);
      const categories = await response.json();

      this.setState({
        categories: categories,
        loading: false,
      });
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          categories,
        }),
      );
    }
  }
  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.categories}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CategorieList', {
                  categorie_id: item.id,
                  categorie_name: item.name,
                })
              }>
              <Card>
                <Card.Content>
                  <Title>{item.name}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}
export default withNavigationFocus(Categories);
