import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/AuthPages/Dashboard'
import BlogForm from './Pages/AuthPages/Blog/Form'
import BlogDetail from './Pages/AuthPages/Blog/Detail'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected Routes */}
        <Route path='/conversely/dashboard' element={<Dashboard />} />
        <Route path='/conversely/create-blog' element={<BlogForm />} />
        <Route path='/conversely/blog-edit/:id' element={<BlogForm />} />
        <Route path='/conversely/blog-detail/:id' element={<BlogDetail />} />
      </Routes>
    </>
  )
}

export default App
