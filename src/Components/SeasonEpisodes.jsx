import React,{ useState, useEffect} from 'react';
import axios from "../axios";
import { Link, useParams } from 'react-router-dom';
import apirequests from "../apirequests";
import "../styles/SeasonEpisodes.css";

const SeasonEpisodes = () => {

    const { genreid,mediatype,movieid,seasonno } = useParams();
    const [seasondata,setSeasonDetail] = useState([]);

    const img_baseurl = "https://image.tmdb.org/t/p/original/";

    useEffect(()=>{
         const fetchSeason = async () => {
            const seasoninfo = await axios.get(`/${mediatype}/${movieid}/season/${seasonno}${apirequests.fetchmoviedetails}`);
            setSeasonDetail(seasoninfo.data);
            return seasoninfo;
        }
        
        fetchSeason();
    },[seasonno,mediatype,movieid]);

  let episodes = seasondata.episodes;let episodeList;
  
  if(episodes)
   {
    episodeList = episodes.map((ep, i) => {
    return (
      (ep.still_path) ?
      <>
       <div className="episode_outer" data-aos={(i%2===0) ? `flip-left` : `flip-right` } data-aos-offset="100" data-aos-duration="2000">
          <img 
            key={ep.id}
            className='epi_image'
            src={img_baseurl + ep.still_path} alt={ep.name}/>
        
        <div className="epi_info">
          <div classNam="epi_namedate">
            <h4 className="epi_header"><p className="homemvrating ">EP{ep.episode_number}</p>
                <p className="epiname ">{ep.name}</p>
                <p className="epidate">{String(ep.air_date).split("-").reverse().join("-")}</p>
            </h4>

          </div>
        <div className="homemvrating epirate">{ep.vote_average}  
             <i className="fas fa-star epi_star" ></i>
        </div>
            <h5 className="epi_overview">{ep.overview}</h5>
            
        </div>
       </div>
       </>  
      : null
     );
   });
  }

    return (
        <>
        <header className="season_banner ">
             <div className="banner_contents" data-aos="fade-up" >
               <h1 className="banner_title">{seasondata.name}</h1>
               <div className="banner_buttons">
                
                <Link to={`/genres/${genreid}/${mediatype}/${movieid}`}>
                 <button className="banner_button"><i className="fas fa-angle-double-left "></i>  Back to SeasonList</button>
                </Link>
                <h1 className="banner_description">{seasondata?.overview}</h1>
               </div>
             </div>
             <div className="simgdiv" data-aos="zoom-in" >
                 <img src={`${img_baseurl}${seasondata.poster_path}`} alt={seasondata.name} className="seasonimg"/>
             </div>
        </header>
        
        {(episodeList !== null && episodeList !== undefined &&  episodeList.length !== 0) ?<>
            <h2 className="eptitle">Episodes </h2>
            <h4><p className="homemvrating ml">Total : {episodes.length}</p></h4>
            <div className="genres_list smt_del">{episodeList}</div></> : null}
        </>
    );
}

export default SeasonEpisodes;
