import React from 'react'
import './HomePageComponent.css'
import { Link } from 'react-router-dom'

const Button = ({children,linkto,active}) => {
  return (
    <Link to={linkto}>
    <button className={`button1 ${active?"button1-yellow":"button1-black"}`}>
      {children}
    </button>
    </Link>
  )
}

export default Button
