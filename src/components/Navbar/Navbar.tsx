import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <Menu pointing compact position="center">
      <Menu.Item
        header
        fitted="vertically"
        as={Link}
        to="/"
        verticalAlign="middle"
        content="Async Racing"
      >
        <h3>AsyncRacing</h3>
      </Menu.Item>

      <Menu.Item as={Link} to="/" content="All Challenges" />

      <Menu.Item as={Link} to="/challenges/new" content="New Challenge" />

      <Menu.Item as={Link} to="/instructions" content="Instructions" />
    </Menu>
  )
}

export { Navbar }
