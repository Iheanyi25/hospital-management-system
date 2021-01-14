import React, { Fragment, useState } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getAdminProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import { Success } from '../Alerts';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import PatientAndAdminImage from '../../assets/img/PatientAndAdminIcon.svg';

function AdminProfile({ adminId }) {
    const [ success, setSucces ] = useState({ show: false, message: '' });
    console.log(adminId,7777)
    const adminProfileUrl = getAdminProfileUrl(adminId);
    console.log(adminProfileUrl)
	const getAdminProfileConfig = fetchConfig({ url: adminProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getAdminProfileConfig, {revalidateOnFocus: false});
    console.log(data,88888)
	const resetShowState = () => setSucces((state) => ({ ...state, show: false }));
	if (error) return <div>failed to lod</div>;
	return (
		<Fragment>
			{!data ? (
				<PageLoader />
			) : (
				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					{success.show && <Success message={success.message} callback={resetShowState} />}
					<div className="main-content-wrap">
						<div className="page-content">
							<Bio bioDetails={data.admin.admin} user="admin" image={PatientAndAdminImage}/>
							<ContactDetail
								otherDetails={data.admin}
								primaryDetails={data.admin.admin}
								userId={data.admin.adminId}
								mutate={mutate}
								setSucces={setSucces}
							/>
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { AdminProfile };
