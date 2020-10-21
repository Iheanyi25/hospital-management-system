import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Footer } from '../Components';
import {
	AdminLayout,
	LabLayout,
	DoctorLayout,
	AccountantLayout,
	PatientLayout,
	PharmacyLayout,
} from '../Components/Layout';

const MainRoute = ({ Component, path, exact, purpose, isAuthenticated, userType, ...rest }) => {

	userType = userType ? userType.toLowerCase() : null;

	return (
		<>
			<Route
				exact={exact}
				path={path}
				{...rest}
				render={(props) => {
					return userType === 'admin' ? (
						<AdminLayout history={props.history} isAuthenticated={isAuthenticated}>
							<Component {...rest} {...props} />
						</AdminLayout>
					) : userType === 'accountant' ? (
						<AccountantLayout history={props.history} isAuthenticated={isAuthenticated}>
							<Component {...rest} {...props} />
						</AccountantLayout>
					) : userType === 'lab' ? (
						<LabLayout history={props.history} isAuthenticated={isAuthenticated}>
							<Component {...rest} {...props} />
						</LabLayout>
					) : userType === 'doctor' ? (
						<DoctorLayout history={props.history} isAuthenticated={isAuthenticated}>
							<Component {...rest} {...props} />
						</DoctorLayout>
					) : userType === 'patient' ? (
						<PatientLayout history={props.history} isAuthenticated={isAuthenticated}>
							<Component {...rest} {...props} />
						</PatientLayout>
					) : userType === 'pharmacy' ? (
						<PharmacyLayout history={props.history} isAuthenticated={isAuthenticated}>
							<Component {...rest} {...props} />
						</PharmacyLayout>
					) : <Redirect to="/" /> // just in case it is null or someone tries to use an invalid userType
				}}
			/>

			<Footer />
		</>
	);
};

export { MainRoute };
