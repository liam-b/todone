import { List, Segment } from 'semantic-ui-react'
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import Item from './Item.jsx'
import AddItem from './AddItem.jsx'

class ItemList extends React.Component {
  constructor() {
    super()
    this.state = {
      'items': []
    }
  }

  componentWillReceiveProps(nextProps) {
    let group = nextProps.match.params.group

    $.get('/api/items/todos/parent/' + group, (response) => {
      this.setState({
        items: response.todos
      })
    })
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
      <div className='ItemListSegment'>
        <Segment inverted>
          <List divided inverted relaxed='very' id='ItemList'>
            {listItems}
          </List>
        </Segment>
        <AddItem />
    </div>
    )
  }
}

export default ItemList