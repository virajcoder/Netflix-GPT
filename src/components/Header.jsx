import Netflix_Logo_PMS from "../../src/assets/Netflix_Logo_PMS.png"
import use_avtar from "../../src/assets/use_avtar.png"
import {  signOut } from "firebase/auth";
import { auth } from "../utils/firebase"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {addUser} from "../utils/userSlice"
import {removeUser} from "../utils/userSlice"
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


const Header = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
      // An error happened.
      navigate("/error")
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const {uid, email, displayName, photoURL} = user;
          dispatch(
            addUser(
              {uid: uid, 
                email:email, 
                displayName:displayName, 
                photoURL:photoURL
              }))
           navigate("/browse")
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/")

        }
      });

      // unsubscribe when component unmounts
      return () => unsubscribe();
}, [])

  return (
    <div className=" absolute w-screen flex px-8 py-2 bg-gradient-to-b from-black z-10 justify-between  ">
      <div className="ml-4">
        <img 
          className="w-28 sm:w-44" // Adjusted width for smaller screens
          src={Netflix_Logo_PMS} 
          alt="netflix logo"
        />
      </div>
      <div className="flex gap-4 sm:gap-8 mr-4 p-5"> 
        <select className="bg-black bg-opacity-50 text-white border border-white w-20 sm:w-[110px] text-center"> 
          <option value="">English</option>
          <option value="">Hindi</option>
        </select>
        <div className="flex gap-1 sm:gap-2 mr-1">
        { user ? 
        (
          <img 
          className="w-8 sm:w-18 rounded-lg" // Adjusted width for smaller screens
          src="https://avatars.githubusercontent.com/u/81612600?s=400&u=8df03c92bb2a8cbc3a1c1334fa8a632d5105265e&v=4" 
          alt="user profile"
        />  
        ):(
          <img 
          className="w-13 sm:w-29" // Adjusted width for smaller screens
          src={use_avtar} 
          alt="netflix logo"
        />
        )}
        <button onClick={handleSignOut} className="bg-red-700 p-1 rounded-lg w-20 sm:w-[90px] text-white hover:bg-red-800"> 
          {user ? "Sign Out" : "Sign In"}
        </button>
        </div>
      </div>
    </div>
  );
}

export default Header
