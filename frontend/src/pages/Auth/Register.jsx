import React from 'react'
import { useState } from 'react'
import AutoForm  from '../../Components/Form/AutoForm';

export default function Register() {
  const [fields , setFields ] = useState([
          {name:'username', label:'аты-жөні', type:'text', placeholder:'Қолданушынің аты-жөні', required:true},
          {name:'email', label:'электрондық поштасы', type:'email', placeholder:'Қолданушың электрондық поштасы', required:true},
          {name:'password', label:'Құпия сөз', type:'password', placeholder:'Қолданушың құпия сөзі', required:true},
          {name:'confirmPassword', label:'Құпия сөзді қайталау', type:'password', placeholder:'Қолданушың құпия сөзін ернәнді қалдыру', required:true},]);

  const handleOnSuccess = async (response) => {
    console.log(response);
  };

  const handleOnError = async (error) => {
    console.log(error);
  };
  return (
    <div className='flex flex-col items-center justify-center h-full w-full bg-white'>
      <AutoForm
        title='Тіркелу'
        className='flex flex-col items-center justify-center w-full max-w-md bg-[#4453A6] rounded-4xl p-8 shadow-md'
        action='/api/v1/register'
        onError={handleOnError}
        onSuccess={handleOnSuccess}
        fields={fields}
        submitText='Тыркелу'
        submitAndReset={true}
      />
    </div>
  )
}
