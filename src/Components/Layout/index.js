import React, { useEffect } from 'react';
import { AccountantHeader, AdminHeader, DoctorHeader, LabHeader, PatientHeader, PharmacyHeader } from '../Header';
import { AccountantSidebar, AdminSidebar, DoctorSidebar, LabSidebar, PatientSidebar, PharmacySidebar } from '../Sidebar';

export const AdminLayout = ({ history, children, isAuthenticated }) => {
	// authenticated props will come from the redux store or localstorage
	useEffect(() => {
		if (!isAuthenticated) {
			history.replace('/');
		}
	}, [isAuthenticated, history]);

	return (
		<div className="page-box">
			<div className="app-container">
				<AdminHeader />
				<AdminSidebar />
				{isAuthenticated && children}
			</div>
		</div>
	);
};

export const AccountantLayout = ({ history, children, isAuthenticated }) => {
	// authenticated props will come from the redux store or localstorage
	useEffect(() => {
		if (!isAuthenticated) {
			history.replace('/');
		}
	}, [isAuthenticated, history]);

	return (
		<div className="page-box">
			<div className="app-container">
				<AccountantHeader />
				<AccountantSidebar />
				{isAuthenticated && children}
			</div>
		</div>
	);
};

export const DoctorLayout = ({ history, children, isAuthenticated }) => {
	// authenticated props will come from the redux store or localstorage
	useEffect(() => {
		if (!isAuthenticated) {
			history.replace('/');
		}
	}, [isAuthenticated, history]);

	return (
		<div className="page-box">
			<div className="app-container">
				<DoctorHeader />
				<DoctorSidebar />
				{isAuthenticated && children}
			</div>
		</div>
	);
};

export const LabLayout = ({ history, children, isAuthenticated }) => {
	// authenticated props will come from the redux store or localstorage
	useEffect(() => {
		if (!isAuthenticated) {
			history.replace('/');
		}
	}, [isAuthenticated, history]);

	return (
		<div className="page-box">
			<div className="app-container">
				<LabHeader />
				<LabSidebar />
				{isAuthenticated && children}
			</div>
		</div>
	);
};

export const PatientLayout = ({ history, children, isAuthenticated }) => {
	// authenticated props will come from the redux store or localstorage
	useEffect(() => {
		if (!isAuthenticated) {
			history.replace('/');
		}
	}, [isAuthenticated, history]);

	return (
		<div className="page-box">
			<div className="app-container">
				<PatientHeader />
				<PatientSidebar />
				{isAuthenticated && children}
			</div>
		</div>
	);
};

export const PharmacyLayout = ({ history, children, isAuthenticated }) => {
	// authenticated props will come from the redux store or localstorage
	useEffect(() => {
		if (!isAuthenticated) {
			history.replace('/');
		}
	}, [isAuthenticated, history]);

	return (
		<div className="page-box">
			<div className="app-container">
				<PharmacyHeader />
				<PharmacySidebar />
				{isAuthenticated && children}
			</div>
		</div>
	);
};


export const AuthLayout = ({ history, children, isAuthenticated }) => {
	useEffect(() => {
		if (isAuthenticated) {
			history.replace('/dashboard');
		}
	}, [isAuthenticated, history]);

	return <>{!isAuthenticated && children}</>;
};