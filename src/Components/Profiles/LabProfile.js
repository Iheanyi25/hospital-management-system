import React, { Fragment, useState } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getLabProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import { Success } from '../Alerts';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';

function LabProfile({ labId }) {
	const [ success, setSucces ] = useState({ show: false, message: '' });
	const labProfileUrl = getLabProfileUrl(labId);
	const getLabProfileConfig = fetchConfig({ url: labProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getLabProfileConfig);

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
							<Bio bioDetails={data.labTechnician.lab} user="lab" />
							<ContactDetail
								otherDetails={data.labTechnician}
								primaryDetails={data.labTechnician.lab}
								userId={data.labTechnician.labId}
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

export { LabProfile };
