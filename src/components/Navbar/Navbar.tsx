import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <Menu pointing compact position="center">
      <Menu.Item header as={Link} to="/" content="Async Racing"></Menu.Item>
      <Menu.Item
        as={Link}
        to="/challenges/new"
        content="New Challenges"
      ></Menu.Item>
    </Menu>
  )
}

export { Navbar }
