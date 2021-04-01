import React, { useEffect, useContext } from "react";

import { AuthRoute } from "./routes";
import PatientRoutes from "./routes/PatientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import PharmacyRoutes from "./routes/PharmacyRoutes";
import LabRoutes from "./routes/LabRoutes";
import AccountantRoutes from "./routes/AccountantRoutes";
import HMORoutes from "./routes/HMORoutes";
import { UserContext } from "./mobx/UserState";
import { observer } from "mobx-react";
import { CommonRoute } from "./routes/CommonRoutes";
import NurseRoutes from "./routes/NurseRoutes";
import WardPersonnelRoutes from "./routes/WardPersonnelRoutes";

const AppRouter = observer(() => {
  const { loadUser, user, isLoadingUser } = useContext(UserContext);
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const userType = user?.userType?.toLowerCase();
  const isAuthenticated = Boolean(user);

  const getRouteToRender = () => {
    if (!user && isLoadingUser) return "loading";

    if (isAuthenticated) {
      const rootPath = window.location.pathname.split("/")[1].toLowerCase();
      let tempUserRoute =
        userType === rootPath
          ? rootPath
          : rootPath === "common"
          ? rootPath
          : userType.toLowerCase();
      switch (tempUserRoute) {
        case "common":
          return <CommonRoute who={userType} />;
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
        case "nurse":
          return <NurseRoutes />;
        case "hmoadmin":
          return <HMORoutes />;
        case "wardpersonnel":
          return <WardPersonnelRoutes />;
        default:
          localStorage.clear();
          window.location.reload();
          return;
      }
    } else {
      return <AuthRoute />;
    }
  };

  return getRouteToRender();
});

export default AppRouter;
