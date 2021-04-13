
import React, { useState,useEffect} from 'react';
import apirequests from "../apirequests";
import axios from "../axios";
import "../styles/Genres.css";
import MVTV from "./MVTV";
import { Link } from 'react-router-dom';
import {MVGenresImages,TVGenresImages} from "./MenuListImg"
 

const Genres = () =>{

     const [genres,setGenres] = useState([]);
     const [mediatype,setType] = useState("movie");

     useEffect(()=>{
       async function fetchData() {
           const request = await axios.get(`/genre/${mediatype}`+ apirequests.fetchGenreList);
           setGenres(request.data.genres);
           return request;
       }
       fetchData();
    },[genres.forEach,mediatype]);

    return(
          <>
          <MVTV mediatype={mediatype} setType={setType}/>
            <div className="genres_list ">
                {
                    genres.map((genre,index) => {
                        return(
                            <>
                            <Link to={`/genres/${genre.id}/${mediatype}`} className="genrelink" key={genre.id} >
                            <div data-aos="fade-up" data-aos-offset="100" >
                            <div >
                                <img className="genre_img" src={(mediatype === 'movie'? MVGenresImages[index].img : TVGenresImages[index].img)} alt={genre.name}/>
                            </div>
                            <div className="genre_info" >
                                 <h3 className="genre_title">{genre.name}</h3>
                            </div>
                            </div>
                            </Link>
                            </>);
                        })
                    }           
            </div>
            </>);
    }

export default Genres;