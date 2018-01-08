class Item extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <li className='Item' id={this.props.id}>
        {this.props.content}
      </li>
    )
  }
}

export default Item