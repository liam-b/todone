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
      $.get('/api/items/getAllFromGroup?' + $.param({'parent': group}), (response) => {
        this.setState({
          items: response.items
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
      <Segment inverted className='ItemList'>
        <List divided inverted relaxed='very'>
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
        <Button animated='vertical' floated='right' compact size='small' color='grey'>
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name='edit' className='centeredIcon' />
          </Button.Content>
        </Button>

        <List.Content>
          <List.Header>{this.props.content}</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

export default ItemList