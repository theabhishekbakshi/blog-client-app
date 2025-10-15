
import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
      <SignIn signUpUrl='/register'/>
    </div>
  )
}

export default LoginPage
