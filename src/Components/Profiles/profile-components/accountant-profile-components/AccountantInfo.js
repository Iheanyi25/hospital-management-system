import React from 'react';
import edit from '../../../../assets/img/edit.svg';
import EditAccountantInfo from './EditAccountantInfo';

export default function AccountantInfo({ accountantDet, mutate, setSucces }) {
	return (
		<div className="col col-md-12">
			<div className="card border-light p-4">
				<div className="card-body">
					<div className="d-flex justify-content-between border-bottom pb-2">
						<div className="d-flex">
							<h6 className="card-title mt-0 font-weight-bold">Contact Information </h6>
						</div>
						{accountantDet.accountant && (
							<img
								src={edit}
								data-toggle="modal"
								data-target="#edit-accountant-info"
								alt="reset"
								className="mb-2"
								style={{ cursor: 'pointer' }}
							/>
						)}
					</div>
					<AccountantDetailsList accountantInfo={accountantDet} />
					<EditAccountantInfo accountantInfo={accountantDet} mutate={mutate} setSucces={setSucces}/>
				</div>
			</div>
		</div>
	);
}

const AccountantDetailsList = ({ accountantInfo }) => {
	const {
		accountant: { email, phoneNumber },
		zipCode,
		city,
		state,
		dateOfBirth,
		country,
		gender,
		address
	} = accountantInfo;
	return (
		<div>
			<div className="d-flex mt-4">
				<div className="mt-3">
					<p className="font-weight-bold mb-1">Mobile</p>
					<p>{phoneNumber || 'N/A'}</p>
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
