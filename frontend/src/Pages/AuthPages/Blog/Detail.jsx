/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import ProtectedAuth from '../../../Components/Authentication/ProtectedAuth'
import Spinner from '../../../Components/Loaders/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlog } from '../../../Features/Blog/BlogSlice'


const BlogDetail = () => {

    const dispatch = useDispatch()
    const { id: updateId } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState()

    const { blogs, responseStatus, responseMessage } = useSelector(state => state.blogs)

    const getSingleData = (blogId) => {
        dispatch(getBlog(blogId))
    }

    useEffect(()=>{
        if (updateId) {
            getSingleData(updateId)
        }
    },[updateId])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get Single'){
            setData(blogs?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            alert(responseMessage)
        }
    },[blogs, responseStatus, responseMessage])

    return (
        <>
            <ProtectedAuth />
            { isLoading && <Spinner /> }
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='shadow-lg rounded-4 p-3 mt-4'>
                            <Navbar shouldCreateBlogDisplay={false} />
                            <h5 className='mt-5 mb-4'>Blog Detail</h5>
                            <div className='shadow-lg rounded-4 p-3 mt-3 text-secondary'>
                                <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3'>
                                    <div style={{ fontSize: '15px' }} className='fw-bold'>{data?.title}</div>
                                </div>
                                <div>{data?.description}</div>
                                <div className='d-flex flex-wrap justify-content-between mt-3' style={{ fontSize: '12px' }}>
                                    <div>Posted by: {data?.userId?.name}</div>
                                    <div className='float-end'>
                                        Posted on: {new Date(data?.createdAt).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetail