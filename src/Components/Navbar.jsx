import React, { useState , useContext, useEffect } from 'react';
import avatar from "../images/shwetflix-avatar.jpg";
import { Link, useHistory} from 'react-router-dom';
import '../styles/Navbar.css';
import {verticle_nav} from "./MenuListImg";

const Navbar = () => {

  const {isverticle,setnav} = useContext(verticle_nav);
  const history = useHistory();
  const [show, handleShow] = useState(false);
  const showNavOnScroll = () => {
    if( window.scrollY > 100)
        handleShow(true);
    else 
        handleShow(false);
  }

  useEffect (()=>{
      window.addEventListener("scroll",showNavOnScroll);
      return () => window.removeEventListener("scroll", showNavOnScroll);
  },[]);
  

  const handleClick = () => setnav(!isverticle);
  const closeMobileMenu = () => setnav(false);


  return (
        
      <nav className={`navbar ${(show || isverticle) && "navbar_black"}`}>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210328/a57d2dda7c72c1372b6bcf0e53f2a13f.png" alt="netflix-font" border="0" className="navbar-img"/></a>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={isverticle ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={isverticle ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/genres'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Genres
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/search'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Search
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/mylist'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              My WatchList
            </Link>
          </li>    
        </ul>
        
        <img src={avatar} alt="your avatar" className="avatar-logo"
          onClick={() => history.push("/myprofile")}
        />
      </nav>
    
  );
}

export default Navbar;

