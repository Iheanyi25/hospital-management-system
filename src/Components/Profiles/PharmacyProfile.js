import React, { Fragment, useState } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getPharmacistProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import PharmacistInfo from './profile-components/pharmacy-profile-components/PharmacistInfo';
import PharmacistBio from './profile-components/pharmacy-profile-components/PharmacistBio';
import { Success } from '../Alerts';

function PharmacyProfile({ pharmacyId }) {
	const [ success, setSucces ] = useState({ show: false, message: '' });
	const PharmacyProfileUrl = getPharmacistProfileUrl(pharmacyId);
	const getPharmacyProfileConfig = fetchConfig({ url: PharmacyProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getPharmacyProfileConfig);

	const resetShowState = () => setSucces((state) => ({ ...state, show: false }))
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
					{success.show && (
						<Success
							message={success.message}
							callback={resetShowState}
						/>
					)}
					<div className="main-content-wrap">
						<div className="page-content">
							<PharmacistBio pharmDet={data.pharmacist[0]} />
							<PharmacistInfo pharmDet={data.pharmacist[0]} mutate={mutate} setSucces={setSucces} />
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { PharmacyProfile };
