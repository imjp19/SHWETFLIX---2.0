import React,{useState} from 'react';
import Banner from "./BannerHome"
import Row from "./Row";
import RowsOnHome from "./RowsOnHome"
import apirequests from "../apirequests";

const Home = () =>{

    const [mediatype,setType] = useState("movie");
    
    return(
       <>
       <Banner mediatype={mediatype} setType={setType}/>
       <Row title="SHWETFLIX ORIGINALS" fetchURL={`discover/${mediatype}` + apirequests.fetchShwetflixOriginals} mediatype={mediatype}
             key={0} genreid="0" isLargeRow/>
       <Row title="Trending Now" fetchURL={`/trending/${mediatype}` + apirequests.fetchTrending}  mediatype={mediatype} key={1} genreid="1" />
       <Row title="Top Rated" fetchURL={`/${mediatype}`+ apirequests.fetchTopRated}   mediatype={mediatype} key={2} genreid="2"/>
       <RowsOnHome mediatype={mediatype}/>
    
       </>
    )
}

export default Home;