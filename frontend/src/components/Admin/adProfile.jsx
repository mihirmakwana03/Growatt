import React from 'react'
import { useSelector } from 'react-redux'

const adProfile = () => {
    const { user } = useSelector((state) => state.user)
    return (
        <div className='p-3 max-w-lg mx-auto bg-white shadow-md rounded-lg'>
            <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
            <form action="" className='flex flex-col items-center justify-center gap-5'>
                <img src="" alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                <input id='username' type="text" placeholder='username' className='border p-3 rounded-lg ' />
                <input id='email' type="email" placeholder='email' className='border p-3 rounded-lg ' />
                <input id='password' type="password" placeholder='password' className='border p-3 rounded-lg ' />
                <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between gap-5 mt-5'>
                <span className='text-red-700 cursor-pointer '>Delete Account</span>
                <span className='text-red-700 cursor-pointer '>Sign Out</span>
            </div>
        </div>
    )
}

export default adProfile
