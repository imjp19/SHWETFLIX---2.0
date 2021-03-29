import { createContext } from "react";
import img1 from "../images/Action.jpg";
import img2 from "../images/Adventure.jpg";
import img3 from "../images/Animation.jpg";
import img4 from "../images/Comedy.jpg";
import img5 from "../images/Crime.jpeg";
import img6 from "../images/Documentry.jpg";
import img7 from "../images/Drama.jpg";
import img8 from "../images/Family.jpg";
import img9 from "../images/Fantacy.jpg";
import img10 from "../images/History.jpg";
import img11 from "../images/Horror.jpg";
import img12 from "../images/Music.jpg";
import img13 from "../images/Mystry.jpg";
import img14 from "../images/Romance.jpg";
import img15 from "../images/Science Fiction.jpg";
import img16 from "../images/TV Movie.jpg";
import img17 from "../images/Thriller.jpg";
import img18 from "../images/War.jpg";
import img19 from "../images/Western.jpg";
import img20 from "../images/Kids.jpg";
import img21 from "../images/News.jpg";
import img22 from "../images/Reality.png";
import img23 from "../images/Soap.jpg";
import img24 from "../images/Talk.jpg";
import limg1 from "../images/tv.png";
import limg2 from "../images/tv2.png";
import limg3 from "../images/boxshot.png";
import limg4 from "../images/mobile.jpg";
import lgif from "../images/gif.gif";
import ltv1 from "../images/tv1gif.gif";
import ltv2 from "../images/tv2gif.gif"


  const MVGenresImages = [
    { img:img1 },
    { img:img2 },
    { img:img3 },
    { img:img4 },
    { img:img5 },
    { img:img6 },
    { img:img7 },
    { img:img8 },
    { img:img9 },
    { img:img10 },
    { img:img11 },
    { img:img12 },
    { img:img13 },
    { img:img14 },
    { img:img15 },
    { img:img16 },
    { img:img17 },
    { img:img18 },
    { img:img19 },
  ]

  const TVGenresImages = [
    { img:img2 },
    { img:img3 },
    { img:img4 },
    { img:img5 },
    { img:img6 },
    { img:img7 },
    { img:img8 },
    { img:img20 },
    { img:img13 },
    { img:img21 },
    { img:img22 },
    { img:img15 },
    { img:img23 },
    { img:img24 },
    { img:img1 },
    { img:img19 },
    { img:img17 },
    { img:img18 },
    { img:img19 },
  ]

const LoginStatics = {
  tv1:limg1,tv2:limg2,boxshot:limg3,mobile:limg4,gif:lgif,vid1:ltv1,vid2:ltv2
}

const mywatchlist = createContext(null);
const verticle_nav = createContext(null);


export {mywatchlist,MVGenresImages,TVGenresImages,LoginStatics,verticle_nav} ; 