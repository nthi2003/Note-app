
import { useState } from 'react';

import PasswordIput from '../../components/Input/PasswordIput'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Navbar from '../../components/Navbar/Navbar';
import axiosInstance from '../../utils/axiosInstance';


const SignUp = ({ Theme, color, handleTheme, icon, bgSearch }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if ( !name) {
      setError('Please enter name')
      return
    }
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
     //api SignUp
     try {
      const response = await axiosInstance
      .post("/create-account", {
        fullName: name,
        email : email,
        password : password,
      })
      //handle succeessfull registration res
      if(response.data && response.data.error){
          setError(response.data.mes)
          return
      } if(response.data && response.data.accessToken){
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
      <Navbar Theme={Theme} color={color} handleTheme={handleTheme} icon={icon} bgSearch = {bgSearch} />
      <div className=' flex items-center justify-center mt-28' >
        <div className={`${Theme ? 'bg-dark-mode' : 'bg-white'} w-96 border rounded  px-7  py-10`}>
          <form className={`${Theme ? 'bg-dark-mode' : 'bg-white'}`} onSubmit={handleSignUp}>
            <h4 className={`${color ? 'text-white' : 'text-black'} text-2xl mb-7 `}>SignUp</h4>
            <input
              type='text'
              placeholder='Name'
              className={`${color ? 'text-white' : 'text-black'} input-box `}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Email'
              className={`${color ? 'text-white' : 'text-black'} input-box `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordIput color={color} value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className='text-red-500'>{error}</p>
            <button type='submit' className={`${color ? 'text-white' : 'text-black'} btn-primary`} >
              Create Account
            </button>
            <p className={`${color ? 'text-white' : 'text-black'} text-sm text-center mt-4`}>
              Already have an account? {""}
              <Link to="/login" className='font-medium text-primary underline'

              >
                Login

              </Link>
            </p>
          </form>

        </div>
      </div>
    </>
  )
}

export default SignUp
