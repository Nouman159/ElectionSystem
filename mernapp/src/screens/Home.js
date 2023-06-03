import React from 'react'
import Navbar from '../Components/Navbar'

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center align-items-center h-100'>
                <div>
                    Home page for election system
                </div>
            </div>
        </div>
    )
}
