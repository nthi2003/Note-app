import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ Theme, color, handleTheme, icon , onLogout , userInfo }) => {
    
  return (
    userInfo && (
      <div className='ml-2 flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
      {getInitials(userInfo.fullName)}
      </div>
      <p className={`${color ? 'text-white' : 'text-black'} text-sm font-medium`}>{userInfo.fullName}</p>
      <button className={`${color ? 'text-white' : 'text-black'} text-sm  underline `} onClick={onLogout}>
           Logout
      </button>
    </div>
    )
  )
}

export default ProfileInfo
