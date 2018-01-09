import { List, Segment } from 'semantic-ui-react'
import Item from './Item.jsx'

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

export default ItemList