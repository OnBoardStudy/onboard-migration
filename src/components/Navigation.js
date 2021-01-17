import React from 'react'
import Link from 'gatsby-link'

const Navigation = props => {
  const menu = props.menuItems.filter(item => item.node.type === props.menuType)
  const menuItems = menu[0].node.items

  const localeNavigation = menuItems.map(item => {
    if (item.link.substring(0, 4) === 'http') {
      return (
        <a href={item.link} target="__blank" key={item.id}>
          <button className="button-smol">{item.text}</button>
        </a>
      )
    }

    return (
      <Link to={`/${item.node_locale}/${item.link}/`} key={item.id}>
        <button className="button-smol">{item.text}</button>
      </Link>
    )
  })

  return (
    <div className="header-bottom site-width">
      <div className="logo">
        <Link to={`/${props.lang}/`}>
          <img src={require('../assets/on-board-logo.svg')} alt="onBoard" />
        </Link>
      </div>
      {localeNavigation}
    </div>
  )
}

export default Navigation
