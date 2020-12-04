import React, { useEffect, useState } from "react";

import { AuthRoute } from "./routes";
import PatientRoutes from "./routes/PatientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import PharmacyRoutes from "./routes/PharmacyRoutes";
import LabRoutes from "./routes/LabRoutes";
import AccountantRoutes from "./routes/AccountantRoutes";

function AppRouter() {
  const [isAuthenticated, setisAuthenticated] = useState(
    Boolean(JSON.parse(localStorage.getItem("authenticatedUser")))
  );
  const [userType, setUserType] = useState(
    Boolean(localStorage.getItem("authenticatedUser"))
      ? JSON.parse(
        localStorage.getItem("authenticatedUser")
      ).userType.toLowerCase()
      : null
  );

  useEffect(() => {
    setisAuthenticated(
      Boolean(JSON.parse(localStorage.getItem("authenticatedUser")))
    );
    if (isAuthenticated) {
      setUserType(
        JSON.parse(
          localStorage.getItem("authenticatedUser")
        ).userType.toLowerCase()
      );
    }
  }, [isAuthenticated]);

  const getRouteToRender = () => {
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
  };

  return getRouteToRender();
}

export default AppRouter;
