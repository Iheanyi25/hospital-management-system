import React from "react";
import AppRouter from "./ApplicationRoute";
import "./App.css";
import { UserProvider } from "./mobx/UserState";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <UserProvider>
      <ReactNotification isMobile={true} />
      <AppRouter />
    </UserProvider>
  );
}

export default App;
