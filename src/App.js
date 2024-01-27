// import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate , useNavigate  } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Notfound from './Components/Notfound';
import { useState , useEffect} from 'react';
import Otp from './Components/OTP';


function App() {

  const [userinfo, setuserinfo] = useState(null)
  let navigate = useNavigate()

  function getuserinfo(){
    let userdetails = localStorage.getItem("userdata");
    setuserinfo(JSON.parse(userdetails));
  }

  function Logout(){
    //make user info === null
    setuserinfo(null);
    //delete userdata from localstorage
    localStorage.clear("userdata");
    //navigate to login 
     navigate("/login");
   }

   useEffect(() => {
    if(localStorage.getItem("userdata")){
     getuserinfo();
    }
  }, [])

   function ProtectedRoute(props){
    if(localStorage.getItem("userdata") === null){
      return <Navigate to={"/login"}></Navigate>;
    }else{
      return props.children;
    }
   }

  return (
    <>
    <Navbar userlogout={Logout} userdata={userinfo}/>
    <Routes>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login' element={<Login userdata={getuserinfo}/>}/>
      <Route path='/Home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='*' element={<ProtectedRoute><Notfound/></ProtectedRoute>}></Route>
      <Route path='/OTP' element={<Otp></Otp>}></Route>
      <Route path='/' element={<ProtectedRoute><Login></Login></ProtectedRoute>}></Route>
    </Routes>
    </>
  );
}

export default App;
