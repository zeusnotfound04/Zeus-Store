import React from 'react'
import { useSelector ,Navigate} from 'react-redux'
import { Outlet } from 'react-router'

export const AdminRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
    
  return userInfo && userInfo.isAdmin ?(
    <Outlet/>
  ) : (
    <Navigate to="login" replace/>
  )
}
