import React, { Fragment } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getNurseProfileUrl } from '../../api/URLs';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import LabImage from "../../assets/img/PharmacistIcon.svg";
import SpinnerLoader from '../Loader/SpinnerLoader';


function NurseProfile({ nurseId }) {
	const getNurseProfile = getNurseProfileUrl(nurseId);
	const getNurseProfileConfig = fetchConfig({ url: getNurseProfile, method: 'get' });
	const { data, error, mutate } = useRequest(getNurseProfileConfig, { revalidateOnFocus: false,});

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
							<Bio bioDetails={data.nurse.nurse} user="nurse" image={LabImage} />
							<ContactDetail
								otherDetails={data.nurse}
								primaryDetails={data.nurse.nurse}
								userId={data.nurse.Id}
								mutate={mutate}
							/>
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { NurseProfile };
