/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import ProtectedAuth from '../../../Components/Authentication/ProtectedAuth'
import Spinner from '../../../Components/Loaders/Spinner'
import { useParams } from 'react-router-dom'
import { createBlog, getBlog, resetBlogState, updateBlog } from '../../../Features/Blog/BlogSlice'

const BlogForm = () => {

    const dispatch = useDispatch()
    const { id: updateId } = useParams()

    const fields = {
        title: '',
        description: '',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(fields)
    const [isUpdating, setIsUpdating] = useState(false)

    const { blogs, responseStatus, responseMessage } = useSelector(state => state.blogs)

    const getSingleData = (blogId) => {
        dispatch(getBlog(blogId))
    }

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (data?.title == '' || data?.description == '') {
            alert('All fields are required!')
        } else {
            setIsLoading(true)
            if (isUpdating) {
                const updateData = {
                    data, updateId
                }
                dispatch(updateBlog(updateData))
            } else {
                dispatch(createBlog(data))
            }
        }
    }

    useEffect(()=>{
        if (updateId) {
            setIsUpdating(true)
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
        if(responseStatus == 'success' && responseMessage == 'Blog Added Successfully'){
            setTimeout(() => {
                setIsLoading(false)
                alert(responseMessage)
                setData({
                    title: '',
                    description: '',
                })
                dispatch(resetBlogState())
            }, 500)
        }
        if(responseStatus == 'success' && responseMessage == 'Blog Updated Successfully'){
            setTimeout(() => {
                setIsLoading(false)
                alert(responseMessage)
                dispatch(resetBlogState())
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
                            <h5 className='mt-5 mb-4'>{!isUpdating ? 'Create new Blog' : 'Edit Blog'}</h5>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text"
                                    id='title' 
                                    name='title'
                                    className='form-control mb-3'
                                    placeholder='Enter Title' 
                                    value={data?.title}
                                    onChange={handleInput}
                                />
                                <textarea 
                                    id="description"
                                    name="description"
                                    rows={5} 
                                    className='form-control mb-3'
                                    placeholder='Enter Description' 
                                    value={data?.description}
                                    onChange={handleInput}
                                ></textarea>
                                <button type='submit' className='btn btn-info w-100 mb-4'>{!isUpdating ? 'Create' : 'Update'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogForm