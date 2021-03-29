import React from 'react';
import "../styles/Navbar.css"

const Footer = () =>{

    return(
        <>
           <div className="footer">
               <footer className="bottom">
                   <div className="cont">
                      <h4 className="p" style={{color: 'whitesmoke'}}>Made&nbsp;With&nbsp;<i className="fa fa-heart" style={{color: '#db202c'}}></i>&nbsp; By <span>Shwet Khatri</span> </h4>
                      <h4><a href="https://www.linkedin.com/in/shwet-khatri-4ab216196/" target="blank"><i className="fab fa-linkedin-in"></i></a>
                          <a href="https://github.com/ShwetKhatri2001" target="blank"><i className="fab fa-github"></i></a>
                      </h4>
                      </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;