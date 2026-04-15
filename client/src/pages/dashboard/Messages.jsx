import React from 'react'
import LeftSide from '../../components/messages/LeftSide'
import RightSide from '../../components/messages/RightSide'

const Messages = () => {
  return (
    <>
     <div className='font-bold mb-4 text-3xl'>Messages</div>
     <div className='flex flex-wrap md:flex-nowrap gap-5'>
       <div className='md:w-1/3 w-full '>
        <LeftSide/>
       </div>
       <div className="md:w-2/3 w-full">
       <RightSide/>
       </div>
     </div>
    </>
  
  )
}

export default Messages