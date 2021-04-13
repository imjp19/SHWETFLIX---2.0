import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Skeleton from "./Skeleton";
import { Link } from 'react-router-dom';
import "../styles/Row.css";

const img_baseurl = "https://image.tmdb.org/t/p/original/";

const Row = ({title,fetchURL,mediatype,isLargeRow}) =>{

    const [movies,setMovies] = useState([]);
    
    useEffect(()=>{
       async function fetchData() {
           const request = await axios.get(fetchURL);
           
           setMovies(request.data.results);
           return request;
       }
       fetchData();
     },[fetchURL]);

     const handleLoading = (e) =>{
        e.target.classList.remove("load_img");
         e.target.parentNode.firstChild.classList.add("load_img");
     }
    
    return(
        <div className={'row'} data-aos="fade-up" data-aos-offset="100">
            {(movies) ? <h2 className="category_title">{title}</h2> : null}
                <div className={`row_posters`} >
                     {
                        movies.map( movie => (
                             ((isLargeRow && movie.poster_path) || movie.backdrop_path) ?
                         <Link to={"/genres/" + movie.genre_ids[0] + `/${mediatype}/${movie.id}`} className={(isLargeRow) ? 'home_movie lgrowmv' : "home_movie"}  key={movie.id}>
                          
                           <div><Skeleton sktype={(isLargeRow) ? 'sk-lgrow' : 'sk-row'}/></div>
                           <img 
                             key={movie.id}
                             className={(isLargeRow) ? 'row_posterLarge load_img' : "row_poster load_img"}
                             src={`${img_baseurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                             onLoad={handleLoading}
                             /> 
                         
                          <div className="homemvinfo">
                          <h5 className="homemvname">{movie.name ||  movie.title  || movie.original_title }</h5>
                          <h5 className="homemvrating">{movie.vote_average}<i className="fas fa-star star" ></i></h5>
                          </div>
                         </Link>

                         : null))
                            
                     }
                </div>
        </div>
    )
}

export default Row;