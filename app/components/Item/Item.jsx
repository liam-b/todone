import { List, Button } from 'semantic-ui-react'
import React from 'react'

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

export default Item