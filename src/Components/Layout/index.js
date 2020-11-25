import React from 'react';
import { Footer } from '../Footer';
import { AccountantHeader, AdminHeader, DoctorHeader, LabHeader, PatientHeader, PharmacyHeader } from '../Header';
import { AddFamily, RegisterPatientModal, RegisterUserModal, SearchDoctorsModal, SearchPatientModal } from '../Modals';
import { AccountantSidebar, AdminSidebar, DoctorSidebar, LabSidebar, PatientSidebar, PharmacySidebar } from '../Sidebar';
import { TemplateSettings } from '../TemplateSettings';

export const AdminLayout = ({ children }) => {

	return (
		<div className="page-box">
			<div className="app-container">
				<AdminHeader />
				<AdminSidebar />
				{children}
				<Footer />
				<RegisterPatientModal />
				<RegisterUserModal />
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
				<SearchPatientModal />
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
				<SearchPatientModal />
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


export const AuthLayout = ({ children }) => {

	return <>{children}</>;
};