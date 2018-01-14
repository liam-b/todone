import { Button, Grid, Segment, Input, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import ItemList from './ItemList.jsx'
import GroupList from './GroupList.jsx'
import NavMenu from './NavMenu.jsx'
import WorkspaceList from './WorkspaceList.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      'group': '',
      'activeItem': 'home'
    }

    this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  }

  render() {
    const {activeItem} = this.state

    return (
      <Router>
        <div className='App'>
          <NavMenu />

          <Grid container>
            <Grid.Column width={4}>
              <Route path='/app/workspace/:workspace/group/:group' component={WorkspaceList} />
              <Route path='/app/workspace/:workspace/group/:group' component={GroupList} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Route path='/app/workspace/:workspace/group/:group' component={ItemList} />
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    )
  }
}

export default App