import { List, Segment, Button, Icon, Modal, Header, Input, Form } from 'semantic-ui-react'
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

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
      $.get('/api/items/todos/parent/' + group, (response) => {
        this.setState({
          items: response.todos
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
      <div className='ItemListSegment'>
        <Segment inverted>
          <List divided inverted relaxed='very' id='ItemList'>
            {listItems}
          </List>
        </Segment>
        <AddItemPopup />
    </div>
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

class AddItemPopup extends React.Component {
  constructor() {
    super()
    this.state = {
      'modalOpen': false
    }

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleOpen = () => this.setState({ 'modalOpen': true })
    this.handleClose = () => this.setState({ 'modalOpen': false })
  }

  // /api/items/todos

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
              <Form.Input name='content' fluid placeholder='New task...'/>
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

export default ItemList