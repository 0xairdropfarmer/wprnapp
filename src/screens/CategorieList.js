import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment';
import HTML from 'react-native-render-html';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
const cacheKey = 'CacheData';
export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  async fetchPost() {
    let categorie_id = this.props.navigation.getParam('categorie_id');
    const networkState = await NetInfo.fetch();

    if (!networkState.isConnected) {
      const _cachedData = await AsyncStorage.getItem(cacheKey);
      const cachedData = JSON.parse(_cachedData);
      console.log(cachedData);
      if (!cachedData) {
        alert("You're currently offline and no local data was found.");
      } else {
        alert('Your are offline but still have cache data');
      }
      let post = cachedData.post.filter(value => value.categories === categorie_id);
      cachedData.post.map((item,index)=>{
        console.log(item.categories)
      })
      this.setState({
        post: post,
        isloading: false,
        offline: true,
      });
    } else {
    const response = await fetch(
      `http://kriss.pro/wp-json/wp/v2/posts?categories=${categorie_id}`,
    );
    const post = await response.json();
    this.setState({posts: post});
    }
  }
  render() {
   let categorie_name = this.props.navigation.getParam('categorie_name');
    // alert(this.props.navigation.getParam);
    return (
      <View>
        <Title style={{marginLeft: 30}}>{categorie_name}</Title>
        <FlatList
          data={this.state.posts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CategorieList', {
                  post_id: item.id,
                })
              }>
              <Card>
                <Card.Content>
                  <Title>{item.title.rendered}</Title>
                  <Paragraph>
                    Published on {moment(item.date, 'YYYYMMDD').fromNow()}
                  </Paragraph>
                </Card.Content>
                <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
                <Card.Content>
                  <HTML html={item.excerpt.rendered} />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
