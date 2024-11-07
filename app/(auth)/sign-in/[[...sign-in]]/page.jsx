//sign in page
import { SignIn } from '@clerk/nextjs'
import React from 'react'

//[[...sign-in]] is a catch all route
//it will match any route that starts with /sign-in
//this is useful for nested routes

const page = () => {
  return (
    <SignIn />
  )
}

export default page