import React from 'react';
import "../styles/ContentLogin.css";
import {LoginStatics} from "./MenuListImg";
import FreqAsk from "./FreqAsk";

const ContentLogin = ({setSignInScreen}) => {

    const {tv1,tv2,boxshot,mobile,gif,vid1,vid2} = LoginStatics;

    return (
        <div className="rows_container" >
        
        <hr/>

        <section  className="enjoy inforow" data-aos="fade-left">
        <div className="text-content">
            <h1>Enjoy On your TV.</h1>
            <h2>Watch on smart TVs, PlayStation,Xbox, Chromecast, Apple TV, Blu-ray players and more.</h2>
        </div>
        <div className="img-content">
            <img className="limg" src={tv1} alt="tvimg1"/>
            <div className="tv1">
               <img className="gif1" src={vid1} alt="downloadgif"/>
            </div>
        </div>
        </section>

        <hr/>

        <section className="enjoy inforow" data-aos="fade-right">
         <div className="mobile">
            <img className="limg" src={mobile} alt="mobileimg"/>
          <div className="box">
            <div>
                <img src={boxshot} alt="boxshot"/>
            </div>
            <div>
                <h2>Stranger Things</h2>
                <p>Added to Watchlist...</p>
            </div>
            <div>
                <img className="gif"  src={gif} alt="downloadgif"/>
            </div>
           </div>
         </div>
           <div className="text-content save">
             <h1>Save your movies and shows  to watch easily.</h1>
             <h2>Save your favourites easily and watch easily from your watchlist.</h2>
           </div>
        </section>

        <hr/>

        <section className="enjoy inforow" data-aos="fade-left">
          <div className="text-content">
            <h1>Watch Everywhere.</h1>
            <h2>Stream unlimited movies and TV  shows on your phone, tablet, laptop,  and TV.</h2>
          </div>
          <div className="img-content">
            <img className="limg" src={tv2} alt="tv2"/>
            <div className="tv2">
                <img className="gif2" src={vid2} alt="downloadgif"/>
            </div>
          </div>
        </section>

        <hr/>
        <FreqAsk setSignInScreen={setSignInScreen}/>
        </div>
    )
}

export default ContentLogin;
