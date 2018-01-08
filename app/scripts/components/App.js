import ItemList from './ItemList.js'
import { Button } from 'semantic-ui-react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      'group': '0bbeb67d-7dd1-4c64-a9bb-78f7b851fb6d'
    }
  }

  render() {
    // console.log('rendering', this.state.items)s
    return (
      <div className='App'>
        My app
        <ItemList group={this.state.group}/>
        <Button>Click Here</Button>
      </div>
    )
  }
}

export default App