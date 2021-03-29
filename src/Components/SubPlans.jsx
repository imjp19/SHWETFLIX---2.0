import React,{ useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/SubPlans.css";

const SubPlans= ()=> {

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription,setSubscription] = useState(null);
    
    useEffect(()=>{
        db.collection('customers').doc(user.uid)
        .collection('subscriptions').get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    },[user.uid]);

    useEffect(()=>{
        db.collection('products').where("active","==", true)
        .get().then((querySnapshot) => {
             const products = {};
             querySnapshot.forEach( async productDoc => {
                 products[productDoc.id] = productDoc.data();
                 const priceSnap = await productDoc.ref.collection("prices").get();
                 priceSnap.docs.forEach( price => {
                     products[productDoc.id].prices = {
                         priceId : price.id,
                         priceData: price.data()
                     }
                 })
             });
             setProducts(products);
        });
    },[]);


    const showCheckout = async (priceId) =>{
          const docRef = await db.collection("customers")
          .doc(user.uid).collection("checkout_sessions")
          .add({
              price : priceId,
              success_url: window.location.origin,
              cancel_url: window.location.origin,
          });

          docRef.onSnapshot( async (snap) => {
              const { error, sessionId } = snap.data();
              
              if(error) {
                  alert(`An error accured  ${error.message}`);}
              if(sessionId) {
                  const stripe = await loadStripe("pk_test_51ISjNRDgUXLemEkwdzo1bWD6qSB7FMjqIQybgkEZ1oAHq14RHzUsEaskCoV968Gy33lHVWMHTTAvTbnKdt7lV8HN00TWS9XoYx");
                  stripe.redirectToCheckout({ sessionId });
              }
          })

    }

    return (
        <div className="plans font_family">
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()} </p>}
            {Object.entries(products).map(({productId, productData})=>{

               const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

                return (
                    <div key={productId} className={`${isCurrentPackage && "plan_current"}  plan_outer`}>
                        <div className="plan_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={() => !isCurrentPackage && showCheckout(productData.prices.priceId)} >{isCurrentPackage ? 'Current Package': 'Subscribe'}</button>

                    </div>
                );
            })}
        </div>
    )
}

export default SubPlans;
