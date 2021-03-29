import React,{useRef,useContext} from 'react';
import { auth ,googleProvider,facebookProvider} from "../firebase";
import db from "../firebase";
import { mywatchlist} from "./MenuListImg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/SignUp.css";

const SignUp = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const {mwl,setmwl} = useContext(mywatchlist);


    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            storeUser(authUser.user);
    
        }).catch( (error) => {
            
            toast.error(`Oops 😮 That's an Error : `+ error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        });
        
    }

    const signin = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            setList(authUser.user);
    
        }).catch( (error) => {
            
            toast.error("Oops 😮 That's an Error : "+ error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        });
    }

    const signInSocially = (Provider) =>{

        if(window.innerWidth < 960)
        {
            auth.signInWithRedirect(Provider).then((authUser)=>{
                storeUser(authUser.user);
                setList(authUser.user);

            }).catch(error => {
                
                toast.error(`Oops 😮 That's an Error : `+ error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            });
        }
        else{
            auth.signInWithPopup(Provider).then((authUser)=>{
                storeUser(authUser.user);
                setList(authUser.user);

            }).catch(error => {
                
                toast.error(`Oops 😮 That's an Error : `+ error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            });
        }
        
    }

    

    const storeUser = (currUser) =>{
       
         const uiduser = db.collection('users').doc(currUser.uid);

         uiduser.get().then((userData) =>
         {console.log(userData);
           if(!userData.exists)
            {uiduser.set({
                uid: currUser.uid,
                email: currUser.email,
                userwatchlist: []
                }).then((user)=>{
                console.log(user);
                }).catch((err)=>{
                console.log(err);
            });
            }
        
         }).catch(error => console.log(error));
            
    }

    
    const setList = (currUser) => {
        db.collection('users').doc(currUser.uid).get().then((userData)=>{
             
           setmwl(userData.data().userwatchlist); console.log(mwl);
             
        }).catch((error) => console.log(error));
    }



    return (
        <div className="signup" data-aos="zoom-in">
           <form >
              <h1>Sign In</h1>
              <input ref={emailRef} placeholder="Email" type="email" className="font_family"/>
              <input ref={passwordRef} placeholder="Password" type="password" className="font_family"/>
              <button type="submit" className="font_family signinbtns" onClick={signin}><span>Sign In</span></button>
              <span className="or"> ---------- OR ---------- </span>
              <button type="submit" className="font_family signinbtns" onClick={(e) => {e.preventDefault();signInSocially(googleProvider);}}><i className="fab fa-google"></i><span>Sign In with Google</span></button>
              <button type="submit" className="font_family signinbtns" onClick={(e) => {e.preventDefault();signInSocially(facebookProvider);}}><i className="fab fa-facebook"></i><span>Sign In with Facebook</span></button>
              <ToastContainer />
              <h4>
                 <span className="graynew">New to SHWETFLIX ? </span>
                 <span className="signup_link" onClick={register}> Sign Up Now.</span>
              </h4>
           </form>
            
        </div>
    )
}

export default SignUp
