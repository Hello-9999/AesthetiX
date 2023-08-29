import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { errortoast, warningtoast } from '../../services/tostify.service'

const SecureRoute = () => {

    const logindata = useSelector((state)=>state.login)
    console.log(logindata)
  return (
    <>
  <div>
    {logindata.Role === 'admin' ? <> <Outlet /> </>:<>{<Navigate to={'/home'} />  }   {warningtoast('🛑 Admin Access Only! 🙌')} </>}
  </div>
    </>
  )
}

export default SecureRoute