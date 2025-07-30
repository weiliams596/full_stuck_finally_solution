import React from 'react';

export default function AutoFooter({children}) {
  return (
    <footer className='absolute bottom-0 left-0 w-full h-[160px] overflow-y-scroll hide-scrollbar shadow-md h-max-full w-max-full'>
      <div className='flex flex-col h-full w-full'>
        {children}
      </div>
    </footer>
  )
}
