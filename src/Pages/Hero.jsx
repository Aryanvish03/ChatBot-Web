import React from 'react'
import InputBox from '../Components/InputBox'
import SuggestionQuestions from '../Components/SuggestionQuestions'

const Hero = () => {
  return (
    <div className='container mx-auto bg-white h-screen w-screen flex items-center justify-center flex-col gap-10'>
        <h1 className='text-black font-semibold text-5xl'>What can i help with?</h1>
        <InputBox/>
        <SuggestionQuestions/>
    </div>
  )
}

export default Hero