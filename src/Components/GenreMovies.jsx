import React, { useState,useEffect} from 'react';
import apirequests from "../apirequests";
import axios from "../axios";
import "../styles/Genres.css";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";


const GenreMovies = () =>{

     const {genreid,mediatype} = useParams();
     const [genreMovies,setGenreMovies] = useState([]);
     const [loading,setLoading] = useState(true);
    

    useEffect(()=>{

        async function fetchMVTV() {
           
            const request = await axios.get(`/discover/${mediatype}${apirequests.fetchGenreMovies}${genreid}`);
            setGenreMovies(request.data.results);
            setLoading(false)
            return request;
        
        }
        fetchMVTV();

    },[genreid,mediatype])

    if(loading) return <Loading/>

    return(
          <>
                        
            <div className="genres_list genmv_list">    
                {
                genreMovies.map((movie,index) => {
                    return(
                        <>
                        {(movie.poster_path) ? 
                                <MovieCard card_link={`/genres/${genreid}/${mediatype}/${movie.id}`} mediatype={mediatype} card_item={movie} key={movie.id} index={index}/>
                                : null }
                            </>);
                        })
                       }
                    </div>     
                  </>);
            }

export default GenreMovies;