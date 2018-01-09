import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';

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
    console.log('GroupList', '/app/workspace/' + this.state.currentWorkspace + '/group/' + id)
    this.props.history.push('/app/workspace/' + this.state.currentWorkspace + '/group/' + id)
    this.setState({'activeItem': id})
  }

  componentWillReceiveProps(nextProps) {
    console.log('i live')
    let workspace = nextProps.match.params.workspace
    let group = nextProps.match.params.group

    if (workspace != 0 && group != 0) {
      $.get('/api/collections/getAllFromParent?' + $.param({'parent': workspace}), (response) => {
        if (workspace != this.state.currentWorkspace) this.setState({
          'activeItem': workspace
        })

        this.setState({
          'collections': response.collections,
          'currentWorkspace': workspace
        })

        if (workspace == group) this.setState({'activeItem': workspace})
      })
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  render() {
    const { activeItem } = this.state

    let listGroups
    if (true) {
      listGroups = this.state.collections.map(collection => {
        return (
          <Menu.Item className='GroupItem' key={collection.id} name={collection.name} id={collection.id} active={activeItem === collection.id} onClick={this.handleItemClick} />
        )
      })
    }

    console.log(listGroups)

    return (
      <Menu secondary vertical fluid className='GroupList'>
        <Menu.Item className='GroupItem WorkspaceGroupItem' key={this.state.currentWorkspace} name='Workspace' id={this.state.currentWorkspace} active={activeItem === this.state.currentWorkspace} onClick={this.handleItemClick} />
        {listGroups}
      </Menu>
    )
  }
}

export default withRouter(GroupList)