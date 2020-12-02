import React, { Fragment, useState } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getAccountantProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import AccountantBio from './profile-components/accountant-profile-components/AccountantBio';
import AccountantInfo from './profile-components/accountant-profile-components/AccountantInfo';
import { Success } from '../Alerts';

function AccountantProfile({ AccountantId }) {
	const [ success, setSucces ] = useState({ show: false, message: '' });
	const accountantProfileUrl = getAccountantProfileUrl(AccountantId);
	const getAccountantProfileConfig = fetchConfig({ url: accountantProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getAccountantProfileConfig);
    
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
                            <AccountantBio accountantDet={data.accountant} />
							<AccountantInfo accountantDet={data.accountant} mutate={mutate} setSucces={setSucces} /> *
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { AccountantProfile };
