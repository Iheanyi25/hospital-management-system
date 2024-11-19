import React, { useCallback } from "react";
import styles from "./OlevelVerifications/style.module.css";
import {
	Breadcrumbs,
	PageTitle,
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import {
	getOlevelGradeUrl,
	loadOlevelDetailsUrl,
	updateOlevelUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import Avatar from "react-avatar";
// import { yupResolver } from "@hookform/resolvers/yup";

const VerifyOLevel = () => {
	const { state } = useLocation();
	const { replace, goBack } = useHistory();

	if (!state) {
		goBack();
	}

	const { data, applicationType, applicantId } = state;

	const crumbItems = [
		{
			name: "O-Level Verification",
			path: "/utilities/olevel_verification"
		},
		{
			name: `${data?.fullname}`,
			path: "/"
		}
	];

	const { mutate, isLoading: isVerifying } = useApiPost();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			olevelInfo: null
		}
		// resolver: yupResolver(null)
	});

	const {
		data: olevelDetails,
		isLoading: isLoadingOlevelDetails,
		error: olevelError
	} = useApiGet(loadOlevelDetailsUrl(applicationType, applicantId), {
		enabled: true,
		refetchOnWindowFocus: false
	});

	const {
		data: grades,
		isLoading: isLoadingGrades,
		error: gradesError
	} = useApiGet(getOlevelGradeUrl(), {
		enabled: true,
		refetchOnWindowFocus: false
	});

	const getSubjectInputNameFromId = useCallback(
		(sittingIndex, subjectIndex) =>
			`olevelInfo.${sittingIndex}.${
				"_" +
				String(
					Object?.entries(
						olevelDetails?.data?.[sittingIndex]?.subjectGradeId ||
							{}
					)?.[subjectIndex]?.[0]
				)
			}`,
		[olevelDetails]
	);

	const subjectGradeApiReadyConverter = (originalObject) => {
		const convertedObject = {};

		for (const key in originalObject) {
			if (originalObject.hasOwnProperty(key)) {
				const numericKey = key.replace("_", "");
				convertedObject[numericKey] =
					originalObject[key].value.toString();
			}
		}

		return convertedObject;
	};

	const allGrades = [...formatSelectItems(grades?.data, "name", "id")];

	const onSubmit = ({ remarks, olevelInfo }) => {
		const requestBody = {
			url: updateOlevelUrl(),
			data: {
				ApplicationTypeId: applicationType,
				applicantId,
				remarks,
				OlevelInfo: olevelInfo.map((item, index) => ({
					resultHeaderId:
						olevelDetails?.data?.[index]?.resultHeaderId,
					subjectGrade: subjectGradeApiReadyConverter(item)
				}))
			}
		};

		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Olevel Verification",
					body: "Olevel details successfully verified!"
				});
				replace("/utilities/olevel_verification");
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

	if (olevelError || gradesError) return "An error has occurred!";

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.container}>
				<Breadcrumbs crumbs={crumbItems} />
				<PageTitle title={data?.fullname} />
				<div className={styles.page_content}>
					<div className="w-100">
						<Jumbotron
							footerContent={
								<>
									<Button
										data-cy="save"
										label="Save "
										buttonClass="primary"
										type="submit"
										disabled={
											isLoadingGrades ||
											isLoadingOlevelDetails ||
											isVerifying
										}
										loading={isVerifying}
									/>
								</>
							}
							footerStyle="d-flex align-items-center justify-content-flex-end w-100"
						>
							<div
								className={`p-4 d-flex justify-content-start ${styles.profile_container} container-fluid`}
							>
								<div className="d-flex gap-5 flex-wrap">
									<Avatar
										size={200}
										name={data?.fullname}
										src={data?.passport}
									/>
									<div
										className={`${styles.details} d-flex flex-column justify-content-between`}
									>
										<div className="w-100 d-flex align-items-center gap-5">
											<h6>Surname</h6>
											<p className="text-left">
												{data?.lastname}
											</p>
										</div>
										<div className="w-100 d-flex align-items-center gap-5">
											<h6>Firstname</h6>
											<p className="text-left">
												{data?.firstname}
											</p>
										</div>
										<div className="w-100 d-flex align-items-center gap-5">
											<h6>Middlename</h6>
											<p className="text-left">
												{data?.middlename}
											</p>
										</div>
										<div className="w-100 d-flex align-items-center gap-5">
											<h6>Reg No</h6>
											<p className="text-left">
												{data?.jambRegNumber}
											</p>
										</div>
										<div className="w-100 d-flex align-items-center gap-5">
											<h6>Phone No</h6>
											<p className="text-left">
												{data?.mobileNumber}
											</p>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`p-4 d-flex justify-content-center align-items-center border-top ${styles.header}`}
							>
								<h4>O-LEVEL DETAILS</h4>
							</div>

							{isLoadingOlevelDetails || isLoadingGrades ? (
								<Spinner />
							) : (
								olevelDetails?.data?.map((item, levelIndex) => (
									<div key={levelIndex}>
										<div
											className={`p-4 d-flex justify-content-center align-items-center border-top border-bottom flex-column ${styles.header} container-fluid`}
										>
											<div
												className={`d-flex align-items-center gap-3 w-100 container-fluid flex-wrap`}
											>
												<div
													className={`d-flex align-items-center gap-5 `}
												>
													<h6>Exam Type:</h6>
													<p>
														{item?.examinationType}
													</p>
												</div>
												<div
													className={`d-flex align-items-center gap-5 `}
												>
													<h6>Exam No:</h6>
													<p>{item?.examNumber}</p>
												</div>
												<div
													className={`d-flex align-items-center gap-5 `}
												>
													<h6>Card No:</h6>
													<p>
														{
															item?.resultSerialNumber
														}
													</p>
												</div>
											</div>
											<div
												className={`d-flex align-items-center gap-3 w-100 mt-4 container-fluid flex-wrap `}
											>
												<div
													className={`d-flex align-items-center gap-5 `}
												>
													<h6>Exam Year:</h6>
													<p>{item?.examYear}</p>
												</div>
												<div
													className={`d-flex align-items-center gap-5 `}
												>
													<h6>JAMB No:</h6>
													<p>
														{
															item?.state
																?.jambRegNumber
														}
													</p>
												</div>
												<div
													className={`d-flex align-items-center gap-5 `}
												>
													<h6>PIN:</h6>
													<p>{item?.resultPin}</p>
												</div>
											</div>
										</div>

										<section className="w-100 d-flex p-4 container-fluid p-4 border-bottom">
											<p
												className={`flex-grow-0 flex-shrink-1 mr-4 ${styles.subject}`}
											>
												Subject
											</p>
											<p
												className={`flex-grow-0 flex-shrink-0 ${styles.grade}`}
											>
												Grade
											</p>
											<p
												className={`flex-grow-0 flex-shrink-0 ${styles.verified}`}
											>
												Verified Grade
											</p>
										</section>
										<section>
											{Object?.entries(
												item?.subjectGrade
											)?.map(
												([subject, grade], index) => (
													<div
														className="container-fluid px-4 my-4"
														key={index}
													>
														<div className="row">
															<div className="col-lg-6">
																<TextField
																	className="w-100"
																	type="text"
																	value={subject?.toUpperCase()}
																	disabled
																/>
															</div>
															<div className="col-lg-2 ml-3">
																<label>
																	{grade}
																</label>
															</div>
															<div className="col-lg-3">
																<Controller
																	name={getSubjectInputNameFromId(
																		levelIndex,
																		index
																	)}
																	control={
																		control
																	}
																	rules={{
																		required: true
																	}}
																	render={({
																		field
																	}) => (
																		<SMSelect
																			{...field}
																			placeholder="Select a grade"
																			searchable={
																				true
																			}
																			id={`subjectId_${index}`}
																			options={
																				allGrades
																			}
																		/>
																	)}
																/>
															</div>
														</div>
													</div>
												)
											)}
										</section>
									</div>
								))
							)}
							<div className="w-100 p-4 border-top">
								<div>
									<label>Remarks</label>
								</div>
								<div>
									<TextField
										autoComplete="off"
										placeholder="Enter your remarks"
										className="w-100 mt-4"
										inputType="textarea"
										name="remarks"
										register={register}
										required
										error={errors?.remark}
									/>
								</div>
							</div>
						</Jumbotron>
					</div>
				</div>
			</div>
		</form>
	);
};

export default VerifyOLevel;
