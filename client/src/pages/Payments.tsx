import React, { useState } from "react";
import { useStripeConnect } from "../utils/StripeConnect";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

export default function Payments(): React.ReactElement {
    const [accountCreatePending, setAccountCreatePending] = useState(false);
    const [onboardingExited, setOnboardingExited] = useState(false);
    const [error, setError] = useState(false);
    const [connectedAccountId, setConnectedAccountId] = useState();
    const stripeConnectInstance = useStripeConnect(connectedAccountId);

    let url: string;
    if(process.env.REACT_APP_PRODUCTION === "false") {
        url = `http://localhost:3001/api/payments/account`;
        } else {    
        url = `https://hometownharvest-91162a140111.herokuapp.com/api/payments/account`;
    }
  
    return (
      <div className="container">
        <div className="banner">
          <h2>Tyler Poepping</h2>
        </div>
        <div className="content">
          {!connectedAccountId && <h2>Get ready for take off</h2>}
          {connectedAccountId && !stripeConnectInstance && <h2>Add information to start accepting money</h2>}
          {!connectedAccountId && <p>Tyler Poepping is the world's leading air travel platform: join our team of pilots to help people travel faster.</p>}
          {!accountCreatePending && !connectedAccountId && (
            <div>
              <button
                onClick={async () => {
                  setAccountCreatePending(true);
                  setError(false);
                  fetch(url, {
                    method: "POST",
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      setAccountCreatePending(false);
                      const { account, error } = json;
  
                      if (account) {
                        setConnectedAccountId(account);
                      }
  
                      if (error) {
                        setError(true);
                      }
                    });
                }}
              >
                Sign up
              </button>
            </div>
          )}
          {stripeConnectInstance && (
            <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
              <ConnectAccountOnboarding
                onExit={() => setOnboardingExited(true)}
              />
            </ConnectComponentsProvider>
          )}
          {error && <p className="error">Something went wrong!</p>}
          {(connectedAccountId || accountCreatePending || onboardingExited) && (
            <div className="dev-callout">
              {connectedAccountId && <p>Your connected account ID is: <code className="bold">{connectedAccountId}</code></p>}
              {accountCreatePending && <p>Creating a connected account...</p>}
              {onboardingExited && <p>The Account Onboarding component has exited</p>}
            </div>
          )}
          <div className="info-callout">
            <p>
              This is a sample app for Connect onboarding using the Account Onboarding embedded component. <a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=embedded" target="_blank" rel="noopener noreferrer">View docs</a>
            </p>
          </div>
        </div>
      </div>
    );
  }