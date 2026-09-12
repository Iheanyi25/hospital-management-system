import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getSchoolFeesPaymentTypesUrl,
	getSessionsUrl,
	initiateSchoolFeesPaymentUrl,
	yearOfStudyUrl
} from "../../../../../../api/urls";
import {
	Breadcrumbs,
	PageTitle,
	Button,
	Jumbotron,
	SMSelect,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import {
	STUDENT_TYPES,
	STUDENT_TYPE_HOLDER
} from "../../../../../../utils/constants";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import styles from "./style.module.css";

const SelectSession = () => {
	const crumbs = [
		{
			name: "School Fees",
			path: "/academic_fees/school_fees"
		},
		{
			name: "Select Session",
			path: ""
		}
	];

	const [cookies] = useCookies([STUDENT_TYPE_HOLDER]);
	const { [STUDENT_TYPE_HOLDER]: studentTypeId } = cookies;

	const history = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const [requestData, setRequestData] = useState({});
	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymentTypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const { data: sessions, isLoading, error } = useApiGet(getSessionsUrl());
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId }),
		{
			refetchOnWindowFocus: false
		}
	);
	const allLevels = formatSelectItems(levels?.data, "name", "id");

	const student = useContext(ProfileContext);
	const isJupebStudent =
		student?.profileData?.programmeDetail?.studentTypeId ===
		STUDENT_TYPES.JUPEB;
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			levelId: allLevels[0]
		}
	});
	const {
		data,
		isLoading: makingRequest,
		error: requestError
	} = useApiGet(
		initiateSchoolFeesPaymentUrl({
			sessionId: requestData?.session?.value,
			paymentTypeId: requestData?.paymentType?.value,
			levelId: requestData?.levelId?.value
		}),
		{
			enabled: makeRequest,
			refetchOnWindowFocus: false
		}
	);

	const onSubmit = (data) => {
		setRequestData(data);
		setMakeRequest(true);
	};

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allPaymentTypes = formatSelectItems(paymentTypes?.data, "name", "id");

	useEffect(() => {
		if (data?.success && makeRequest && !makingRequest) {
			history.push({
				pathname: "/academic_fees/school_fees/generate_invoice",
				state: data?.data
			});
		}
		if (requestError && makeRequest && !makingRequest) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [data, requestError, history, makeRequest, makingRequest]);

	if (isLoading || isLoadingLevels || isPaymentTypesLoading)
		return <Spinner />;
	if (error || paymentTypesError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<div className="row">
				<div className="col-12 col-md-1"></div>
				<div className="col-12 col-md-10">
					<Breadcrumbs crumbs={crumbs} />
					<header className="mt-2">
						<PageTitle title="Generate Invoice" />
					</header>
					<main className={styles.page_content}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Jumbotron
								headerText="Select Session"
								footerContent={
									<Button
										data-cy="select"
										buttonClass="primary"
										label="Submit"
										type="submit"
										loading={makingRequest}
									/>
								}
								footerStyle="d-flex justify-content-end"
							>
								<section className="p-4">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label className="font-weight-bold">
												Academic Session
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="session"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<SMSelect
														{...field}
														options={allSessions}
														placeholder="Select Academic Session"
														searchable={false}
														isError={
															!!errors.session
														}
													/>
												)}
											/>
										</div>
									</div>
									<div className="row mt-5">
										<div className="col-lg-3  d-flex align-items-center">
											<label className="font-weight-bold">
												Payment Type
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="paymentType"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<SMSelect
														{...field}
														placeholder="Select Payment Type"
														options={
															allPaymentTypes
														}
														searchable={false}
														isError={
															!!errors.paymentType
														}
													/>
												)}
											/>
										</div>
									</div>
									<div className="row mt-5">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												className="font-weight-bold"
												htmlFor="levelId"
											>
												Level
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="levelId"
												control={control}
												defaultValue={
													isJupebStudent
														? allLevels[0]
														: null
												}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="levelId"
														placeholder="Select Year of Study"
														options={allLevels}
														searchable={false}
														disabled={
															isJupebStudent
														}
														isError={
															!!errors.levelId
														}
													/>
												)}
											/>
										</div>
									</div>
								</section>
							</Jumbotron>
						</form>
					</main>
				</div>
			</div>
		</section>
	);
};

export default SelectSession;
