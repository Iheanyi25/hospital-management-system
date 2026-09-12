import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getSundrySessionsUrl,
	getSundryPaymentPurposesUrl,
	initiateSundryFeePaymentUrl,
	yearOfStudyUrl
} from "../../../../../../api/urls";
import {
	Breadcrumbs,
	PageTitle,
	Button,
	Jumbotron,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";
import {
	PAYMENTTYPES,
	STUDENT_TYPE_HOLDER
} from "../../../../../../utils/constants";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import styles from "./style.module.css";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

const SelectSession = () => {
	const crumbs = [
		{
			name: "Sundry Fees",
			path: "/academic_fees/sundry"
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
	const [paymentPurposeId, setPaymentPurposeId] = useState("");
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId }),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: paymentPurposes, isLoading: isLoadingPaymentPurposes } =
		useApiGet(getSundryPaymentPurposesUrl(), {
			refetchOnWindowFocus: false
		});
	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error
	} = useApiGet(getSundrySessionsUrl(paymentPurposeId), {
		enabled: !!paymentPurposeId
	});
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allPaymentPurposes = formatSelectItems(
		paymentPurposes?.data,
		"name",
		"id"
	);
	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			paymentType: PAYMENTTYPES[0]
		}
	});

	const {
		data,
		isLoading: makingRequest,
		error: requestError
	} = useApiGet(
		initiateSundryFeePaymentUrl({
			sessionId: requestData?.session?.value,
			paymentTypeId: requestData?.paymentType?.value,
			levelId: requestData?.levelId?.value,
			paymentPurposeId: requestData?.paymentPurposeId?.value
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
	useEffect(() => {
		const subscription = watch(({ paymentPurposeId }) => {
			setPaymentPurposeId(paymentPurposeId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	useEffect(() => {
		if (data?.success && makeRequest && !makingRequest) {
			history.push({
				pathname: "/academic_fees/sundry/generate_invoice",
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
	if (isLoadingLevels || isLoadingPaymentPurposes) return <Spinner />;
	if (error)
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
											<label
												className="font-weight-bold"
												htmlFor="paymentPurposeId"
											>
												Payment Purpose
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="paymentPurposeId"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="paymentPurposeId"
														placeholder="Select Payment Purpose"
														options={
															allPaymentPurposes
														}
														onChange={(value) =>
															fieldSetterAndClearer(
																{
																	value,
																	setterFunc:
																		setValue,
																	setField:
																		"paymentPurposeId",
																	clearFields:
																		[
																			"session"
																		]
																}
															)
														}
														searchable={false}
														isError={
															!!errors.paymentPurposeId
														}
													/>
												)}
											/>
										</div>
									</div>
									{isLoadingSessions ? (
										<div className="row mt-5">
											<div className="col-lg-3  d-flex align-items-center">
												<label className="font-weight-bold">
													Academic Session
												</label>
											</div>
											<div className="col-lg-9">
												<Spinner />
											</div>
										</div>
									) : (
										allSessions?.length > 0 &&
										paymentPurposeId && (
											<div className="row mt-5">
												<div className="col-lg-3  d-flex align-items-center">
													<label className="font-weight-bold">
														Academic Session
													</label>
												</div>
												<div className="col-lg-9">
													<Controller
														name="session"
														control={control}
														rules={{
															required: true
														}}
														render={({ field }) => (
															<SMSelect
																{...field}
																options={
																	allSessions
																}
																placeholder="Select Academic Session"
																searchable={
																	false
																}
																isError={
																	!!errors.session
																}
															/>
														)}
													/>
												</div>
											</div>
										)
									)}
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
														options={PAYMENTTYPES}
														searchable={false}
														isError={
															!!errors.paymentType
														}
														disabled
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
