import React, {Fragment, useState} from 'react'
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getLabProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import LabBio from './profile-components/lab-profile-components/LabBio';
import LabInfo from './profile-components/lab-profile-components/LabInfo';
import { Success } from '../Alerts';

function LabProfile({labId}) {
    const [ success, setSucces ] = useState({ show: false, message: '' });
    const labProfileUrl = getLabProfileUrl(labId);
    const getLabProfileConfig = fetchConfig({ url: labProfileUrl, method: 'get', });
    const { data, error, mutate } = useRequest(getLabProfileConfig);
    
    const resetShowState = () => setSucces((state) => ({ ...state, show: false }))
    console.log(data, error, "++++++++++++++==")
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
							<LabBio labDet={data.lab[0]} />
							<LabInfo pharmDet={data.lab[0]} mutate={mutate} setSucces={setSucces} />
						</div>
					</div>
				</main>
			)}
		</Fragment>
    )
}

export { LabProfile };

