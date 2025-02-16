import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({value,active,linkto}) => {
  return (
     <Link to={linkto}>
     <div className={`${active?"bg-yellow-50":"bg-richblack-700"} px-5 py-3 rounded-[5px]`}>
         {value}
    </div>
     </Link>
  )
}

export default Button
