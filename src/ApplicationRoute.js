import React, { useEffect, useState, useContext } from "react";

import { AuthRoute } from "./routes";
import PatientRoutes from "./routes/PatientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import PharmacyRoutes from "./routes/PharmacyRoutes";
import LabRoutes from "./routes/LabRoutes";
import AccountantRoutes from "./routes/AccountantRoutes";
import { UserContext } from "./mobx/UserState";
import { observer } from "mobx-react";
import {BrowserRouter, Switch, Route, useRouteMatch} from 'react-router-dom'

const AppRouter = observer(() => {
  // const [isAuthenticated, setisAuthenticated] = useState(null);
  // const [userType, setUserType] = useState(
  //   Boolean(localStorage.getItem("authenticatedUser"))
  //     ? JSON.parse(
  //       localStorage.getItem("authenticatedUser")
  //     ).userType.toLowerCase()
  //     : null
  // );
  const {path} = useRouteMatch();
  console.log("path 1", path)

  const { loadUser, user, isLoadingUser } = useContext(UserContext)
  useEffect(() => {
    loadUser()
  }, []);
  // console.log(user)
  const userType = user?.userType?.toLowerCase();
  const isAuthenticated = Boolean(user);

   
  const getRouteToRender = () => {
    if (!user && isLoadingUser) return ""
    console.log("state check 1", isAuthenticated, userType)
    if (isAuthenticated) {

      const rootPath = window.location.pathname.split("/")[1].toLowerCase();
      let tempUserRoute =
        userType === rootPath ? rootPath : userType.toLowerCase();
       
      switch (tempUserRoute) {
        case "admin":
          return <AdminRoutes />;
        case "patient":
          return <PatientRoutes />;
        case "doctor":
          return <DoctorRoutes />;
        case "pharmacy":
          return <PharmacyRoutes />;
        case "lab":
          return <LabRoutes />;
        case "accountant":
          return <AccountantRoutes />;
        default:
        //   localStorage.clear();
        //   window.location.reload();
        return  <AuthRoute />
          // return;
      }
    } else {
      console.log("state check", isAuthenticated, userType)
      return (
        <AuthRoute />
      );
    }
  }

  return getRouteToRender();
})

const RootRouter = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={AuthRoute} exact={true} />
        <Route path="/" component={AppRouter}/>
      </Switch>
    </BrowserRouter>
  )
}

export default  RootRouter;
