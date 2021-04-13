import React, { useState, useEffect,useContext } from 'react';
import { Link,useParams } from "react-router-dom";
import apirequests from "../apirequests";
import db from "../firebase";
import YouTube from "react-youtube";
import "../styles/Movieinfo.css"
import "../styles/Banner.css"
import "../styles/Genres.css";
import axios from "../axios";
import MovieCard from "./MovieCard";
import Skeleton from './Skeleton';
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {mywatchlist,verticle_nav} from "./MenuListImg";


const Movieinfo = () => {

  const {genreid,mediatype,movieid } = useParams();
  const {isverticle} = useContext(verticle_nav);

  let genres = [];let seasons=[];
  const [mvdetail, setMVDetail] = useState([]);
  const [videolinkkey, setVideo] = useState("");
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const {mwl,setmwl} = useContext(mywatchlist);
  const user = useSelector(selectUser); 
  

  useEffect(() => {
    const fetchAPI = async () => {
       const movieinfo = await axios.get(`/${mediatype}/${movieid}${apirequests.fetchmoviedetails}`);
       setMVDetail(movieinfo.data);
      const videourl = await axios.get(`/${mediatype}/${movieid}/videos${apirequests.fetchmoviedetails}`);
      if(videourl.data.results.length > 0)
         {setVideo(videourl.data.results[0].key);}
      const castsinfo = await axios.get(`/${mediatype}/${movieid}/credits${apirequests.fetchmoviedetails}`);
       setCasts(castsinfo.data.cast);
      const similarmv = await axios.get(`/${mediatype}/${movieid}/similar${apirequests.fetchmoviedetails}`);
      setSimilarMovies(similarmv.data.results);
      
      return{movieinfo,videourl,castsinfo,similarmv};
    };

    fetchAPI();
  }, [movieid, videolinkkey,mvdetail,mediatype]);


  genres = mvdetail.genres;
  seasons = mvdetail.seasons;

  useEffect(()=>{
    db.collection('users').doc(user.uid).update({userwatchlist: mwl}).then( userData => console.log(userData))
    .catch( err => console.log(err));
   },[user.uid,mwl])

  const img_baseurl = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "540px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleLoading = (e) =>{
    e.target.classList.remove("load_img");
    e.target.parentNode.firstChild.classList.add("load_img");
  } 

  let genresList;
  if (genres) {
    genresList = genres.map((genre, i) => {
      return (
        <li className="list-inline-item" key={i} data-aos="zoom-in" data-aos-offset="100" >
         <Link to={`/genres/${genreid}/${mediatype}`}>
          <button type="button" className="genrebtn font_family">
            {genre.name}
          </button>
          </Link>
        </li>
      );
    });
  }

  const hhmmform = (given_seconds) =>{

    let dateObj = new Date(given_seconds * 1000); 
    let hours = dateObj.getUTCHours(); 
    let minutes = dateObj.getUTCMinutes(); 
    let seconds = dateObj.getSeconds(); 
  
    let timeString = hours.toString().padStart(2, '0') 
                + ':' + minutes.toString().padStart(2, '0') 
                + ':' + seconds.toString().padStart(2, '0'); 

    return timeString;

  }

  
  let seasonList;
  
  if(seasons)
  {
    seasonList = seasons.map((s, i) => {
    return (
      (s.poster_path) ?
        <Link to={`/genres/${genreid}/${mediatype}/${mvdetail.id}/season/${s.season_number}`} className='home_movie lgrowmv' key={s.id}>
          <div data-aos="fade-up" data-aos-offset="100" >
           <div><Skeleton sktype={'sk-lgrow'}/></div>
            <img 
              key={s.id}
              className='row_posterLarge load_img'
              src={img_baseurl + s.poster_path} alt={s.name}
                onLoad={handleLoading}
              />
              <div className="homemvinfo">
                  <h5 className="homemvname">{s.name}</h5>
                  <h5 className="homemvrating">S{s.season_number}</h5>
              </div>
              </div>
          </Link>
      : null
    );
  });
  }

  const castList = casts.map((c, i) => {

    return (
      (c.profile_path) ?
      <div className="castperson" key={i} >
        <div data-aos="fade-up" data-aos-offset="100" >
        <div className='castimg'><Skeleton sktype={'sk-cast'}/></div>
        <img
          className="castimg load_img"
          src={img_baseurl + c.profile_path}
          alt={c.name}
          onLoad={handleLoading}/>
        <p className="castname">{c.name || c.original_name}</p>
        <p style={{ color: "#999" }}>
          {c.character}
        </p>
       </div>
      </div>
      : null
    );
  });
  
 
  const similarMovieList = similarMovies.map((movie, index) => {

      return(
            <>
            {(movie.poster_path) ? 
                  <MovieCard card_link={`/genres/${genreid}/${mediatype}/${movie.id}`} mediatype={mediatype} card_item={movie} key={movie.id} index={index}/>
                  : null }
            </>
            );
  });

                             
  return (
      <>
      <header className="movie_banner "
          style = {{
              backgroundSize:"cover",
              backgroundImage:`linear-gradient(to right, rgba(0,0,0,0.8),transparent) , url("${img_baseurl}${mvdetail?.backdrop_path || mvdetail.poster_path}")`,
              
          }}>
           <div className="banner_contents " data-aos="fade-up" >
               <h1 className="banner_title">{mvdetail.name || mvdetail.original_name || mvdetail.title  }</h1>
               <div className="banner_buttons">
               <div className="mvrating">{mvdetail.vote_average} <i className="fas fa-star mvstar" ></i></div>
                <button className="banner_button font_family" id={`addremovelist`} 
                    onClick={() => {let found=false;mwl.forEach(obj => {if(obj.id === mvdetail.id){found=true;}})
                                                                        
                    if(found !== true){setmwl([...mwl,{...mvdetail,card_link:`/genres/${genreid}/${mediatype}/${movieid}`}]);
                        document.getElementById(`addremovelist`).innerHTML=`<h4>Added to Watchlist Now</h4>`}
                                                                                                                  
                    else{ 
                        document.getElementById(`addremovelist`).innerHTML=`<h4>Added Already</h4>`}}}>
                <h4 >Add to My WatchList</h4> 
                </button>
               </div>

               <h1 className="banner_description small_overview">{mvdetail?.overview }</h1>
           </div>
           <div className="movie_banner--fadeBottom"/>
        </header>

        { (videolinkkey !== "" ) ?
        <>
        <div className={!isverticle ? "ytvideo_wrapper" : "ytvideo_wrapper ytwrapperdisplay"}>
           <div className='ytvideo'><Loading/></div>
          <div onLoad={handleLoading}><YouTube videoId={videolinkkey} opts={opts} className="ytvideo" /></div>
        </div>
        </>
        : 
        null
        }    
        {(genresList !== null && genresList !== undefined && genresList.length !== 0) ? <>
        <h3 className="genrep">GENRES</h3>
        <ul className="genresList list-inline">{genresList}</ul></>
        : null
        }
        <div className="info font_family">
        {((mvdetail.release_date || mvdetail.first_air_date) !== null && 
           (mvdetail.release_date || mvdetail.first_air_date) !== "" && (mvdetail.release_date || mvdetail.first_air_date) !== undefined) ?
        <div className="infotype" data-aos="fade-left" data-aos-offset="100">
          <p className="infotype_key">RELEASE DATE</p>
          <p className="infotype_value">{String(mvdetail.release_date || mvdetail.first_air_date).split("-").reverse().join("-")}</p>
        </div>
        : null}
        {(mvdetail.runtime !== 0 && mvdetail.runtime !== "" && mvdetail.runtime !== undefined) ? 
        <div className="infotype" data-aos="fade-left" data-aos-offset="100" >
          <p className="infotype_key">MOVIE RUN TIME</p>
          <p className="infotype_value">{hhmmform(mvdetail.runtime * 60)}</p>
        </div> 
         : null}
         {(mvdetail.tagline !== null && mvdetail.tagline !== "") ? 
        <div className="infotype" data-aos="fade-left" data-aos-offset="100">
          <p className="infotype_key">TAGLINE</p>
          <p className="infotype_value">{mvdetail.tagline}</p>
        </div>
        : null}
        {(mvdetail.homepage !== null && mvdetail.homepage !== "") ?
        <div className="infotype info4" data-aos="fade-left" data-aos-offset="100">
          <p className="infotype_key">HOMEPAGE</p>
          <a target="shwet" href={mvdetail.homepage} className="infotype_value">{mvdetail.homepage}</a>
        </div>
        : null}
      </div>

      {(mediatype === "tv" && seasonList !== null && seasonList !== undefined && seasonList.length !== 0 ) ?<>
      <h3 className="genrep ">SEASONS</h3>
      <div className="row font_family"><div className="row_posters">{seasonList}</div></div> </>: null}
      {(castList !== null && castList !== undefined && castList.length !== 0 ) ?<>
      <h3 className="genrep ">CAST</h3>
      <div className="castList font_family">{castList}</div> </>: null}
      {(similarMovieList !== null && similarMovieList !== undefined &&  similarMovieList.length !== 0) ?<>
      <h3 className="genrep">{(mediatype ==="movie") ? `SIMILAR MOVIES` : `SIMILAR TV Series`}</h3>
      <div className="genres_list mt_del">{similarMovieList}</div></> : null}
      
    </>
  );

}

export default Movieinfo;