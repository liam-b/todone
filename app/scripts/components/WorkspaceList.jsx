import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';

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
    $.get('/api/collections/getAllFromParent?' + $.param({'parent': id}), (response) => {
      this.props.history.push('/app/workspace/' + id + '/group/' + id)
    })
    this.setState({'activeItem': id})
  }

  componentDidMount() {
    let activeItem

    $.get('/api/collections/getAll?' + $.param({'type': 'workspace'}), (response) => {
      this.setState({
        'collections': response.collections
      })

      $.get('/api/collections/getAllFromParent?' + $.param({'parent': activeItem}), (response) => {
        this.props.history.push('/app/workspace/' + activeItem + '/group/' + response.collections.find((collection) => {
          return collection.order === 0
        }).id)
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    let workspace = nextProps.match.params.workspace

    if (workspace != 0) {
      $.get('/api/collections/getAll?' + $.param({'type': 'workspace'}), (response) => {
        this.setState({
          'collections': response.collections
        })
      })
    }
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