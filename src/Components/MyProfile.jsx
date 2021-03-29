import React from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase"
import avatar from "../images/shwetflix-avatar.jpg";
import SubPlans from "./SubPlans";
import "../styles/MyProfile.css"

const MyProfile = () => {
    const user = useSelector(selectUser); 

    return (
        <div className="myprofile" data-aos="fade-up">
            <div className="profile_mainbody">
                <h1>Check Your Profile</h1>
                <div className="profile_info">
                   <img src={avatar} alt="your avatar" className="profileavatar"/>
                   <div className="profile_details">
                       <h2>{user.email}</h2>
                       <div className="subplans">
                           <SubPlans/>
                           <button className="signout-btn font_family" onClick= {() => auth.signOut()}>
                               Sign Out
                           </button>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
