import React,{useState, useEffect} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Genres from "./Components/Genres";
import GenreMovies from "./Components/GenreMovies";
import Movieinfo from "./Components/Movieinfo";
import SeasonEpisodes from "./Components/SeasonEpisodes";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Mywatchlist from "./Components/Mywatchlist";
import MyProfile from "./Components/MyProfile"
import {mywatchlist,verticle_nav} from "./Components/MenuListImg";
 import SearchMovie from "./Components/SearchMovie";
 import ErrorPage from "./Components/ErrorPage";
 import Footer from "./Components/Footer";


const App = () =>{

  const [mwl,setmwl] = useState(localStorage.getItem("localwatchlist") ? JSON.parse(localStorage.getItem("localwatchlist")) : []);
  const [isverticle,setnav] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
        if ( userAuth ){
          console.log(userAuth); // Recently logged in user

          dispatch(
              login({
                 uid : userAuth.uid,
                 email: userAuth.email
                 })
            );
        }else{
           // No user logged in OR LogOut
           dispatch(logout());
        }

    });
    return unsubscribe; 
  },[dispatch])


  return(
    <>
    
     <div className="App">
     <mywatchlist.Provider value={{mwl,setmwl}}>
      { (!user) ?<Login/>:
      <verticle_nav.Provider value={{isverticle,setnav}}>
      <Navbar/>
      <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/SHWETFLIX---Movie-Web" component={Home}/>
       <Route exact path="/genres" component={Genres}/>
       <Route exact path="/genres/:genreid/:mediatype" component={GenreMovies} />
       <Route exact path="/genres/:genreid/:mediatype/:movieid" component={Movieinfo}/>
       <Route exact path="/genres/:genreid/:mediatype/:movieid/season/:seasonno" component={SeasonEpisodes}/>
       <Route exact path="/mylist" component={Mywatchlist}/>
       <Route exact path="/myprofile" component={MyProfile}/>
       <Route exact path="/search" component={SearchMovie}/>
       <Route component={ErrorPage}/>
       </Switch>
       </verticle_nav.Provider> 
      }
      </mywatchlist.Provider>
    </div>
    <Footer/>
    </>
  )
}

export default App;
