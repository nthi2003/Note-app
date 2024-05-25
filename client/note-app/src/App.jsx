
import { useState } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/Sign/SignUp'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

// const routes = (
//   <Router>
//     <Routes>
//        <Route path="/dashboard" exact element={<Home/>} />
//        <Route path="/dashboard" exact element={<Login/>} />
//        <Route path="/dashboard" exact element={<SignUp/>} />
//     </Routes>
//   </Router>
// )


const App = () => {
  const [Theme, setTheme] = useState(false);
  const [color, setColor] = useState(false);
  const [icon ,setIcon] = useState(false)
  const [bgSearch , setBgSearch] = useState(false)
  
  const handleTheme = () => {
    setTheme(!Theme);
    setColor(!color);
    setIcon(!icon)
    setBgSearch(!bgSearch)
  };

  return (
   <div className={Theme ? 'bg-dark-mode min-h-screen' : 'bg-white min-h-screen'}>
    <Router>
    <Routes>
       <Route path="/dashboard" exact element={<Home Theme={Theme} color={color} handleTheme={handleTheme} icon={icon} bgSearch={bgSearch}/>} />
       <Route path="/login" exact element={<Login Theme={Theme} color={color} handleTheme={handleTheme} icon={icon} bgSearch={bgSearch} />  } />
       <Route path="/signUp" exact element={<SignUp Theme={Theme} color={color} handleTheme={handleTheme} icon={icon} bgSearch={bgSearch} />} />
    </Routes>
  </Router>
   </div>
  )
}

export default App
