import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const isUserlogin = localStorage.getItem("token")
  return (
    <>
        {
            isUserlogin ? <Outlet />:<Navigate to={"/login"} />
        }
    </>
  )
}

export default PrivateRoutes