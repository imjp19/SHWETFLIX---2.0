import React, { useState,useEffect} from 'react';
import apirequests from "../apirequests";
import axios from "../axios";
import Row from './Row';


const RowsOnHome = ({mediatype}) =>{

     const [genres,setGenres] = useState([]);
     useEffect (()=>{
       async function fetchData() {
           
           const request = await axios.get(`/genre/${mediatype}` + apirequests.fetchGenreList);
           setGenres(request.data.genres);
           return request;
       }
       fetchData();
    },[genres,mediatype]);

   
    const selectedgenre = `/discover/${mediatype}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=`
       
    return(
          <>
            {
              genres.map((genre,index) => {
                    return(
                      <>
                        <Row title={genre.name + (mediatype === 'movie'?" Movies":" TV Series")} fetchURL={selectedgenre + genre.id} key={genre.id}  mediatype={mediatype}/>
                      </>);
                    })
            }          
          </>
    );
}

export default RowsOnHome;