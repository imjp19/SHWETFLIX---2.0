import React, { useEffect,useContext} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import {Link} from "react-router-dom";
import { mywatchlist} from "./MenuListImg";
import "../styles/WatchSearch.css"

const Mywatchlist = () => {

    const user = useSelector(selectUser); 
    const {mwl,setmwl} = useContext(mywatchlist);

   useEffect(()=>{

    localStorage.setItem("localwatchlist",JSON.stringify(mwl));

    db.collection('users').doc(user.uid).update({userwatchlist: mwl}).then( userData => console.log(userData))
    .catch((err) => console.log(err));
   },[user.uid,mwl])


    const img_baseurl = "https://image.tmdb.org/t/p/original/";
    return(
        <>
           {
             (mwl.length === 0 ) ? <><h2 className="emptylist1">Your WatchList is Empty 😌 </h2><h2 className="emptylist2"> Add Some Exciting Movies and TV Series 😉</h2></>
             :
            <div className="genres_list genmv_list">
                             {
                                 mwl.map((movie) => {
                                     return(
                                     
                                     <div className="genrelink"  key={movie.id}>
                                     {(movie.poster_path) ? 
                                        <>
                                        <div data-aos="fade-up">
                                     <Link to={movie.card_link} className="categorymvinfo">
                                     
                                     <div className="genre_li">
                                         <img className="genre_img" src={`${img_baseurl}${movie.poster_path}`}
                                         alt={movie.title || movie.name || movie.original_name}/>
                                     </div>
                                     <div className="genre_info large_info">
                                         <h3 className="genremovie_title">{movie.title || movie.name || movie.original_name}</h3>
                                         <span className="rating">{movie.vote_average} <i class="fas fa-star star" ></i></span>
                                     </div>
                                     
                                     </Link>
                                     <div className="watchlistbtn" onClick={()=> {setmwl((prevValue) => {
                                                                              return prevValue.filter((obj) => {
                                                                                       return obj.id !== movie.id;
                                                                                                 });
                                                                                                      }); }}>
                                         <h4><i className="fa fa-minus" aria-hidden="true"></i>My WatchList</h4>
                                     </div>
                                     </div>
                                     </>
                                     : null }
                                     
                                     </div>);
                                 })
                             }
                         
                         </div>
                    }
            </>
    );
}

export default Mywatchlist;