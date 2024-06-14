import * as React from 'react';
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

function Checkout({ props }: CheckoutProps) {
    const fetchClientSecret = React.useCallback(async () => {
        // Create a Checkout Session
        const res = await fetch("http://localhost:3001/api/payments/create-checkout-session", {
            credentials: 'include',
            method: "POST",
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <NavbarComponent props={props} />
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
