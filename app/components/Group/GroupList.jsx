import { Menu, Segment, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'

class GroupList extends React.Component {
  constructor() {
    super()
    this.state = {
      'collections': [],
      'activeItem': '',
      'currentWorkspace': ''
    }

    this.handleItemClick = (e, {id}) => {
      this.handleClick(id)
    }
  }

  handleClick(id) {
    this.props.history.push('/app/workspace/' + this.state.currentWorkspace + '/group/' + id)
    this.setState({'activeItem': id})
  }

  componentWillReceiveProps(nextProps) {
    let workspace = nextProps.match.params.workspace
    let group = nextProps.match.params.group

    if (workspace != 0 && group != 0) {
      $.get('/api/collections/groups/parent/' + workspace, (response) => {
        // if (workspace != this.state.currentWorkspace) this.setState({
        //   'activeItem': workspace
        // })

        this.setState({
          'collections': response.groups,
          'currentWorkspace': workspace
        })

        this.setState({
          'activeItem': group
        })

        // if (workspace == group) this.setState({'activeItem': workspace})
      })
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  sayhi() {
    console.log('hi')
  }

  render() {
    const { activeItem } = this.state

    let listGroups
    if (true) {
      listGroups = this.state.collections.map(collection => {
        return (
          <Menu.Item className='GroupItem' key={collection.id} id={collection.id} active={activeItem === collection.id} onClick={this.handleItemClick}>
            <Icon name='options' />
            {collection.name}
          </Menu.Item>
        )
      })
    }

    return (
      <Menu secondary vertical fluid className='GroupList'>
        <Menu.Item className='GroupItem WorkspaceGroupItem' key={this.state.currentWorkspace} id={this.state.currentWorkspace} active={activeItem === this.state.currentWorkspace} onClick={this.handleItemClick}>
          <Icon name='options' />
          Workspace
        </Menu.Item>
        {listGroups}
      </Menu>
    )
  }
}

export default withRouter(GroupList)