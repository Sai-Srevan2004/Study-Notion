import React   from 'react'
import './Common.css'
import { NavLink } from 'react-router-dom'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import {NavbarLinks} from "../../data/navbar-links"
import logo from "../../assets/Logo/Logo-Full-Light.png"


const Nav = () => {

  return (
    <div className='navbar'>
        <div className="logo-div">
           <img src={logo} alt="" />
        </div>
        <div className="middle-nav">
             <ul>
             {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'7px'}}>
                                <p>{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className=''>

                                <div className=''>
                                </div>

                                {/* {
                                    // subLinks.length ? (
                                    //         subLinks.map( (subLink, index) => (
                                    //             <NavLink to={`${subLink.link}`} key={index}>
                                    //                 <p>{subLink.title}</p>
                                    //             </NavLink>
                                    //         ) )
                                    // )
                                     : (<div></div>)
                                } */}

                                </div>


                            </div>

                        ) : (
                            <NavLink style={{textDecoration:'none'}} to={link?.path}>
                                <p >
                                    {link.title}
                                </p>
                                
                            </NavLink>
                        )
                    }
                </li>
             ) )
        }

        </ul>
        </div>
        <div className="login-signup-btn">
              <button>Login</button>
              <button>Sign Up</button>
        </div>
    </div>
  )
}

export default Nav
