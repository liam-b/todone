import { Button, Grid, Segment, Input, Menu } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import Items from './components/Item/ItemList.jsx'
import Groups from './components/Group/Group.component.js'
import Navbar from './components/Navbar/Navbar.component.js'
import Workspaces from './components/Workspace/Workspace.component.js'

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
          <Navbar />

          <Grid container>
            <Grid.Column width={4}>
              <Route path='/app/workspace/:workspace/group/:group' component={Workspaces} />
              <Route path='/app/workspace/:workspace/group/:group' component={Groups} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Route path='/app/workspace/:workspace/group/:group' component={Items} />
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    )
  }
}

export default App