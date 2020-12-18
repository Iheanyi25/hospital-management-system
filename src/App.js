import React from "react";
import AppRouter from "./ApplicationRoute";
import "./App.css";
import { UserProvider } from "./mobx/UserState";

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
