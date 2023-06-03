import React from 'react'
import Navbar from '../Components/Navbar'
import Profile from '../Components/Profile'

export default function profile() {
  return (
    <div>
      <Navbar />
      {(localStorage.getItem("name")) ?
        <div className='mt-5'>
          <Profile name={localStorage.name} constituency={localStorage.constituency} email={localStorage.email} cnic={localStorage.cnic} />
        </div>
        : "profile loading"}
    </div>
  )
}
