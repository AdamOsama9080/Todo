import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

export default function Register() {
  const [user, setUser] = useState({
    FirstName:"",
    LastName:"",
    Phone:0,
    Email:"",
    Password:"",
    Gender:"Other",
    Birthday:"00-00-0000"
  });
  
  const [error400, seterror400] = useState("");
  const [Loading, setLoading] = useState(false);
  let [errorlist, seterrorlist] = useState([]);
  let navigate = useNavigate();

  async function SignUP(e) {
    setLoading(true);
    e.preventDefault();
    let emailValue = document.getElementById("Email").value;
    localStorage.setItem('email', emailValue);
    let showjoiresult = validationformregister();

    if(showjoiresult.error) {
      setLoading(false);
      seterrorlist(showjoiresult.error.details);
    } else {
      try {
        let response = await axios.post(
          "http://testone2023-001-site1.htempurl.com/API%20for%20Notes/signuppp.php",
          JSON.stringify(user),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        if (response.data.message === "Sign up was successful and verification email was sent.") {
          setLoading(false);
          navigate("/OTP");
        }
      } catch (error) {
        if (error.response) {
          setLoading(false);
          seterror400(error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      }
    }
  }

  function UserInfo(e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }

  const validationformregister = () => {
    const schema = Joi.object({
      FirstName: Joi.string().required().min(3).max(15),
      LastName: Joi.string().required().min(3).max(15),
      Birthday: Joi.date().max('now').required(),
      Phone: Joi.string().length(11).required(),
      Password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({'string.pattern.base': 'Password must contain at least one letter and one number'}),
      Gender: Joi.string().valid('Other','Male', 'Female').required(),
      Email: Joi.string().email({ tlds: false }).required(),
    });
    return schema.validate(user, { abortEarly: false });
  };

  return (
    <div className="container mt-3">
      <h1 className=' text-center'>Sign Up</h1>
      {error400 ?
        <div className="alert alert-danger mt-3" role="alert">
          {error400}
        </div> : ""
      }
      {errorlist.map((ele) => (
        <div className='alert alert-danger py-2'>{ele.message}</div>
      ))}
      <form onSubmit={SignUP}>
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label text-white fs-4">First Name</label>
          <input onChange={UserInfo} type="text" className="form-control bg-transparent border-dark text-black fs-5" id="FirstName" name='FirstName' placeholder='Enter First Name...' />
        </div>
        <div className="mb-3">
          <label htmlFor="LastName" className="form-label text-white fs-4">Last Name</label>
          <input onChange={UserInfo} type="text" className="form-control bg-transparent border-dark text-black fs-5" id="LastName" name='LastName' placeholder='Enter Last Name...' />
        </div>
        <div className="mb-3">
          <label htmlFor="Phone" className="form-label text-white fs-4">Phone</label>
          <input onChange={UserInfo} type="tel" className="form-control bg-transparent border-dark text-black fs-5" id="Phone" name='Phone' placeholder='Enter Phone...' />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label text-white fs-4">Email</label>
          <input onChange={UserInfo} type="Email" className="form-control bg-transparent border-dark text-black fs-5" id="Email" name='Email' placeholder='Enter Email...' />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label text-white fs-4">Password</label>
          <input onChange={UserInfo} type="Password" className="form-control bg-transparent border-dark fs-5" id="Password" name='Password' placeholder='Enter Password...' />
        </div>
        <div className="mb-3">
          <label htmlFor="Gender" className="form-label text-white fs-4">Gender</label>
          <select onChange={UserInfo} className="form-select bg-transparent border-dark text-black fs-5" id="Gender" defaultValue="other" name='Gender'>
            <option value="other">Other</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="Birthday" className="form-label text-white fs-4">Birthday</label>
          <input onChange={UserInfo} type="date" className="form-control bg-transparent border-dark fs-5" id="Birthday" name='Birthday' />
        </div>
        <button type="submit" className="btn btn-primary w-100 p-2">
          {Loading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
