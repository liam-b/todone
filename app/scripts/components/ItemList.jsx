import { List, Segment, Button, Icon } from 'semantic-ui-react'

class ItemList extends React.Component {
  constructor() {
    super()
    this.state = {
      'items': []
    }
  }

  componentWillReceiveProps(nextProps) {
    let group = nextProps.match.params.group

    if (group != 0) {
      $.get('/api/items/todos/parent/' + group, (response) => {
        this.setState({
          items: response.todos
        })
      })
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  render() {
    let listItems
    listItems = this.state.items.map(item => {
      return (
        <Item content={item.content} id={item.id} key={item.id} />
      )
    })

    if (listItems.length == 0) return null
    else return (
      <Segment inverted className='ItemListSegment'>
        <List divided inverted relaxed='very' id='ItemList'>
          {listItems}
        </List>
      </Segment>
    )
  }
}

class Item extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <List.Item id={this.props.id} className='Item'>
        <Button.Group floated='right'>
          <Button icon='edit' compact size='small' color='grey' />
          <Button icon='delete' compact size='small' color='grey' />
        </Button.Group>

        <List.Content>
          <List.Header>{this.props.content}</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

export default ItemList