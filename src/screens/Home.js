import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {withTheme, Headline} from 'react-native-paper';
import ContentCard from '../components/ContentCard';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
const cacheKey = 'CacheData';
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastestpost: [],
      isFetching: false,
      page: 1,
    };
  }
  renderFooter = () => {
    if (this.state.isFetching) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.fetchLastestPost();
    });
  }
  componentDidMount() {
    this.fetchLastestPost();
  }

  async fetchLastestPost() {
    const networkState = await NetInfo.fetch();

    if (!networkState.isConnected) {
      
      const _cachedData = await AsyncStorage.getItem(cacheKey);
      if (!_cachedData) {
        alert(
          "You're currently offline and no local data was found.",
        );
      }else{
        alert('Your are offline but still have cache data')
      }
      const cachedData = JSON.parse(_cachedData);

      this.setState({
        lastestpost: cachedData.post,
        isFetching: false,
      });
    } else {
      let page = this.state.page;
      const response = await fetch(
        `http://kriss.pro/wp-json/wp/v2/posts?per_page=5&page=${page}`,
      );
      const post = await response.json();
      this.setState({
        lastestpost: page === 1 ? post : [...this.state.lastestpost, ...post],
        isFetching: false,
      })
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          post,
        }),
      );
    }
  }
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchLastestPost();
      },
    );
  };
  render() {
    const {colors} = this.props.theme;
    return (
      <View>
        <Headline style={{marginLeft: 30}}>Lastest Post</Headline>

        <FlatList
          data={this.state.lastestpost}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          handleLoadMore={this.renderFooter}
          renderItem={({item}) => (
            <ContentCard
              item={item}
              navigation={this.props.navigation}
              textColor={colors.text}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default withTheme(Home);
