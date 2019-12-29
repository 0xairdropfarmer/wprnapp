import React, {Component} from 'react'
import Navigator from './src/components/Navigator'
import {ThemeManager} from './src/components/ThemeManager'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <ThemeManager>
        <Navigator />
      </ThemeManager>
    )
  }
}

export default App
