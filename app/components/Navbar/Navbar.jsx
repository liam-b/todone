import { Button, Grid, Segment, Input, Menu } from 'semantic-ui-react'
import React from 'react'
import ReactDOM from 'react-dom'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      'activeItem': 'home'
    }

    this.handleItemClick = (e, {name}) => this.setState({activeItem: name})
  }

  render() {
    const {activeItem} = this.state

    return (
      <Menu secondary className='NavMenu'>
        <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick} />
        <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navbar