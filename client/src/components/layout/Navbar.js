import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-3 text-white'>
      <div className='container'>
        <a href='#!' className='navbar-brand'>
          BlogPost
        </a>
        <button
          className='navbar-toggler'
          data-target='#collapse'
          data-toggle='collapse'
          type='button'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='collapse'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-link'>
                About
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a href='#!' className='nav-link'>
                {" "}
              </a>
            </li>
            <li className='nav-item'>
              <Link to='/addpost' className='nav-link'>
                Create Post
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
