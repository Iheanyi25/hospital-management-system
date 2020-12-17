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

const AppRouter = observer(() => {
  // const [isAuthenticated, setisAuthenticated] = useState(null);
  // const [userType, setUserType] = useState(
  //   Boolean(localStorage.getItem("authenticatedUser"))
  //     ? JSON.parse(
  //       localStorage.getItem("authenticatedUser")
  //     ).userType.toLowerCase()
  //     : null
  // );

  const { loadUser, user, isLoadingUser } = useContext(UserContext)
  useEffect(() => {
    loadUser()
  }, []);
  console.log(user)
  const userType = user?.userType?.toLowerCase();
  const isAuthenticated = Boolean(user);
   
  const getRouteToRender = () => {
    if (!user && isLoadingUser) return "loadding"
    if (isAuthenticated) {
      const rootPath = window.location.pathname.split("/")[1].toLowerCase();
      let tempUserRoute =
        userType === rootPath ? rootPath : userType.toLowerCase();
        console.log(tempUserRoute)
      switch (tempUserRoute) {
        case "admin":
          console.log(9999999999999)
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
          console.log("i am an accountant");
          return <AccountantRoutes />;
        default:
          localStorage.clear();
          window.location.reload();
          return;
      }
    } else {
      return (
        <AuthRoute />
      );
    }
  }

  return getRouteToRender();
})

export default  AppRouter;
