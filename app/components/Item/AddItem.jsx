import { Segment, Button, Icon, Modal, Header, Input, Form } from 'semantic-ui-react'
import React from 'react'

class AddItem extends React.Component {
  constructor() {
    super()
    this.state = {
      'modalOpen': false
    }

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleOpen = () => this.setState({ 'modalOpen': true })
    this.handleClose = () => this.setState({ 'modalOpen': false })
  }

  handleSubmit(event) {
    this.handleClose()
    event.preventDefault()
    let data = $('#addItem').serializeArray().map(function(x){this[x.name] = x.value; return this;}.bind({}))[0]
    console.log(data)
  }

  render() {
    return (
      <Modal trigger={<Button icon size='small' labelPosition='right' floated='right' id='addItemModal' onClick={this.handleOpen}>
        Add
        <Icon name='add'/>
      </Button>} closeIcon basic size='small' open={this.state.modalOpen} onClose={this.handleClose}>

        <Header icon='add' content='Add new todo'/>
        <Modal.Content>
          <Segment>
            <Form method='post' id='addItem' onSubmit={this.handleSubmit}>
              <Form.Input name='content' fluid placeholder='New task ...'/>
            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button icon inverted onClick={this.handleSubmit} size='small' labelPosition='right' floated='right' color='green' type='submit' form='addItem'>
            Add
            <Icon name='add'/>
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AddItem