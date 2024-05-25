

import {Link, useNavigate} from "react-router-dom"
import PasswordIput from '../../components/Input/PasswordIput'
import { useState } from 'react'
import { validateEmail } from '../../utils/helper'
import Navbar from "../../components/Navbar/Navbar"
import axiosInstance from "../../utils/axiosInstance"
const Login = ({ Theme , color , handleTheme, icon, bgSearch }) => {
  const [email, setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [error , setError] = useState(null)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }
    if (password.length < 7) {
      setError("Please enter a password with at least 7 characters");
      return;
    }
    setError("")
    //api login
    try {
        const response = await axiosInstance.post("/login", {
          email : email,
          password : password,
        })
        //handle succeessfull login res
        if(response.data && response.data.accessToken){
             localStorage.setItem("token", response.data.accessToken)
             navigate('/dashboard')
        }
    } catch(error) {
       if(error.response && error.response.data && error.response.data.mes){
         setError(error.response.data.mes)
       }
       else {
        setError("An unexpected error occurred .Please try again")
       }
    }
  }
  return (
    <>
    
      <Navbar  Theme={Theme} color={color} handleTheme={handleTheme} icon={icon} bgSearch={bgSearch}/>
      <div className=' flex items-center justify-center mt-28' >
        <div className  ={`${Theme ? 'bg-dark-mode' : 'bg-white'} w-96 border rounded  px-7  py-10`}>
        <form className={`${Theme ? 'bg-dark-mode' : 'bg-white'}`} onSubmit={handleLogin}>    
           <h4 className={`${color ? 'text-white' : 'text-black'} text-2xl mb-7 `}>Login</h4>
           <input type="text" placeholder='Email' className={`${color ? 'text-white' : 'text-black'} input-box `} value={email} 
           onChange={(e) => setEmail(e.target.value)} />
           
           <PasswordIput color={color} value={password} onChange={(e) => setPassword(e.target.value)}/>
           {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
           <button type='submit' className={`${color ? 'text-white' : 'text-black'} btn-primary`} >
            Login
           </button>
           <p className= {`${color ? 'text-white' : 'text-black'} text-sm text-center mt-4`}>
              Not register yet? {""}
              <Link to="/signUp" className='font-medium text-primary underline'
              
              >
               Create an Account
              
              </Link>
           </p>
        </form>
        </div>
      </div>
    </>
  )
}

export default Login
