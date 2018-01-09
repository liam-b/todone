import { Button, Grid, Segment, Input, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { withRouter } from 'react-router'

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
          {/* <Route exect path='/app' component={redirectHome} /> */}
          <NavMenu />

          <Grid container divided>
            <Grid.Column width={5}>
              <Route path='/app/workspace/:workspace/group/:group' component={WorkspaceList} />
              <Route path='/app/workspace/:workspace/group/:group' component={GroupList} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Route path='/app/workspace/:workspace/group/:group' component={ItemList} />
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    )
  }
}

function redirectHome() {
  let workspace
  let group

  $.get('/api/collections/getAll?' + $.param({'type': 'workspace'}), (response) => {
    workspace = response.collections[0]
  })

  $.get('/api/collections/getAllFromParent?' + $.param({'parent': workspace}), (response) => {
    group = response.collections[0]
  })

  this.props.history.push('/app/workspace/' + workspace + '/group/' + group)

  return <h1>Redirect</h1>
}

export default App