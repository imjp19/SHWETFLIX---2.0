import React,{useEffect} from 'react';
import "../styles/MVTV.css";

const MVTV = ({mediatype,setType}) => {


   useEffect(()=>{
    var btns = document.getElementsByClassName("genrebtn");

    for (let i = 0; i < btns.length; i++) {
           btns[i].addEventListener("click", function() {
            let active_btn = document.getElementsByClassName("genrebtn active");
            active_btn[0].className = active_btn[0].className.replace(" active", "");
            this.classList.add("active");
            
            if(this.innerText === "Movies")setType("movie")
            else setType("tv");
        
           })
        }
    },[mediatype,setType])

    return (
        <div className="pos_rel" data-aos="fade-up">
            <div id="mvtv">
                <button className="genrebtn font_family active">Movies</button>
                <button className="genrebtn font_family">TV Series</button>
             </div>
        </div>
    )
}

export default MVTV;