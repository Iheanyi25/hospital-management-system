import React, { Fragment } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getAdminProfileUrl } from '../../api/URLs';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import PatientAndAdminImage from '../../assets/img/PatientAndAdminIcon.svg';
import SpinnerLoader from '../Loader/SpinnerLoader';

function AdminProfile({ adminId }) {
    const adminProfileUrl = getAdminProfileUrl(adminId);
	const getAdminProfileConfig = fetchConfig({ url: adminProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getAdminProfileConfig, {revalidateOnFocus: false});

	if (error) return <div>failed to load</div>;
	return (
		<Fragment>
			{!data ? (
				<SpinnerLoader />
			) : (
				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					<div className="main-content-wrap">
						<div className="page-content">
							<Bio bioDetails={data.admin.admin} user="admin" image={PatientAndAdminImage}/>
							<ContactDetail
								otherDetails={data.admin}
								primaryDetails={data.admin.admin}
								userId={data.admin.adminId}
								mutate={mutate}
							/>
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { AdminProfile };
