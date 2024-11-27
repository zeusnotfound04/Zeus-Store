import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'  // Import Navigate from 'react-router-dom'

export const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // Check if user is authenticated and is an admin
  if (!userInfo || !userInfo.isAdmin) {
    // Redirect to login page if not authenticated or not an admin
    return <Navigate to="/login" replace />
  }

  // If user is an admin, render child routes
  return <Outlet />
}
