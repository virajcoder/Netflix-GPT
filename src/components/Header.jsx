import Netflix_Logo_PMS from "../../src/assets/Netflix_Logo_PMS.png"


const Header = () => {
  return (
    <div className="flex z-9999 px-8 py-2 bg-gradient-to-b from-black justify-between items-center ">
    <div className="ml-20 ">
     <img 
     className="w-44"
     src={Netflix_Logo_PMS} 
      alt="netflix logo"/>
      
    </div>
    <div className="flex gap-8 mr-20  w-auto">
    <select className="bg-black bg-opacity-50 text-white border border-white w-[110px] text-center ">
<option value="">English</option>
<option value="">Hindi</option>

    </select>
    <button className="bg-red-700 p-1 rounded-lg w-[90px] text-white hover:bg-red-800">Sign In</button>
    </div>
    </div>
  )
}

export default Header
