import { useState, useRef } from "react"
import netflix_background from "../../src/assets/netflix_background.jpg"
import Header from "./Header"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { checkValidData } from "../utils/validate";
import { updateProfile, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase"; 
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import Footer from "./Footer";


const Login = () => {
  const dispatch = useDispatch();
  const[ isSignInForm, setIsSignInForm ]=useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);




  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
 
  // validate the data
  const handleButtonClick =() => {
    // console.log(email.current.value)
    // console.log(password.current.value)
    // console.log(name.current.value)
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm){
      // sign up Logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, 
      photoURL: "https://avatars.githubusercontent.com/u/81612600?v=4"
     
    }).then(() => {
      // Profile updated!
      const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(
                addUser(
                  {uid: uid, 
                    email:email, 
                    displayName:displayName, 
                    photoURL:photoURL
                  }))
    }).catch((error) => {
      setErrorMessage(error.message);
      // console.log(error,"profile ka error")
      // An error occurred
      // ...
    });
    // console.log(user, "signup ka error")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage )
  });
    }
    else{
      // sign in Logic
      signInWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value)
    .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        // console.log(user, "sign in error")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage )
  });
    }
  };


 // togle sign up and sign in
  
  const toggleSignInForm = () => { 
    setIsSignInForm(!isSignInForm);
  };


  return (
    <div >
      <Header />
     
      <div className="w-screen absolute">
        <img src={netflix_background} alt="netflix logo" 
        className="w-screen h-screen object-cover" />
        
      </div>
      <form onSubmit={(e) => e.preventDefault()}
      className="w-full md:w-3/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 m-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 w-full bg-gray-700 bg-opacity-75"
          />
        )}
        <input
        ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-3 w-full bg-gray-700 bg-opacity-75"
          pattern="[a-zA-Z0-9._%+-]+@gmail.com"
          title="Please enter a valid Gmail address"
        />
        <TextField
        inputRef={password}
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          variant="outlined"
          className="p-3 my-3 w-full bg-gray-700 bg-opacity-75 text-white"
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
        <p className="text-red-500  text-sm py-2">{errorMessage}</p>
        <button className="p-3 my-3 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && (
          <h1 className="text-xl py-2 text-center">OR</h1>
        )}
        {isSignInForm && (
          <button className="text-bold p-3 my-3 bg-slate-700 hover:bg-slate-800 bg-opacity-60 w-full rounded-lg">
            Use a sign-in code
          </button>
        )}
        <div className="p-3 my-3 flex justify-between items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 text-sm">Remember me</span>
          </label>
          {isSignInForm && (
            <span className="text-sm">Forget password?</span>
          )}
        </div>
        <h1 className="text-sm py-2 text-center">
          {isSignInForm && <span>New to Netflix?</span>}
          <span onClick={toggleSignInForm} className="m-2 text-lg text-bold cursor-pointer">
            {isSignInForm ? "Sign Up Now" : "Already Registered? Sign In Now"}
          </span>
        </h1>
       
      </form>
      <Footer />
    </div>
  );
  
}

export default Login
