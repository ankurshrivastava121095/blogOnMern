/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import ProtectedAuth from '../../Components/Authentication/ProtectedAuth'
import Spinner from '../../Components/Loaders/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, getBlogs } from '../../Features/Blog/BlogSlice'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const Dashboard = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [authUser, setAuthUser] = useState()

    const { blogs, responseStatus, responseMessage } = useSelector(state => state.blogs)

    const [currentPage, setCurrentPage] = useState(1)
    const blogsPerPage = 3

    const handleBlogDelete = (blogId) => {
        setIsLoading(true)
        dispatch(deleteBlog(blogId))
    }

    useEffect(()=>{
        dispatch(getBlogs())

        const token = Cookies.get("converselyLoggedInUserToken");
        const decodedData = jwtDecode(token);
        setAuthUser(decodedData)
    },[])

    useEffect(()=>{
        if(responseStatus === 'success' && responseMessage === 'Get All'){
            setData(blogs?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
        if(responseStatus === 'success' && responseMessage === 'Blog Deleted Successfully'){
            dispatch(getBlogs())
        }
        if(responseStatus === 'rejected' && responseMessage){
            setIsLoading(false)
            alert(responseMessage)
        }
    },[blogs, responseStatus, responseMessage])

    const indexOfLastBlog = currentPage * blogsPerPage
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
    const currentBlogs = data?.slice(indexOfFirstBlog, indexOfLastBlog)

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / blogsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <ProtectedAuth />
            { isLoading && <Spinner /> }
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='shadow-lg rounded-4 p-3 mt-4'>
                            <Navbar />
                            <h5 className='mt-5 mb-4 text-secondary'>Recent Blogs</h5>
                            {
                                currentBlogs?.length > 0 ?
                                    currentBlogs.map((val, key) => (
                                        <div key={key} className='shadow-lg rounded-4 p-3 mt-3 text-secondary'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3'>
                                                <div style={{ fontSize: '15px' }} className='fw-bold'>{val?.title}</div>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <i role='button' className="fa-solid fa-eye text-primary" onClick={() => navigate(`/conversely/blog-detail/${val?._id}`)}></i>
                                                    {
                                                        authUser?.id === val?.userId?._id &&
                                                        <>
                                                            <i role='button' className="fa-solid fa-file-pen text-warning" onClick={() => navigate(`/conversely/blog-edit/${val?._id}`)}></i>
                                                            <i role='button' className="fa-solid fa-trash-can text-danger" onClick={() => handleBlogDelete(val?._id)}></i>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div>{val?.description}</div>
                                            <div className='d-flex flex-wrap justify-content-between mt-3' style={{ fontSize: '12px' }}>
                                                <div>Posted by: {val?.userId?.name}</div>
                                                <div className='float-end'>
                                                    Posted on: {new Date(val?.createdAt).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                :
                                <center><div className='text-secondary'>No Blog</div></center>
                            }
                            <div className='d-flex align-items-center justify-content-center gap-3 mt-4'>
                                <button 
                                    type='button' 
                                    className='btn btn-info rounded-5' 
                                    onClick={prevPage} 
                                    disabled={currentPage === 1}
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                </button>
                                <button 
                                    type='button' 
                                    className='btn btn-info rounded-5' 
                                    onClick={nextPage} 
                                    disabled={currentPage === Math.ceil(data.length / blogsPerPage)}
                                >
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard