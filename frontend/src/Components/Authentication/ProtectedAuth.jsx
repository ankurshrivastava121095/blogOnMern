/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProtectedAuth = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get("converselyLoggedInUserToken");
        if (!token) {
            navigate('/')
        }
    },[])

    return (
        <></>
    )
}

export default ProtectedAuth