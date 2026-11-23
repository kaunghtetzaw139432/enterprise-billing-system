import React from 'react'
import Menubar from './components/Menubar/Menubar'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Explore from './pages/Explore/Explore'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUser from './pages/ManageUsers/ManageUser'
import ManageItems from './pages/ManageItems/ManageItems'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import OrderHistory from './components/OrderHistory/OrderHistory'
import NotFound from './components/NotFound/NotFound'

export default function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}
      <Toaster />
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/explore' element={<Explore />}></Route>
          <Route path='/category' element={<ManageCategory />}></Route>
          <Route path='/users' element={<ManageUser />}></Route>
          <Route path='/items' element={<ManageItems />}></Route>
          <Route path='/orders' element={<OrderHistory />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
