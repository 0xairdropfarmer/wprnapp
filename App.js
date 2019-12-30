import React, {Component} from 'react';
import Navigator from './src/components/Navigator';
import {ThemeManager} from './src/components/ThemeManager';
import SplashScreen from 'react-native-splash-screen';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <ThemeManager>
        <Navigator />
      </ThemeManager>
    );
  }
}

export default App;
