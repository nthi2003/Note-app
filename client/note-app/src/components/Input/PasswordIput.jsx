import React, { useState } from 'react'
import {FaRegEye , FaRegEyeSlash } from 'react-icons/fa6'

const PasswordIput = ({ value , onChange , placeholder , color}) => {
    const [isShowPassword , setIsShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)

    }
  return (
    <div>
      <div className='flex items-center bg-transparent border-[1.5px] px-5  rounded mb-4 outline-none' >
        <input 
         value={value}
         onChange={onChange}
         type={isShowPassword ? "text" : "password" }
         placeholder={placeholder || "Password" }
         className= {`${color ? 'text-white' : 'text-black'} w-full text-sm bg-transparent py-3 mr-3 rounded outline-none`}
         
        />
        {isShowPassword ? (
            <FaRegEye 
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => toggleShowPassword()}
            />
        ):
        (
            <FaRegEyeSlash 
             size={22}
             className="text-slate-400 cursor-pointer"
             onClick={() => toggleShowPassword()}
            />
        )
        }
      </div>
    </div>
  )
}

export default PasswordIput
