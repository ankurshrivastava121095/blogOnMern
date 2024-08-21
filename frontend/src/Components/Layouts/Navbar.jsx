/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import Spinner from '../Loaders/Spinner';
import { resetAuthState } from '../../Features/Auth/AuthSlice';

const Navbar = ({ shouldCreateBlogDisplay = true }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = () => {
        setIsLoading(true)
        Cookies.remove('converselyLoggedInUserToken')
        dispatch(resetAuthState())
        navigate('/')
    }

    return (
        <>
            { isLoading && <Spinner /> }
            <div className='d-flex align-items-center justify-content-between'>
                <Link to='/conversely/dashboard'>
                    <img src="/logo.png" style={{ width: '100px' }} alt="/logo.png" />
                </Link>
                <div className='d-flex align-items-center gap-3'>
                    { shouldCreateBlogDisplay && <button type='button' className='btn btn-info' onClick={()=>navigate('/conversely/create-blog')}><i className="fa-solid fa-pen-to-square"></i> Create Blog</button>}
                    <button type='button' className='btn btn-info' onClick={handleLogout}><i className="fa-solid fa-power-off"></i></button>
                </div>
            </div>
        </>
    )
}

export default Navbar