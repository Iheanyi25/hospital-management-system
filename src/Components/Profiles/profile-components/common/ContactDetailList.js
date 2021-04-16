import React from 'react'
import { formatPhoneNumber } from '../../../../utils/validationUtils';

export default function ContactDetailList ({ otherDetails, primaryDetails : {email, phoneNumber } }){
	const {
		zipCode,
		city,
		state,
		dateOfBirth,
		country,
		gender,
		address
	} = otherDetails;
	return (
		<div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Mobile</p>
					<p>{formatPhoneNumber(phoneNumber) || 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Email</p>
					<p>{email.toLowerCase() || 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Date of Birth</p>
					<p>{dateOfBirth || 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Gender</p>
					<p>{gender || 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Address</p>
					<p>{address || 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Zip code</p>
					<p>{zipCode || 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">City/State</p>
					<p>{city || state ? `${city || ''} ${state || ''}` : 'N/A'}</p>
				</div>
			</div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Country</p>
					<p>{country || 'N/A'}</p>
				</div>
			</div>
		</div>
	);
};
