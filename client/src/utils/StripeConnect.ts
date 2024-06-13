import { useState, useEffect } from "react";
import { loadConnectAndInitialize, StripeConnectInstance } from "@stripe/connect-js";

export const useStripeConnect = (connectedAccountId: any) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<StripeConnectInstance | undefined>();

let url: string;
  if(process.env.REACT_APP_PRODUCTION === "false") {
    url = `http://localhost:3001/api/payments/account_session`;
  } else {
    url = `https://hometownharvest-91162a140111.herokuapp.com/api/payments/account_session`;
  }

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: connectedAccountId,
          }),
        });

        if (!response.ok) {
          // Handle errors on the client side here
          await response.json();
          console.error("An error occurred: ", response.status, response.statusText);
        } else {
          const { client_secret: clientSecret } = await response.json();
          return clientSecret;
        }
      };

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "",
          fetchClientSecret,
          appearance: {
            overlays: "dialog",
            variables: {
              colorPrimary: "#635BFF",
            },
          },
        })
      );
    }
  }, [connectedAccountId]);

  return stripeConnectInstance;
};

export default useStripeConnect;