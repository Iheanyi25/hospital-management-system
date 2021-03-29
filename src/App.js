import React, { useEffect } from "react";
import AppRouter from "./ApplicationRoute";
import "./App.css";
import { UserProvider } from "./mobx/UserState";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import useNetwork from "./custom-hooks/useNetwork";
import { notification } from "./utils/notification";

function App() {
  const isOnline = useNetwork();
  useEffect(() => {
    if (isOnline) {
      notification.success({
        message: "you are online ",
        title: "Online",
      });
    } else {
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

export default App;
