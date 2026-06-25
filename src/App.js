import { Box, CircularProgress } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { getToken, onMessage } from "firebase/messaging";
import { initialize, isFirebaseSupported } from "./firebase";
import ConfigurableValues from "./config/constants";
import Dashboard from "./screens/Dashboard/Dashboard";
import Menu from "./screens/Menu/Menu";
import Bag from "./screens/Bag/Bag";
import CheckoutBud from "./screens/CheckoutBud/CheckoutBud";
import OrderConfirm from "./screens/OrderConfirm/OrderConfirm";
import BudAuth from "./screens/BudAuth/BudAuth";
import BudOrders from "./screens/BudOrders/BudOrders";
import BudAccount from "./screens/BudAccount/BudAccount";
import BudSearch from "./screens/BudSearch/BudSearch";
import Privacy from "./screens/Privacy/Privacy";
import Terms from "./screens/Terms/Terms";
import FlashMessage from "./components/FlashMessage";
import * as Sentry from "@sentry/react";
import { useTranslation } from "react-i18next";
//import { fetchConfiguration } from "./utils/helper";


//import { Integrations } from "@sentry/tracing";

const GoogleMapsLoader = ({
  children,
  LIBRARIES,
  GOOGLE_MAPS_KEY,
  VAPID_KEY,
}) => {
  const [message, setMessage] = useState(null);
  const { t, i18n } = useTranslation();

  //Handlers
/*   const onWindowUpdateAmplitude = async () => {
    const { webAmplitudeApiKey } = await fetchConfiguration();

    if (webAmplitudeApiKey) {
      // Set the API key to a global variable
      window.amplitudeApiKey = webAmplitudeApiKey;

      // Now you can initialize Amplitude
      if (window.amplitude) {
        window.amplitude
          .add(window.sessionReplay.plugin({ sampleRate: 1 }))
          .promise.then(function () {
            window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
            window.amplitude.init(window.amplitudeApiKey);
          });
      }
    }
  }; */

  useEffect(() => {
    const initializeFirebase = async () => {
      if (await isFirebaseSupported()) {
        const messaging = initialize();
        Notification.requestPermission()
          .then(() => {
            getToken(messaging, {
              vapidKey: VAPID_KEY,
            })
              .then((token) => {
                localStorage.setItem("messaging-token", token);
              })
              .catch((err) => {
                console.log("getToken error", err);
              });
          })
          .catch(console.log);

        onMessage(messaging, function (payload) {
          // Customize notification here
          const { title, body } = payload.notification;
          var localizedBody = body;
          var orderNo = "";
          var localizedTitle = title;
          const createMessage = (orderNo, localizedTitle, localizedBody) => {
            return i18n.language === "ar"
              ? `${orderNo} ${localizedTitle} ${localizedBody}`
              : `${localizedTitle} ${localizedBody} ${orderNo}`;
          };
          if (title.startsWith("Order status:")) {
            localizedTitle = t(title);
            const orderIdIndex = body.indexOf("Order ID");
            orderNo = body.slice(orderIdIndex + 9).trim();
            localizedBody = t("Order ID");
            setMessage(createMessage(orderNo, localizedTitle, localizedBody));
          } else if (title === "Order placed") {
            localizedTitle = t("orderPlaced");
            const orderIdIndex = body.indexOf("Order ID");
            orderNo = body.slice(orderIdIndex + 9).trim();
            localizedBody = t("Order ID");
            setMessage(createMessage(orderNo, localizedTitle, localizedBody));
          } else {
            console.log(localizedTitle, localizedBody);
            setMessage(`${localizedTitle} ${localizedBody}`);
          }
        });
      }
    };
    initializeFirebase();

  

  }, [t, i18n, VAPID_KEY]);

  /* ß */

  const handleClose = () => {
    setMessage(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries: LIBRARIES,
  });
  console.log("isLoaded ", isLoaded);
  if (!isLoaded) {
    return (
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      {children}
      <FlashMessage
        severity={"info"}
        alertMessage={message}
        open={message !== null}
        handleClose={handleClose}
      />
    </>
  );
};

function App() {
  const { GOOGLE_MAPS_KEY, LIBRARIES, VAPID_KEY,SENTRY_DSN } = ConfigurableValues();

  useEffect(() => {
  
    if (SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
      //SENTRY_DSN  integrations: [new Integrations.BrowserTracing()],
        environment: "development",
        enableInExpoDevelopment: true,
        debug: true,
        tracesSampleRate: 1.0, // to be changed to 0.2 in production
      });
   
    }

  }, [SENTRY_DSN]);

  return GOOGLE_MAPS_KEY ? (
    <HashRouter>
      <GoogleMapsLoader
        GOOGLE_MAPS_KEY={GOOGLE_MAPS_KEY}
        LIBRARIES={LIBRARIES}
        VAPID_KEY={VAPID_KEY}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/d/:slug" element={<Menu />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/checkout" element={<CheckoutBud />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/search" element={<BudSearch />} />
          <Route path="/orders" element={<BudOrders />} />
          <Route path="/account" element={<BudAccount />} />
          <Route path="/restaurant-list" element={<Navigate to="/" replace />} />
          <Route path="/restaurant/:slug" element={<Navigate to="/" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/pickup" element={<Navigate to="/" replace />} />
          <Route path={"/login"} element={<BudAuth />} />
          {/* Legacy Enatega auth/OTP screens → branded auth */}
          {[
            "/registration",
            "/new-login",
            "/login-email",
            "/verify-email",
            "/new-password",
            "/phone-number",
            "/verify-phone",
            "/forgot-password",
            "/verify-forgot-otp",
            "/email-sent",
          ].map((p) => (
            <Route key={p} path={p} element={<Navigate to="/login" replace />} />
          ))}
          {/* Legacy account/order/payment screens → branded equivalents */}
          <Route path={"/profile"} element={<Navigate to="/account" replace />} />
          <Route path={"/settings"} element={<Navigate to="/account" replace />} />
          <Route path={"/favourite"} element={<Navigate to="/account" replace />} />
          <Route path={"/order-detail/:id"} element={<Navigate to="/orders" replace />} />
          <Route path={"/paypal"} element={<Navigate to="/checkout" replace />} />
          <Route path={"/stripe"} element={<Navigate to="/checkout" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GoogleMapsLoader>
    </HashRouter>
  ) : (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Sentry.withProfiler(App);
