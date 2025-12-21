import react from 'react';
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';
import { FaLinkedinIn } from "react-icons/fa";

function Navbar() {
 const [sticky, setSticky] = useState(false);
 const { user,logout } = useContext(AuthContext);
  console.log("User in Navbar:", user);
  // const [currentUser, setCurrentUser] = useState(user);

  // useEffect(() => {
  //   if (!loading && user) {
  //     setCurrentUser(user); // Set user only after loading is complete and user exists
  //   }
  // }, [loading, user]);

 useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return (
        <>
        <div className={`navbar fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out dark:bg-white dark:text-black 
        ${sticky 
          ? "bg-gray-900 text-white  shadow-lg " 
          : "bg-white text-black shadow-sm"
        }`}>
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-bold ">
          <Link to="/" className="text-black">Home</Link>
          <Link to="/turf" className="text-black">Turfs</Link>
          <Link to="/booking" className="text-black">My Bookings</Link>
        {user && user.role === "owner"?(<Link to="/myturf" className="text-black ">My Turf</Link>):(<></>)}
        {user && (user.role === "owner" || user.role === "user") && (
     <Link to="/list" className="text-black">List Turf</Link>
  )}
      </ul>
    </div>
    <a className="font-bold cursor-pointer text-2xl  md:ml-6">PlayGrid</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/" className="text-black">Home</Link></li>
      <li><Link to="/turf" className="text-black">Turfs</Link></li>
      <li><Link to="/booking" className="text-black">My Bookings</Link></li>
      {user && user.role=="owner"?(<li><Link to="/myturf" className="text-black">My Turf</Link></li>):(<></>)}
      {user && (user.role === "owner" || user.role === "user") && (
        <li><Link to="/list" className="text-black">List Turf</Link></li>
      )}
    </ul>
  </div>
  <div className="navbar-end">
    {user ? (
              <button
              onClick={() => {
                logout();} 
              }
                className="btn btn-error bg-green-800 text-white hover:bg-green-900">Logout</button>
          ) : (
           <div>
      <button className="btn btn-error bg-black text-white"
     onClick={()=>document.getElementById('my_modal_3').showModal()}
    >Login</button>
    <Login/>
    </div>
          )}
  </div>

  
          
</div>
        </>
    )
}

export default Navbar;