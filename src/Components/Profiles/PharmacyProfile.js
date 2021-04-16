import React, { Fragment } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getPharmacistProfileUrl } from '../../api/URLs';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import PharmacistImage from "../../assets/img/PharmacistIcon.svg";
import SpinnerLoader from '../Loader/SpinnerLoader';

function PharmacyProfile({ pharmacyId }) {
	const PharmacyProfileUrl = getPharmacistProfileUrl(pharmacyId);
	const getPharmacyProfileConfig = fetchConfig({ url: PharmacyProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getPharmacyProfileConfig, {revalidateOnFocus: false});

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
							<Bio bioDetails={data.pharmacist} image={PharmacistImage} />
							<ContactDetail
								otherDetails={data}
								primaryDetails={data.pharmacist}
								userId={data.pharmacist.pharmacistId}
								mutate={mutate}
							/>
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { PharmacyProfile };
