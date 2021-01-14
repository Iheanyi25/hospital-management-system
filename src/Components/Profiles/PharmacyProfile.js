import React, { Fragment, useState } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getPharmacistProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import { Success } from '../Alerts';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import PharmacistImage from "../../assets/img/PharmacistIcon.svg";

function PharmacyProfile({ pharmacyId }) {
	const [ success, setSucces ] = useState({ show: false, message: '' });
	const PharmacyProfileUrl = getPharmacistProfileUrl(pharmacyId);
	const getPharmacyProfileConfig = fetchConfig({ url: PharmacyProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getPharmacyProfileConfig, {revalidateOnFocus: false});

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
							<Bio bioDetails={data.pharmacist[0].pharmacy} image={PharmacistImage} />
							<ContactDetail
								otherDetails={data.pharmacist[0]}
								primaryDetails={data.pharmacist[0].pharmacy}
								userId={data.pharmacist[0].pharmacyId}
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

export { PharmacyProfile };
