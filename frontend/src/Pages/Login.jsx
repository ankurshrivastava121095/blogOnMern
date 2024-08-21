/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../Components/Loaders/Spinner'
import { resetAuthState, userLogin } from '../Features/Auth/AuthSlice'
import GuestAuth from '../Components/Authentication/GuestAuth'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fields = {
        email: '',
        password: '',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(fields)

    const { auth, loading, success, message, error } = useSelector(state => state.auth)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (data?.email == '' || data?.password == '') {
            alert('All fields are required!')
        } else {
            setIsLoading(true)
            dispatch(userLogin(data))
        }
    }

    useEffect(()=>{
        if (success && message == 'Logged In') {
            setData({
                email: '',
                password: '',
            })
            setTimeout(() => {
                setIsLoading(false)
                navigate('/conversely/dashboard')
            }, 1000);
        }
        if (!success && message != '' && message != null) {
            setData({
                email: '',
                password: '',
            })
            setIsLoading(false)
            alert(message)
            dispatch(resetAuthState())
        }
    },[auth, loading, success, message, error])

    return (
        <>
            <GuestAuth />
            { isLoading && <Spinner /> }
            <div style={{ minHeight: '100vh' }} className='d-flex align-items-center justify-content-center'>
                <div className='shadow-lg rounded-4 py-3 px-5'>
                    <img src="/logo.png" className='w-100 mb-3' style={{ maxWidth: '250px' }} alt="/logo.png" />
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            id='email' 
                            name='email'
                            className='form-control mb-3'
                            placeholder='Enter Email' 
                            value={data?.email}
                            onChange={handleInput}
                        />
                        <input 
                            type="password"
                            id='password' 
                            name='password'
                            className='form-control mb-3'
                            placeholder='Enter Password' 
                            value={data?.password}
                            onChange={handleInput}
                        />
                        <button type='submit' className='btn btn-info w-100 mb-4'>Login</button>
                    </form>
                    <Link to='/register' className='text-decoration-none'>Create new account</Link>
                </div>
            </div>
        </>
    )
}

export default Login