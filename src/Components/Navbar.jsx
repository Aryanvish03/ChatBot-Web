import React from 'react'

const Navbar = () => {
  return (
    <div className=' container mx-auto w-screen p-2 flex flex-row items-center justify-between sticky top-0 bg-white'>
        <h1 className='text-black font-semibold text-xl'>Neural Infused Chat-Bot</h1>
        <div className="button flex gap-5 items-center justify-center">
            <button className='bg-black text-white rounded-md p-2'>Login</button>
            <button clsssName='bg-black text-white rounded-md p-2'>Signup</button>
        </div>
    </div>
  )
}

export default Navbar