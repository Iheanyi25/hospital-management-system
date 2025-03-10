import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../../store/constant";

import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	SecondaryLink
} from "../../../../ui_elements";

import { yupResolver } from "@hookform/resolvers/yup";
import { OlevelResultSchema } from "../hndSchema";

import { Bin, ChevronDownFilled, RedCancel } from "../../../../assets/svgs";
import { hndOLevelDetailsFormUrl } from "../../../../api/urls";
import { useApiPost } from "../../../../api/apiCall";

import style from "../style.module.css";

export const OlevelResult = ({
	oLevelGrades,
	oLevelSubjects,
	examYears,
	oLevelType
}) => {
	const [sittings, setSittings] = useState([0]);
	const [subjectsAndResults] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	const [hideSittingIndex, setHideSittingIndex] = useState(null);

	const putmeStoreData = useSelector((state) => state.putmeData);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/hnd_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: {
			sittings: putmeStoreData?.oLevelResult?.sittings?.map(
				(sitting) => ({
					oLevelType: sitting?.oLevelType,
					resultPin: sitting?.resultPin,
					resultPinSno: sitting?.resultPinSno,
					examNumber: sitting?.examNumber,
					examCentre: sitting?.examCentre,
					examYear: sitting?.examYear,
					subjects: sitting?.subjects?.map((subject) => ({
						subject: {
							value: subject?.subject?.value,
							label: subject?.subject?.label
						},
						grade: {
							value: subject?.grade?.value,
							label: subject?.grade?.label
						}
					}))
				})
			)
		},
		resolver: yupResolver(OlevelResultSchema)
	});

	const handleAddAnother = () => {
		setSittings((prevSittings) => [
			...prevSittings,
			prevSittings[prevSittings?.length - 1] + 1
		]);
		setHideSittingIndex((prevHideSittings) => prevHideSittings?.length - 1);
	};

	const handleDeleteAddAnother = () => {
		setValue("sittings", [getValues()?.sittings?.[0]]);
		setSittings(sittings.slice(0, sittings.length - 1));
		setHideSittingIndex(null);
	};

	const clearValues = (subjectName, gradeName) => {
		setValue(subjectName, "");
		setValue(gradeName, "");
	};

	const onSubmit = (oLevelResult) => {
		const requestBody = {
			url: hndOLevelDetailsFormUrl(),
			data: {
				ApplicantId:
					putmeStoreData?.personalInfo
						?.postUtmeApplicantBasicInformationId,
				OlevelInfo: oLevelResult?.sittings.map((sitting) => ({
					ExaminationTypeId: sitting?.oLevelType?.value,
					ExamCenter: sitting?.examCentre,
					ExamNumber: sitting?.examNumber,
					ExamYear: sitting?.examYear?.value,
					SubjectGrade: sitting?.subjects?.reduce(
						(total, subject) => ({
							...total,
							[subject?.subject?.value]: subject?.grade?.value
						}),
						{}
					),
					ResultPin: sitting?.resultPin,
					ResultSerialNumber: sitting?.resultPinSno
				}))
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Details saved successfully",
					body: "Your O-Level result has been successfully uploaded"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_PUTME_INFO,
					payload: {
						...putmeStoreData,
						oLevelResult
					}
				});
				replace({ hash: "#section_d", state });
			},
			onError: (error) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: `${error.response.data.message}`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		if (putmeStoreData?.oLevelResult?.sittings?.length === 2) {
			setSittings((prevSittings) => [
				...prevSittings,
				prevSittings[prevSittings?.length - 1] + 1
			]);
			setHideSittingIndex(
				(prevHideSittings) => prevHideSittings?.length - 1
			);
		}
	}, [putmeStoreData?.oLevelResult?.sittings?.length]);

	useEffect(() => {
		if (
			errors?.sittings?.[0]?.subjects?.type === "incomplete" ||
			errors?.sittings?.[1]?.subjects?.type === "incomplete"
		) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have to select at least 8 subjects and their respective grade"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		} else if (
			errors?.sittings?.[0]?.subjects?.type === "duplicate" ||
			errors?.sittings?.[1]?.subjects?.type === "duplicate"
		) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have duplicate entries in your subjects"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [errors?.sittings]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{sittings.map((_, sittingIndex) => (
				<div key={sittingIndex}>
					<Jumbotron
						headerText={
							sittingIndex === 0 ? (
								<span>First Sitting</span>
							) : (
								<span>Second Sitting</span>
							)
						}
						endText={
							sittings.length > 1 ? (
								<div className="d-flex">
									<p className="me-2">Step 3 of 4</p>
									<button
										className="clickable"
										type="button"
										onClick={() =>
											setHideSittingIndex((prevIndex) =>
												prevIndex !== sittingIndex
													? sittingIndex
													: null
											)
										}
									>
										{sittingIndex !== hideSittingIndex ? (
											<ChevronDownFilled
												style={{
													transform: "rotate(180deg)"
												}}
											/>
										) : (
											<ChevronDownFilled />
										)}
									</button>
								</div>
							) : (
								"Step 3 of 4"
							)
						}
						footerContent={
							sittingIndex === sittings.length - 1 ? (
								<div>
									<Button
										data-cy="back"
										label="Previous"
										buttonClass="secondary"
										type="button"
										disabled={isFormLoading}
										onClick={() =>
											replace({
												hash: "#section_a",
												state
											})
										}
									/>
									<Button
										data-cy="submit_personal"
										label="Next"
										buttonClass="primary"
										type="submit"
										loading={isFormLoading}
									/>
								</div>
							) : (
								""
							)
						}
						footerStyle="d-flex justify-content-end"
					>
						{hideSittingIndex !== sittingIndex ? (
							<>
								<div
									className="container-fluid px-4 my-4"
									key={sittingIndex}
								>
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												htmlFor={`sittings.${sittingIndex}.oLevelTypeid`}
											>
												O Level Type*
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name={`sittings.${sittingIndex}.oLevelType`}
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<SMSelect
														{...field}
														placeholder="Select O Level Type"
														searchable={true}
														options={oLevelType}
														isError={
															errors?.sittings?.[
																sittingIndex
															]?.oLevelType
														}
														errorText={
															errors?.sittings?.[
																sittingIndex
															]?.oLevelType &&
															errors?.sittings?.[
																sittingIndex
															]?.oLevelType
																?.message
														}
														id={`sittings.${sittingIndex}.oLevelTypeid`}
													/>
												)}
											/>
										</div>
									</div>
								</div>
								<div className="container-fluid px-4 my-4">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												htmlFor={`sittings.${sittingIndex}.examCentreid`}
											>
												Exam Centre*
											</label>
										</div>
										<div className="col-lg-9">
											<TextField
												autoComplete="off"
												placeholder="Enter exam center"
												className="w-100"
												type="text"
												id={`sittings.${sittingIndex}.examCentreid`}
												name={`sittings.${sittingIndex}.examCentre`}
												register={register}
												required
												error={
													errors?.sittings?.[
														sittingIndex
													]?.examCentre
												}
												errorText={
													errors?.sittings?.[
														sittingIndex
													]?.examCentre &&
													errors?.sittings?.[
														sittingIndex
													]?.examCentre?.message
												}
											/>
										</div>
									</div>
								</div>
								<div className="container-fluid px-4 my-4">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												htmlFor={`sittings.${sittingIndex}.examNumberid`}
											>
												Exam No*
											</label>
										</div>
										<div className="col-lg-9">
											<TextField
												autoComplete="off"
												placeholder="Enter exam number"
												className="w-100"
												type="text"
												id={`sittings.${sittingIndex}.examNumberid`}
												name={`sittings.${sittingIndex}.examNumber`}
												register={register}
												required
												error={
													errors?.sittings?.[
														sittingIndex
													]?.examNumber
												}
												errorText={
													errors?.sittings?.[
														sittingIndex
													]?.examNumber &&
													errors?.sittings?.[
														sittingIndex
													]?.examNumber?.message
												}
											/>
										</div>
									</div>
								</div>
								<div className="container-fluid px-4 my-4">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												htmlFor={`sittings.${sittingIndex}.examYearid`}
											>
												Exam Year*
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name={`sittings.${sittingIndex}.examYear`}
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<SMSelect
														{...field}
														placeholder="Select exam year"
														searchable={true}
														options={examYears}
														isError={
															errors?.sittings?.[
																sittingIndex
															]?.examYear
														}
														errorText={
															errors?.sittings?.[
																sittingIndex
															]?.examYear &&
															errors?.sittings?.[
																sittingIndex
															]?.examYear?.message
														}
														id={`sittings.${sittingIndex}.examYearid`}
													/>
												)}
											/>
										</div>
									</div>
								</div>
								{/* <div className="container-fluid px-4 my-4">
									<div className="row">
										<div className="col-lg-3 d-flex align-items-center">
											<label
												htmlFor={`sittings.${sittingIndex}.resultPinid`}
											>
												O Level Card PIN
											</label>
										</div>
										<div className="col-lg-9">
											<TextField
												autoComplete="off"
												placeholder="Enter O Level Card PIN"
												className="w-100"
												type="text"
												id={`sittings.${sittingIndex}.resultPinid`}
												name={`sittings.${sittingIndex}.resultPin`}
												register={register}
												required
												error={
													errors?.sittings?.[
														sittingIndex
													]?.resultPin
												}
												errorText={
													errors?.sittings?.[
														sittingIndex
													]?.resultPin &&
													errors?.sittings?.[
														sittingIndex
													]?.resultPin?.message
												}
											/>
										</div>
									</div>
								</div> */}
								{/* <div className="container-fluid px-4 my-4">
									<div className="row">
										<div className="col-lg-3 d-flex align-items-center">
											<label
												htmlFor={`sittings.${sittingIndex}.resultPinSnoid`}
											>
												O Level Card Serial Number
											</label>
										</div>
										<div className="col-lg-9">
											<TextField
												autoComplete="off"
												placeholder="Enter O Level Card Serial Number"
												className="w-100"
												type="text"
												id={`sittings.${sittingIndex}.resultPinSnoid`}
												name={`sittings.${sittingIndex}.resultPinSno`}
												register={register}
												required
												error={
													errors?.sittings?.[
														sittingIndex
													]?.resultPinSno
												}
												errorText={
													errors?.sittings?.[
														sittingIndex
													]?.resultPinSno &&
													errors?.sittings?.[
														sittingIndex
													]?.resultPinSno?.message
												}
											/>
										</div>
									</div>
								</div> */}
								<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
									<span>Subject &amp; Results</span>
								</div>
								{subjectsAndResults.map((_, index) => (
									<div
										className="container-fluid px-4 my-4"
										key={index}
									>
										<div className="row">
											<div className="col-lg-3 d-flex align-items-center">
												<label
													htmlFor={`sittings.${sittingIndex}.subjects.${index}.subjectId`}
												>
													Subject
												</label>
											</div>
											<div className="col-lg-9">
												<div
													className="row"
													id="full_name"
												>
													<div className="col-12 col-md-7 mb-3 mb-md-0">
														<Controller
															name={`sittings.${sittingIndex}.subjects.${index}.subject`}
															control={control}
															rules={{
																required: true
															}}
															render={({
																field
															}) => (
																<SMSelect
																	{...field}
																	placeholder="Select subject"
																	searchable={
																		true
																	}
																	options={
																		oLevelSubjects
																	}
																	isError={
																		errors
																			?.sittings?.[
																			sittingIndex
																		]
																			?.subjects?.[
																			index
																		]
																			?.subject
																	}
																	errorText={
																		errors
																			?.sittings?.[
																			sittingIndex
																		]
																			?.subjects?.[
																			index
																		]
																			?.subject &&
																		errors
																			?.sittings?.[
																			sittingIndex
																		]
																			?.subjects?.[
																			index
																		]
																			?.subject
																			?.message
																	}
																	id={`sittings.${sittingIndex}.subjects.${index}.subjectId`}
																/>
															)}
														/>
													</div>
													<div className="col-12 col-md-4 mb-3 mb-md-0">
														<Controller
															name={`sittings.${sittingIndex}.subjects.${index}.grade`}
															control={control}
															rules={{
																required: true
															}}
															render={({
																field
															}) => (
																<SMSelect
																	{...field}
																	placeholder="Select grade"
																	searchable={
																		true
																	}
																	options={
																		oLevelGrades
																	}
																	isError={
																		errors
																			?.sittings?.[
																			sittingIndex
																		]
																			?.subjects?.[
																			index
																		]?.grade
																	}
																	errorText={
																		errors
																			?.sittings?.[
																			sittingIndex
																		]
																			?.subjects?.[
																			index
																		]
																			?.grade &&
																		errors
																			?.sittings?.[
																			sittingIndex
																		]
																			?.subjects?.[
																			index
																		]?.grade
																			?.message
																	}
																	id={`sittings.${sittingIndex}.subjects.${index}.gradeId`}
																/>
															)}
														/>
													</div>
													<div
														className={`col-1 d-flex`}
													>
														<span
															className={`p-2 ${style.cancel}`}
															role="button"
															onClick={() =>
																clearValues(
																	`sittings.${sittingIndex}.subjects.${index}.subject`,
																	`sittings.${sittingIndex}.subjects.${index}.grade`
																)
															}
														>
															<RedCancel className="align-middle" />
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
								<div className="border-top px-4 py-3 text-right">
									{sittingIndex === sittings.length - 1 &&
									!(sittings.length >= 2) ? (
										<SecondaryLink
											label="+ Click to add Second Sitting"
											onClick={handleAddAnother}
										/>
									) : sittingIndex === 1 &&
									  sittings.length >= 2 ? (
										<SecondaryLink
											linkType="danger-link"
											label={
												<>
													<Bin className="mr-1 align-middle" />
													<span>
														Delete Second Sitting
													</span>
												</>
											}
											onClick={handleDeleteAddAnother}
										/>
									) : (
										""
									)}
								</div>
							</>
						) : (
							""
						)}
					</Jumbotron>
				</div>
			))}
		</form>
	);
};
