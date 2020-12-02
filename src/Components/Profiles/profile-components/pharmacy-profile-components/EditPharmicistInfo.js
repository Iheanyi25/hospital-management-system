import React, { useState } from 'react';
import { fetchConfig } from '../../../../api/fetchConfig';
import { fetchWrapper } from '../../../../api/fetcher';
import { updatePharmacistBasicInfoUrl, updatePharmacistContactDetailsUrl } from '../../../../api/URLs';
import PharmacistInfoForm from './PharmacistInfoForm';
const $ = window.$;

export default function EditPharmicistInfo({ pharmacistInfo, mutate, setSucces }) {
	const [ details, setDetails ] = useState({
		pharmacistId: pharmacistInfo.pharmacyId,
		phoneNumber: pharmacistInfo.pharmacy.phoneNumber || '',
		email: pharmacistInfo.pharmacy.email || '',
		dateOfBirth: pharmacistInfo.dateOfBirth || '',
		gender: pharmacistInfo.gender || '',
		address: pharmacistInfo.address || '',
		zipCode: pharmacistInfo.zipCode || '',
		city: pharmacistInfo.city || '',
		state: pharmacistInfo.state || '',
		country: pharmacistInfo.country || ''
	});

	const handleChange = (e) => {
		e.persist();
		setDetails((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const { pharmacistId, dateOfBirth, gender, ...contactInfo } = details;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const PharmacistBasicInfoUrl = updatePharmacistBasicInfoUrl();
		const postPharmacistBasicInfoUrl = fetchConfig({
			url: PharmacistBasicInfoUrl,
			method: 'post',
			data: { pharmacistId, gender, dateOfBirth }
		});

		const PharmacistContactDetailsUrl = updatePharmacistContactDetailsUrl();
		const postPharmacistContactDetails = fetchConfig({
			url: PharmacistContactDetailsUrl,
			method: 'post',
			data: { pharmacistId, ...contactInfo }
		});
		try {
			const resBasicInfoUpdate = await fetchWrapper(postPharmacistBasicInfoUrl);
			const resContactDetailsUpdate = await fetchWrapper(postPharmacistContactDetails);

			if (resBasicInfoUpdate.status === 200 && resContactDetailsUpdate.status === 200) {
				setSucces({ show: true, message: 'update pharmacist info' });
				mutate();
				$('#edit-pharmacist-info').modal('hide');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="modal fade" id="edit-pharmacist-info" tabIndex="-1" role="dialog" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body">
						<h5 className="text-center">Edit contact information</h5>
						<PharmacistInfoForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	);
}
