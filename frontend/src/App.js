import React, { useEffect, useRef } from "react";
import * as Sentry from "@sentry/react";
import AppRouter from "./ApplicationRoute";
import "./App.css";
import { UserProvider } from "./mobx/UserState";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import useNetwork from "./custom-hooks/useNetwork";
import { notification } from "./utils/notification";


function App() {
  //use this prevent online message from showing, only after the user has gone offline atleast once
  const offlineCount = useRef(0);
  const isOnline = useNetwork();
  useEffect(() => {
    if (isOnline && offlineCount.current > 0) {
      notification.success({
        message: "you are back online ",
        title: "Online",
      });
    }
    if (!isOnline) {
      offlineCount.current = offlineCount.current + 1;
      notification.error({
        message: "oops!, looks you are offline ",
        duration: 4000,
        title: "Offline",
      });
    }
  }, [isOnline]);

  return (
    <UserProvider>
      <ReactNotification isMobile={true} />
      <AppRouter />
    </UserProvider>
  );
}

export default Sentry.withProfiler(App);
