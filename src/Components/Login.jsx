import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import SignUp from "./SignUp";
import ContentLogin from "./ContentLogin";
import "../styles/Navbar.css";
import "../styles/Login.css";

const Login = () => {

    const [signin_screen,setSignInScreen] = useState(false);

    return (
        <>
        <div className="login">
            <div className="login_bg" >
                <div className="login_gradient" >
                    <div className="login_top" >
                       <Link to='/' className='navbar-logo'>
                       <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210328/a57d2dda7c72c1372b6bcf0e53f2a13f.png" alt="netflix-font" border="0" className="navbar-img"/></a>
                       </Link>
                    <button className="font_family signin-btn" onClick={() => setSignInScreen(true)}>Sign In</button>
                    </div>
                    { signin_screen ? (<SignUp/>)
                          :
                    <div className="login_mainbody"  data-aos="fade-up" data-aos-offset="0">
                        
                        <h1 className="loginscreen_text">
                          Unlimited films and TV shows with Trailers, Dates, Cast and more.</h1>
                        <h2>Find your favourites anytime</h2>
                        <h3>Ready to watch 🤩? Enter your Email to create or restart your membership.</h3>
                        <div className="login_forminput">
                        <form>
                            <input type="email" placeholder="Email Address" className="font_family"/>
                            <button className="getstarted_btn font_family" onClick={() => setSignInScreen(true)}>GET STARTED</button>
                        </form>
                        </div>
                          
                    </div> 
                    }   
                </div>
            </div>
            
        </div>
        
        <ContentLogin setSignInScreen={setSignInScreen}/>
        </>
    )
}

export default Login;
