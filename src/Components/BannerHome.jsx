import React, { useState, useEffect} from "react";
import axios from "../axios";
import requests from "../apirequests";
import { Link } from 'react-router-dom';
import Loading from "./Loading";
import MVTV from "./MVTV";
import "../styles/Banner.css";

const Banner = ({mediatype,setType}) =>{
    const [movie,setMovie] = useState([]);
    const [loading,setLoading] = useState(true);
  
    useEffect(() =>{

        async function fetchData(){
            const request = await axios.get(`discover/${mediatype}` + requests.fetchShwetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ]);
            setLoading(false);
            return request;
        }
        fetchData();
    },[mediatype]);

    const truncate = (str,n) =>{
        return str?.length > n ? str.substr(0, n-1) + "..." : str ; 
    }

    if(loading)
       return <Loading/>
    
    return(
        <header className="banner"
          style = {{
              backgroundSize:"cover",
              backgroundImage:`linear-gradient(to right, rgba(0,0,0,0.8),transparent) , url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              
          }}>
           <div className="banner_contents" data-aos="fade-up">
               <h1 className="banner_title">{movie.title || movie.name || movie.original_name}</h1>
               <div className="banner_buttons">
                <Link to={`/genres/80/${mediatype}/${movie.id}`}>
                <button className="banner_button font_family"><i className="fas fa-play"></i>Let's Watch</button>
                </Link>
                
                <Link to="/mylist">
                <button className="banner_button font_family"><i className="fas fa-list"></i> My WatchList</button>
                </Link>
               </div>

               <h1 className="banner_description">{ truncate(movie?.overview,150)  }</h1>
           </div>
           <div className="banner--fadeBottom">
             <MVTV mediatype={mediatype} setType={setType}/>
           </div>
          
        </header>
    );
}

export default Banner;