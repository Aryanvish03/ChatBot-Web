import React from 'react'
import Hero from './Pages/Hero'
import Navbar from './Components/Navbar'

const App = () => {
  return (
   <>
   <div className='w-screen h-screen container mx-auto'>
   <Navbar/>
   <Hero/>
   </div>
   </>
  )
}

export default App