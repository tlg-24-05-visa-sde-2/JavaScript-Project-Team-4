import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import NavbarComponent from '../components/Nabar';
import Footer from '../components/Footer';

interface CheckoutProps {
    props: any;
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PQub32Kq7ZuBPIYsR2HmyA8hvnb8n2fmoOeUCtJT27wnEocqeQSVWWD7JaGn83fxGCveK5Jn2vgNWsKexKAEurP00FR4C2Kr4');
let url: string;
if(process.env.REACT_APP_PRODUCTION === 'false') {
    url = 'http://localhost:3001';
    } else {
    url = 'https://hometownharvest-91162a140111.herokuapp.com';
}


function Checkout({ props }: CheckoutProps) {
    console.log(props.isLoggedIn)
    if(props.isLoggedIn === false){
        return <Navigate to="/login" />
    } 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fetchClientSecret = React.useCallback(async () => {
            
        // Create a Checkout Session
        const res = await fetch(`${url}/api/payments/create-checkout-session`, {
            credentials: 'include',
            method: "POST",
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);
    
    if(props.isLoggedIn === false){
        return <Navigate to="/login" />
    }

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <NavbarComponent props={props} />
            <h1 className='text-center'>What are you waiting for? </h1>
            <h3>Grab your fresh goods now!</h3>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
            <Footer />
        </div>
    )
}

export default Checkout
