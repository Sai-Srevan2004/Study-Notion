import React from 'react'
import { NavbarLinks } from '../../../data/navbar-links'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-14 text-white border-b-[0.5px] border-b-richblack-600'>
            <div className='w-11/12 mx-auto flex items-center justify-between pt-2 max-w-maxContent'>
                <div className=''>StudyNotion</div>

                <nav className='flex items-center justify-center'>
                    <ul className='flex items-center justify-center gap-9'>
                        {
                            NavbarLinks.map((ele, i) => {
                                return (ele.title!=="Catalog"?<NavLink to={ele.path}><li key={i}>{ele.title}</li></NavLink>:("Catalog"))
                            })
                        }
                    </ul>
                </nav>

                <div className='flex items-center justify-center gap-3 border-'>
                    <button className='border border-richblack-600 bg-richblack-700 rounded-md px-3 py-2  text-richblack-200'>Login</button>
                    <button className='border border-richblack-600 bg-richblack-700 rounded-md px-3 py-2 text-richblack-200'>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
