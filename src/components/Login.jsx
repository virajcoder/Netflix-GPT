import { useState } from "react"
import netflix_background from "../../src/assets/netflix_background.jpg"
import Header from "./Header"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

 

const Login = () => {


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const[ isSignInForm, setIsSignInForm ]=useState(true);
  const toggleSignInForm = () => { 
    setIsSignInForm(!isSignInForm);
  };


  return (
    <div>

      <Header/>

      <diV  
         className="absolute top-0 z-[-9999] "
      >
          <img 
              src={ netflix_background} 
              alt="netflix logo"
          />
      </diV>

      <form 
           className=" w-3/12 relative p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white rounded-lg"
      >
         <h1 
            className="font-bold text-3xl py-4 m-2"
         >
            {isSignInForm ?"Sign In" : "Sign Up"}
         </h1>
        {!isSignInForm && <input 
            type="text" 
            placeholder="Full Name" 
            className="p-4 my-4 w-full bg-gray-700 bg-opacity-75" 
        />}
        <input 
            type="text" 
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-700 bg-opacity-75" 
            pattern="[a-zA-Z0-9._%+-]+@gmail.com" 
            title="Please enter a valid Gmail address"
        />
        <TextField
      type={showPassword ? 'text' : 'password'}
      label="Password"
      placeholder="Password"
      variant="outlined"
      className="p-4 my-4 w-full bg-gray-700 bg-opacity-75 text-white"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
        
        <button 
           className="p-2 my-2 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ?"Sign In" : "Sign Up"}
        </button>
        {isSignInForm && <h1 
            className=" text-xl py-2 text-center"
         >
            OR
         </h1>}
         { isSignInForm && <button 
           className="text-bold p-2  my-2  bg-slate-700 hover:bg-slate-800 bg-opacity-60 w-full rounded-lg"
        >Use a sign-in code</button>}

<div className="p-2 my-2 flex justify-between items-center">
  <label className="flex items-center">
    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"/>
    <span className="ml-2 text-sm">Remember me</span>
  </label>
  {isSignInForm &&<span className="text-sm">Forget password?</span>}
</div>
<h1 
            className=" text-sm py-2 text-center "
         >
           { isSignInForm && <span>New to Netflix?</span>}<span onClick={toggleSignInForm} className=" m-2 text-lg text-bold cursor-pointer">{isSignInForm ?"Sign Up Now" : "Already Registered? Sign In Now"}</span>
         </h1>
         <p className=" text-xs p-2 m-2">This page is protected by Google reCAPTCHA to ensure you are not a bot. <span className="text-sky-600 cursor-pointer">Learn more.</span></p>
      </form>
    </div>
  )
}

export default Login
