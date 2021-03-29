import React from 'react';
import "../styles/FreqAsk.css";

const FreqAsk = ({setSignInScreen}) => {

    const queans=[
        {que: "What is Shwetflix ?", ans:"Shwetflix is a service that offers a wide variety of award-winning TV shows,movies, anime, documentaries and more with trailers, dates, cast and more. – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"},
        {que: "How much does Shwetflix cost ?", ans:"Watch Shwetflix on your smartphone, tablet, Smart TV or laptop, all for one fixed monthly fee. Plans range from ₹ 49 to ₹ 199 a month. No extra costs, no contracts."},
        {que: "Where can I watch ?", ans:"Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Shwetflix account to watch instantly on the web at shwetflix.netlify.app from your personal computer or on any internet-connected device like  smart TVs, smartphones, tablets.You can also save your favourite shows with the . Use MyWatchList to find your favourites easily."},
        {que: "How can I cancel ?", ans:"Shwetflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."},
        {que: "What can I watch on Shwetflix ?", ans:"Shwetflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. So enjoy as much as you want, anytime you want."}
        
    ];
   
    const toggle = (index) => {
        for(let i=0;i<5;i++)
           {
            let ansstr = "ans" + i;let rotstr = "rot" + i;
            let x = document.getElementById(ansstr);
            let y = document.getElementById(rotstr);
            if(i===index)
             { 
              y.classList.toggle('rotate');
              x.classList.toggle('closed');
             }
            else{
              y.classList.remove('rotate');
              x.classList.add('closed');
            }
           }
        }


    return(
        <div>
            <section className="frequent">
            <h1>Frequently Asked Questions</h1>
            <div className="Questions">
                {queans.map((qa,index) => {
                    return(
                    <>
                     <button type="button" className="font_family quebtn" data-aos="flip-down" data-aos-offset="50" onClick={() => toggle(index)} >
                        <span>{qa.que}</span><i className="fa fa-plus" id={`rot${index}`} aria-hidden="true"></i>
                    </button>
                     <div className="faq-answer closed" id={`ans${index}`}>
                        <span>
                          {qa.ans}
                        </span>
                      </div>
                      </>);
                })
                }
            </div>
            </section>

            <div className="freq_forminput" data-aos="fade-up" data-aos-offset="0">
            <h3>Ready to watch 🤩? Enter your Email to create or restart your membership.</h3>
               <div className="login_forminput">
                <form>
                    <input type="email" placeholder="Email Address" className="font_family"/>
                    <button className="getstarted_btn font_family" onClick={() => setSignInScreen(true)}>GET STARTED</button>
                </form>
              </div>
            </div>
        </div>
    )
}

export default FreqAsk;
