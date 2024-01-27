import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';

export default function Login(props) {
  const [error400, seterror400] = useState('');
  const [Loaing, setLoaing] = useState(false);
  const [User, setUser] = useState({
    Email: '',
    Password: ''
  });
  const [errorlist, seterrorlist] = useState([]);
  
  let navigate = useNavigate();

  function getUser(e) {
    let newUser = { ...User };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }

  const validationformLogin = () => {
    const schema = Joi.object({
      Password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .required()
        .messages({
          'string.pattern.base': 'Password must contain at least one letter and one number'
        }),
      Email: Joi.string().email({ tlds: false }).required()
    });
    return schema.validate(User, { abortEarly: false });
  };

  async function sendData(e) {
    setLoaing(true);
    e.preventDefault();
    let showjoiresult = validationformLogin();

    if (showjoiresult.error) {
      setLoaing(false);
      seterrorlist(showjoiresult.error.details);
    } else {
      try {
        let response = await axios.post(
          "http://testone2023-001-site1.htempurl.com/API%20for%20Notes/userinfo.php",
          JSON.stringify(User)
        );
        if (response.data.Code === 200) {
          setLoaing(false);
          localStorage.setItem("userdata", JSON.stringify(response.data.data));
          props.userdata();
          navigate("/Home");
        }
      } catch (error) {
        if (error.response) {
          setLoaing(false);
          seterror400(error.response.data.message);
        } else if (error.request) {
          setLoaing(false);
          console.log(error.request);
        } else {
          setLoaing(false);
          console.log('Error', error.message);
        }
      } finally {
        setLoaing(false);
      }
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Log In</h1>
      {error400 ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error400}
        </div>
      ) : (
        ""
      )}
      {errorlist.map((ele) => (
        <div className="alert alert-danger py-2">{ele.message}</div>
      ))}
      {error400.length > 0 ? (
        <div className="alert alert-danger" role="alert">
          <strong>Warning!</strong> {error400}
        </div>
      ) : (
        ""
      )}
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white fs-4">
            Email
          </label>
          <input
            onChange={getUser}
            type="email"
            className="form-control bg-transparent border-dark text-black fs-5"
            id="email"
            name="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-white fs-4">
            Password
          </label>
          <input
            onChange={getUser}
            type="password"
            className="form-control bg-transparent border-dark fs-5"
            id="password"
            name="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {Loaing === true ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
