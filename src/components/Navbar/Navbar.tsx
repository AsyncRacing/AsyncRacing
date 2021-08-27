import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <Menu pointing compact position="center">
      <Menu.Item
        header
        fitted="vertically"
        as="h3"
        verticalAlign="middle"
        content="Async Racing"
      ></Menu.Item>
      <Menu.Item as={Link} to="/" content="All Challenges"></Menu.Item>
      <Menu.Item
        as={Link}
        to="/challenges/new"
        content="New Challenges"
      ></Menu.Item>
    </Menu>
  )
}

export { Navbar }
