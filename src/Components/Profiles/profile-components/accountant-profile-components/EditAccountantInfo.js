import React, {useState} from 'react'
import { fetchConfig } from '../../../../api/fetchConfig';
import { fetchWrapper } from '../../../../api/fetcher';
import { updateAccountantBasicInfoUrl, updateAccountantContactDetailsUrl } from '../../../../api/URLs';
import AccountantInfoForm from './AccountantInfoForm';
const $ = window.$;


export default function EditAccountantInfo({ AccountantInfo, mutate, setSucces }) {
    const [ details, setDetails ] = useState({
		accountantId: AccountantInfo.accountantId,
		phoneNumber: AccountantInfo.accountant.phoneNumber || '',
		email: AccountantInfo.accountant.email || '',
		dateOfBirth: AccountantInfo.dateOfBirth || '',
		gender: AccountantInfo.gender || '',
		address: AccountantInfo.address || '',
		zipCode: AccountantInfo.zipCode || '',
		city: AccountantInfo.city || '',
		state: AccountantInfo.state || '',
		country: AccountantInfo.country || ''
	});

	const handleChange = (e) => {
		e.persist();
		setDetails((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const { accountantId, dateOfBirth, gender, ...contactInfo } = details;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const accountantBasicInfoUrl = updateAccountantBasicInfoUrl();
		const postAccountantBasicInfoUrl = fetchConfig({
			url: accountantBasicInfoUrl,
			method: 'post',
			data: { accountantId, gender, dateOfBirth }
		});

		const accountantContactDetailsUrl = updateAccountantContactDetailsUrl();
		const postAccountantContactDetails = fetchConfig({
			url: accountantContactDetailsUrl,
			method: 'post',
			data: { accountantId, ...contactInfo }
        });
        
		try {
			const resBasicInfoUpdate = await fetchWrapper(postAccountantBasicInfoUrl);
            const resContactDetailsUpdate = await fetchWrapper(postAccountantContactDetails);
			if (resBasicInfoUpdate.status === 200 && resContactDetailsUpdate.status === 200) {
				setSucces({ show: true, message: 'updated Accountant info' });
				mutate();
				$('#edit-accountant-info').modal('hide');
			}
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <div className="modal fade" id="edit-accountant-info" tabIndex="-1" role="dialog" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body">
						<h5 className="text-center">Edit Accountant information</h5>
						<AccountantInfoForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
    )
}
