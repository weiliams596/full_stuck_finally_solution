import React from 'react';

export default function AnimationDom() {
    
  return (
    <div className='flex w-full h-full justify-center items-center absolute z-80 bg-white'>
      <div className='absolute top-0 left-0 bg-black opacity-25 w-full h-full z-81'></div>
      <div className='flex relative justify-center items-center w-[80%] border-[20px] border-tertiary-blue h-[150px] rounded-[80px] z-83'>
        <div className='animate-spin border-[5px] w-[100px] h-[100px] rounded-[50%] absolute top-[5px] left-[15px] border-tertiary-blue border-l-quaternary-blue'></div>
        <p className='text-5xl flex justify-center items-center w-full h-full ml-[20px]'>Щақыруда<span className='animate-pulse'>.</span><span className='animate-pulse delay-500'>.</span><span className='animate-pulse delay-1000'>.</span></p>
      </div>
    </div>
  )
}
