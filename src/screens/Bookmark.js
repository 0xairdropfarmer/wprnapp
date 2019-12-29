import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, List, Headline} from 'react-native-paper';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
export class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark_post: [],
      isFetching: false,
    };
  }
  fetchBookmark = async () => {
    let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        const result = res.map(post_id => {
          return 'include[]=' + post_id;
        });
        return result.join('&');
      } else {
        return null;
      }
    });
    const response = await fetch(
      `http://kriss.pro/wp-json/wp/v2/posts?${bookmark}`,
    );
    const post = await response.json();
    //this.setState({ posts: post });
    this.setState({bookmark_post: post});
  };
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchBookmark();
    });
  }

  render() {
    return (
      <View>
        <Headline style={{marginLeft: 30}}>Bookmark Post</Headline>
        <FlatList
          data={this.state.bookmark_post}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SinglePost', {
                  post_id: item.id,
                })
              }>
              <Card
                style={{
                  shadowOffset: {width: 5, height: 5},
                  width: '90%',
                  borderRadius: 12,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                <Card.Content>
                  <Title>{item.title.rendered}</Title>
                  <Paragraph>
                    Published on {moment(item.date).fromNow()}
                  </Paragraph>
                </Card.Content>
                <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
                <Card.Content>
                  <Card.Content>
                    <HTMLRender html={item.excerpt.rendered} />
                  </Card.Content>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default withNavigationFocus(Bookmark);
