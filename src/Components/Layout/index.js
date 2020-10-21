import React, { useEffect } from 'react';
import { AccountantHeader, AdminHeader, DoctorHeader, LabHeader, PatientHeader, PharmacyHeader } from '../Header';
import { AccountantSidebar, AdminSidebar, DoctorSidebar, LabSidebar, PatientSidebar, PharmacySidebar } from '../Sidebar';
// import AdminHeader from '../../Components/Header/AdminHeader';
// import AccountantHeader from '../../Components/Header/AccountantHeader';
// import DoctorHeader from '../../Components/Header/DoctorHeader';
// import LabHeader from '../../Components/Header/LabHeader';
// import PatientHeader from '../../Components/Header/PatientHeader';
// import PharmacyHeader from '../../Components/Header/PharmacyHeader';
// import AdminSidebar from '../../Components/Sidebar/AdminSidebar';
// import AccountantSidebar from '../../Components/Sidebar/AccountantSidebar';
// import DoctorSidebar from '../../Components/Sidebar/DoctorSidebar';
// import LabSidebar from '../../Components/Sidebar/LabSidebar';
// import PatientSidebar from '../../Components/Sidebar/PatientSidebar';
// import PharmacySidebar from '../../Components/Sidebar/PharmacySidebar';

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
		console.log(isAuthenticated)
		if (isAuthenticated) {
			history.replace('/dashboard');
		}
	}, [isAuthenticated, history]);

	return <></>;
	// return <>{!isAuthenticated && children}</>;
};
