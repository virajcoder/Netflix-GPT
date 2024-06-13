import Netflix_Logo_PM from "../../src/assets/Netflix_Logo_PM.png"
import use_avtar from "../../src/assets/use_avtar.png"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase"; 
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import { useEffect } from "react";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


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


const handleGptSearchClick = () => {
  // Toggle GPT Search
  dispatch(toggleGptSearchView());
};

const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
};

  return (
    <div className=" absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
     
        <img 
          className="w-28 sm:w-44 mx-auto md:mx-0" 
          src={Netflix_Logo_PM} 
          alt="netflix logo"
        />
      
      <div className="flex gap-4 sm:gap-8 mr-4 p-5"> 
        { showGptSearch && <select 
        className="bg-black bg-opacity-50 text-white border border-white w-20 sm:w-[110px] text-center"
        onChange={handleLanguageChange}> 
        {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                  </option>
                  ))}
        </select>}
        <div className="flex gap-1 sm:gap-2 mr-1">
        {user && <button 
              onClick={handleGptSearchClick}
              className="bg-purple-700  rounded-lg  text-white hover:bg-purple-800 mr-4 px-4">
               {showGptSearch ? "Homepage" : "GPT Search"}
          </button>}

        { user ? 
        (
          <img 
          className="w-8 sm:w-18 rounded-lg"
          src="https://avatars.githubusercontent.com/u/81612600?s=400&u=8df03c92bb2a8cbc3a1c1334fa8a632d5105265e&v=4" 
          alt="user profile"
        />  
        ):(
          <img 
          className="w-13 sm:w-29" 
          src={use_avtar} 
          alt="netflix logo"
        />
        )}
        <button 
           onClick={handleSignOut} 
           className="bg-red-700 p-1 rounded-lg w-20 sm:w-[90px] text-white hover:bg-red-800"> 
          {user ? "Sign Out" : "Sign In"}
        </button>
        </div>
      </div>
    </div>
  );
}

export default Header
