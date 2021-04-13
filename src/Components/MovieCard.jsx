import React,{useEffect,useContext} from 'react';
import Skeleton from './Skeleton';
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { mywatchlist } from "./MenuListImg";
import { Link } from 'react-router-dom';

const MovieCard = ({card_link,card_item,index}) => {

    const {mwl,setmwl} = useContext(mywatchlist);
    const user = useSelector(selectUser); 
    const movie = card_item;

    useEffect(()=>{
        db.collection('users').doc(user.uid).update({userwatchlist: mwl}).then( userData => {})
        .catch((err) => console.log(err));
       },[user.uid,mwl])

    const img_baseurl = "https://image.tmdb.org/t/p/original/";

    const handleLoading = (e) =>{
        e.target.classList.remove("load_img");
        e.target.parentNode.firstChild.classList.add("load_img");
    }


    return (
        <div className="genrelink">
            <div data-aos="fade-up"  data-aos-offset="100">
                <Link to={card_link} className="categorymvinfo" onClick={()=>window.scroll(0,0)}>
                    <div >
                        <div className='genre_img'><Skeleton sktype={'sk-moviecard'}/></div>
                        <img className="genre_img load_img" src={`${img_baseurl}${movie.poster_path}`}
                            alt={movie.title || movie.name || movie.original_name}
                            onLoad={handleLoading}
                            />
                    </div>
                    <div className="genre_info large_info">
                        <h3 className="genremovie_title">{movie.title || movie.name || movie.original_name}</h3>
                    <span className="rating">{movie.vote_average} <i className="fas fa-star star" ></i></span>
                    </div>                              
                </Link>
                   {
                     <div className="watchlistbtn" id={`addremovelist${index}`} 
                     
                     onClick={() => {let found=false;mwl.forEach(obj => {if(obj.id === movie.id){found=true;}})
                                                                        
                     if(found !== true){setmwl([...mwl,{...movie,card_link:card_link}]);
                        document.getElementById(`addremovelist${index}`).innerHTML=`<h4>Added to Watchlist Now</h4>`}
                                                          
                    else{ 
                        document.getElementById(`addremovelist${index}`).innerHTML=`<h4>Added Already</h4>`}}}>
                    <h4 ><i className="fa fa-plus" aria-hidden="true"></i>My WatchList</h4> 
                    </div>
                    }
                </div>
        </div>
    )
}

export default MovieCard
