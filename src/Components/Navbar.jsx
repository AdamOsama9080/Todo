import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
<nav className="navbar navbar-expand-lg bg-transparent text navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Home">TODO Notice</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      {props.userdata ? (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link fs-5" to="/Home">Home</Link>
          </li>
        </ul>
      ) : null}
      <ul className='navbar-nav ms-auto'>
        {props.userdata ? (
          <li className="nav-item">
            <span onClick={props.userlogout} className='nav-link order-first order-lg-last fs-5' style={{ cursor: 'pointer' }}>Logout</span>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/Login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/Register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
}
