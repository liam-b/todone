class App extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     items: []
  //   }
  // }

  constructor() {
    super()
    this.state = {
      'workspace': '0bbeb67d-7dd1-4c64-a9bb-78f7b851fb6d',
      'items': []
    }
  }

  componentDidMount() {
    fetch('/web/getItems')
      .then((response) => response.json())
      .then((items) => this.setState({
        items: items,
      }))
  }

  render() {
    console.log('rendering', this.state.items)
    return (
      <div className='app'>
        My app
      </div>
    )
  }
}

export default App