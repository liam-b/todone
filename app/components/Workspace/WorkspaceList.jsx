import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'

class WorkspaceList extends React.Component {
  constructor() {
    super()
    this.state = {
      'collections': [],
      'activeItem': ''
    }

    this.handleItemClick = (e, {id}) => {
      this.handleClick(id)
    }
  }

  handleClick(id) {
    this.props.history.push('/app/workspace/' + id + '/group/' + id)
    this.setState({'activeItem': id})
  }

  componentWillReceiveProps(nextProps) {
    let workspace = nextProps.match.params.workspace

    if (workspace != 0) {
      $.get('/api/collections/workspaces', (response) => {
        this.setState({
          'collections': response.workspaces
        })
      })
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
    this.setState({
      'activeItem': this.props.match.params.workspace
    })
  }

  render() {
    const { activeItem } = this.state

    let listWorkspaces
    if (true) {
      listWorkspaces = this.state.collections.map(collection => {
        return (
          <Menu.Item key={collection.id} name={collection.name} id={collection.id} active={activeItem === collection.id} onClick={this.handleItemClick} />
        )
      })
    }

    return (
      <Menu pointing secondary className='WorkspaceList'>
        {listWorkspaces}
      </Menu>
    )
  }
}

export default withRouter(WorkspaceList)