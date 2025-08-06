import React from 'react';
import AutoListShower from '../../Components/InformationList/AutoListShower';

export default function ShowAllInactive() {
  const template = {
    builder:function(obj,key){
      return <div className='flex justify-around items-center w-full'>
        
      </div>
    }
  };
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <AutoListShower 
        className='w-full h-full'

      />
    </div>
  )
}
