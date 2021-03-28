import React, { Fragment } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getLabProfileUrl } from '../../api/URLs';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import LabImage from "../../assets/img/PharmacistIcon.svg";
import SpinnerLoader from '../Loader/SpinnerLoader';


function LabProfile({ labId }) {
	const labProfileUrl = getLabProfileUrl(labId);
	const getLabProfileConfig = fetchConfig({ url: labProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getLabProfileConfig, { revalidateOnFocus: false,});

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
							<Bio bioDetails={data.labAttendant} user="lab" image={LabImage} />
							<ContactDetail
								otherDetails={data}
								primaryDetails={data.labAttendant}
								userId={data.labId}
								mutate={mutate}
							/>
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { LabProfile };
