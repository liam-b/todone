import Item from './Item.js'

class ItemList extends React.Component {
  constructor() {
    super()
    this.state = {
      'items': []
    }
  }

  componentDidMount() {
    fetch('/api/items/getAll')
      .then((response) => response.json())
      .then((response) => this.setState({
        items: response.items,
      }))
  }

  render() {
    let listItems
    if (this.props.group) {
      listItems = this.state.items.map(item => {
        return (
          <Item content={item.content} id={item.id} key={item.id} />
        )
      })
    }

    // console.log(this.props.group)
    return (
      <ul className='ItemList'>
        {listItems}
      </ul>
    )
  }
}

export default ItemList