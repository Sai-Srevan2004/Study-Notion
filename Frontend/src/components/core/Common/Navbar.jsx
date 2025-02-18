import React from 'react'
import { NavbarLinks } from '../../../data/navbar-links'
import { NavLink ,Link} from 'react-router-dom'
import Logo from '../../../assets/Logo/Logo-Full-Light.png'

const Navbar = () => {
    return (
        <div className='h-14 text-white border-b-[0.5px] border-b-richblack-600'>
            <div className='w-11/12 mx-auto flex items-center justify-between pt-2 max-w-maxContent'>
                <div className=''><Link to='/'><img src={Logo} alt="logo" /></Link></div>

                <nav className='flex items-center justify-center'>
                    <ul className='flex items-center justify-center gap-9'>
                        {
                            NavbarLinks.map((ele, i) => {
                                return (ele.title!=="Catalog"?<NavLink to={ele.path}><li key={i}>{ele.title}</li></NavLink>:(<div className='relative group'>
                                    {ele.title}
                                    <div className='invisible absolute w-[300px] border border-white top-8 -translate-x-16 bg-white rounded-md group-hover:visible text-black'>
                                        <p>python</p>
                                        <p>web dev</p>

                                        <div className='w-[20px] h-[20px] bg-white absolute top-0 left-20 -translate-y-2 rotate-45'></div>
                                    </div>
                                </div>))
                            })
                        }
                    </ul>
                </nav>

                <div className='flex items-center justify-center gap-3 border-'>
                    <Link to='/login'><button className='border border-richblack-600 bg-richblack-700 rounded-md px-3 py-2  text-richblack-200'>Login</button>
                    </Link>
                    <Link to='/signup'><button className='border border-richblack-600 bg-richblack-700 rounded-md px-3 py-2 text-richblack-200'>Signup</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
