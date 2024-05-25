import React from 'react'

const EmptyCard = ({imgSrc , mes}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
        <img src={imgSrc} alt="No notes" className='w-60' />
        <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
            {mes}
        </p>
    </div>
  )
}

export default EmptyCard
