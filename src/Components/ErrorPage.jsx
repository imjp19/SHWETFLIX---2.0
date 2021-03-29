import React from "react";
import {Link} from "react-router-dom";
import "../styles/Error.css"


const ErrorPage = () =>{

    return(
        <>
           <h1 className="errorstyles fourzerofour">404 </h1>
           <h2 className="errorstyles ErrorPage">Page Not Found - Error</h2>
           <h4 className="errorstyles ErrorMsg">OOPS 😮 The Selected URL is not present</h4>
           <Link to="/" className="goto_link" >
               <button className="signout-btn font_family">Go to Home</button>
           </Link>

        </>
    );
}

export default ErrorPage;