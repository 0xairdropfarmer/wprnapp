import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,Share
} from 'react-native';
import moment from 'moment';

export default class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      post: [],
    };
  }
  onShare = async (title, uri) => {
    Share.share({
      title: title,
      url: uri,
    });
  };
  componentDidMount() {
    this.fetchPost();
  }
  async fetchPost() {
    let post_id = this.props.navigation.getParam('post_id')
  
    const response = await fetch(
      `http://kriss.pro/wp-json/wp/v2/posts?_embed&include=${post_id}`
    );
    const post = await response.json();
    this.setState({
      post: post,
      isloading: false,
    });
  }
  
  render() {
    let post = this.state.post;
    if (this.state.isloading) {
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
    }
    return (
      <ScrollView>
          <Card>
            <Card.Content>
              <Title>{post[0].title.rendered} </Title>
              <List.Item
                title={`${post[0]._embedded.author[0].name}`}
                description={`${post[0]._embedded.author[0].description}`}
                left={props => {
                  return (
                    <Avatar.Image
                      size={55}
                      source={{
                        uri: `${post[0]._embedded.author[0].avatar_urls[96]}`,
                      }}
                    />
                  );
                }}
                
              />
              <List.Item
                title={`Published on ${moment(
                  post[0].date,
                  'YYYYMMDD'
                ).fromNow()}`}
              />
              <Paragraph />
            </Card.Content>
            <Card.Cover source={{ uri: post[0].jetpack_featured_media_url }} />
            <Card.Content>
              <HTML html={post[0].content.rendered} 
                    imagesInitialDimensions={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').width * 2,
                    }
               }/>
            </Card.Content>
          </Card>
       
      </ScrollView>
    );
  }
}