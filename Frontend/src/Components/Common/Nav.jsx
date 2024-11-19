import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io"

// Import the CSS file
import './Common.css'

const subLinks = [
    {
        title: "python",
        link: "/catalog/python"
    },
    {
        title: "web dev",
        link: "/catalog/web-development"
    },
];

const Navbar = () => {
    console.log("Printing base url: ", "http://localhost:9000");
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    const [ssubLinks, setSsubLinks] = useState([]);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:", result);
            setSsubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                {/* Image */}
                <Link to="/">
                    <img src={logo} alt="Logo" className='navbar-logo' />
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className='navbar-nav'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='navbar-dropdown'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDropdownCircle />
                                                <div className='dropdown-menu'>
                                                    {
                                                        subLinks.length ? (
                                                            subLinks.map((subLink, index) => (
                                                                <Link to={subLink.link} key={index}>
                                                                    <p>{subLink.title}</p>
                                                                </Link>
                                                            ))
                                                        ) : (<div></div>)
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className='navbar-auth'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='cart-icon'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span className='cart-count'>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
