import React,{useState,useEffect} from 'react';
import apirequests from "../apirequests";
import axios from "../axios";
import MovieCard from "./MovieCard";
import MVTV from "./MVTV"
import "../styles/WatchSearch.css";


const SearchMovie = () =>{

    const [searchval, setsearchval] = useState('');
    const [matchedmovies,setmatched] = useState([]);
    const [mediatype,setType] = useState("movie");
    

    useEffect (()=>{
        async function fetchData() {
            const request = await axios.get(`/search/${mediatype}${apirequests.fetchSearch}${searchval}`);
            setmatched(request.data.results);
            return request;
        }
        fetchData();
     },[searchval,matchedmovies,mediatype]);

     
    
    const handleChange = event => {
        setsearchval(event.target.value);
      };

    const handleSubmit = event => {
        setsearchval('');
     
        event.preventDefault();
      };

    return(
        <>
        <header className="searchheader" data-aos="fade-up">
            <form onSubmit={handleSubmit}>
                 <i class="fa fa-search" aria-hidden="true"></i>
                 <input className="searchbox" type="text" placeholder="Search..." name="search" value={searchval} onChange={handleChange}
                     autoComplete="off"
                 /> 
            </form>
        </header>

        <div className="search_mvtv">
           <MVTV mediatype={mediatype} setType={setType}/>
        </div>

        <div className="genres_list">
            {
                matchedmovies.map((movie,index) => {
                  return(  <>
                     {(movie.poster_path) ? 
                            <MovieCard card_link={"/genres/" + movie.genre_ids[0] + `/${mediatype}/${movie.id}`} card_item={movie} key={movie.id} index={index}/>
                        : null }
                        </>
                        );
                     })
            }
        </div>
        </>
    )

}

export default SearchMovie;