import { useEffect, useState } from "react";
import { InvoiceTitle, Button } from "../../../../../ui_elements";
import {
	getApplicationTypesUrl,
	getApplicationUrl,
	resetApplicationsUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { SearchApplication } from "./components";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { EmptyState } from "../../../../../assets/svgs";

const ApplicationReset = () => {
	const [rrr, setRrr] = useState("");
	const [applicationTypeId, setApplicationTypeId] = useState("");
	const [makeRequest, setMakeRequest] = useState(false);
	const [emptyState, setEmptyState] = useState(true);

	const { mutate, isLoading: isReseting } = useApiPut({ retry: false });

	const { remove, data, isLoading, error } = useApiGet(
		getApplicationUrl(applicationTypeId, rrr),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: makeRequest,
			retry: false
		}
	);

	const {
		data: applicationTypes,
		isLoading: isApplicationTypesLoading,
		error: applicationError
	} = useApiGet(getApplicationTypesUrl(), {
		refetchOnWindowFocus: false,
		keepPreviousData: true
	});

	const allFormattedApplicationTypes = formatSelectItems(
		applicationTypes?.data,
		"name",
		"id"
	);

	let details = [
		{
			title: "Full Name",
			value: data?.data?.fullName?.toUpperCase()
		},
		{ title: "Application Type", value: data?.data?.application },
		{ title: "Application", value: data?.data?.applicationNo },
		{ title: "RRR", value: data?.data?.rrr },
		{ title: "Department", value: data?.data?.department },
		{ title: "Session", value: data?.data?.session }
	];

	const onSubmit = () => {
		const requestBody = {
			url: resetApplicationsUrl(),
			data: {
				ApplicationTypeId: applicationTypeId,
				RRR: data?.data?.rrr
			}
		};

		mutate(requestBody, {
			onSuccess: () => {
				setMakeRequest(false);
				setEmptyState(true);
				remove();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Reset Application",
					body: "Application reset successful"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						"Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		if (error) {
			setMakeRequest(false);
			setEmptyState(true);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: error?.response?.data?.message || "Something went wrong"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [error]);

	if (applicationError)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<section>
			<SearchApplication
				isLoading={isLoading || isApplicationTypesLoading}
				setRrr={setRrr}
				setApplicationTypeId={setApplicationTypeId}
				setMakeRequest={setMakeRequest}
				setEmptyState={setEmptyState}
				applicationTypes={allFormattedApplicationTypes}
			/>
			{data && !emptyState ? (
				<>
					<InvoiceTitle
						className="py-5"
						noMargin={false}
						details={details}
						user={{
							fullName:
								data?.data?.studentData?.fullName.toUpperCase(),
							passPort: data?.data?.passport
						}}
					/>
					<div className="border py-2 d-flex justify-content-end">
						<Button
							type="button"
							buttonClass="primary"
							label="Reset Application"
							onClick={onSubmit}
							loading={isLoading || isReseting}
						/>
					</div>
				</>
			) : emptyState || !data ? (
				<div className="d-flex flex-column align-items-center py-5">
					<EmptyState />
					<h4 className="mt-">
						Your request result will be displayed here
					</h4>
				</div>
			) : (
				""
			)}
		</section>
	);
};

export default ApplicationReset;
