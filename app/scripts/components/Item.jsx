import { List, Button } from 'semantic-ui-react'

class Item extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <List.Item id={this.props.id} className='Item'>
        <Button icon='edit' floated='right' color='grey' size='small' compact labelPosition='right' content='Edit'/>

        <List.Content>
          <List.Header>{this.props.content}</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

export default Item