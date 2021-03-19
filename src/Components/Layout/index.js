import React, { useState } from "react";
import { Footer } from "../Footer";
import {
  AccountantHeader,
  AdminHeader,
  DoctorHeader,
  HMOHeader,
  LabHeader,
  NurseHeader,
  PatientHeader,
  PharmacyHeader,
} from "../Header";
import {
  AddFamily,
  RegisterUserModal,
  SearchDoctorsModal,
} from "../Modals";
import {
  AccountantSidebar,
  AdminSidebar,
  DoctorSidebar,
  HMOSidebar,
  LabSidebar,
  NurseSidebar,
  PatientSidebar,
  PharmacySidebar,
} from "../Sidebar";
import { TemplateSettings } from "../TemplateSettings";

export const AdminLayout = ({ children }) => {
  const [userType, setUserType] = useState();
  return (
    <div className="page-box">
      <div className="app-container">
        <AdminHeader />
        <AdminSidebar setUserType={setUserType} />
        {children}
        <Footer />
        <RegisterUserModal userType={userType} />
        <AddFamily />
        <TemplateSettings />
      </div>
    </div>
  );
};

export const AccountantLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <AccountantHeader />
        <AccountantSidebar />
        {children}
        <TemplateSettings />
        <Footer />
      </div>
    </div>
  );
};

export const DoctorLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <DoctorHeader />
        <DoctorSidebar />
        {children}
        <TemplateSettings />
        <SearchDoctorsModal />
        <Footer />
      </div>
    </div>
  );
};

export const LabLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <LabHeader />
        <LabSidebar />
        {children}
        <TemplateSettings />
        <Footer />
      </div>
    </div>
  );
};

export const PatientLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <PatientHeader />
        <PatientSidebar />
        {children}
        <SearchDoctorsModal />
        <TemplateSettings />
        <Footer />
      </div>
    </div>
  );
};

export const PharmacyLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <PharmacyHeader />
        <PharmacySidebar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export const NurseLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <NurseHeader />
        <NurseSidebar />
        {children}
        <Footer />
      </div>
    </div>
  );
};
export const HMOLayout = ({ children }) => {
  return (
    <div className="page-box">
      <div className="app-container">
        <HMOHeader />
        <HMOSidebar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export const AuthLayout = ({ children }) => {
  return <>{children}</>;
};
