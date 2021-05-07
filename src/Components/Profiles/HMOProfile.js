import React, { Fragment } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getHMOAdminUrl } from '../../api/URLs';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import LabImage from "../../assets/img/PharmacistIcon.svg";
import SpinnerLoader from '../Loader/SpinnerLoader';


function HMOProfile({ hmoId }) {
	const getHMOAdmin = getHMOAdminUrl(hmoId);
	const getHMOAdminConfig = fetchConfig({ url: getHMOAdmin, method: 'get' });
	const { data, error, mutate } = useRequest(getHMOAdminConfig, { revalidateOnFocus: false,});

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
							<Bio bioDetails={data.hmoAdmin} user="hmoAdmin" image={LabImage} />
							<ContactDetail
								otherDetails={data.hmoAdmin}
								primaryDetails={data.hmoAdmin}
								userId={data.hmoAdmin.hmoAdminId}
								mutate={mutate}
							/>
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { HMOProfile };
