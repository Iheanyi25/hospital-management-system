import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { DIRECT_ENTRY } from "../../../../store/constant";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import style from "../style.module.css";

import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { OlevelResultSchema } from "../directEntrySchema";
import { Bin, RedCancel, ChevronDownFilled } from "../../../../assets/svgs";
import { useApiPut } from "../../../../api/apiCall";
import { directEntryOLevelDetailsFormUrl } from "../../../../api/urls";

export const OlevelResult = ({
	oLevelGrades,
	oLevelSubjects,
	examYears,
	oLevelType
}) => {
	const [sittings, setSittings] = useState([0]);
	const [subjectsAndResults] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	const [hideSittingIndex, setHideSittingIndex] = useState(null);

	const directEntryData = useSelector((state) => state.directEntryData);
	const { oLevelResult } = useSelector((state) => state.directEntryData);

	const directEntry = useSelector((state) => state.directEntryData);

	const dispatch = useDispatch();

	const { push } = useHistory();

	const { mutate, isLoading: isFormLoading } = useApiPut();

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: {
			sittings: oLevelResult?.sittings?.map((sitting) => ({
				examinationType:
					findValueAndLabel(sitting?.examinationTypeId, oLevelType) ||
					sitting?.examinationType,
				examNumber: sitting?.examNumber,
				examCentre: sitting?.examCentre,
				examYear:
					findValueAndLabel(sitting?.examYear, examYears) ||
					sitting?.examYear,
				cardPin: sitting?.cardPin,
				cardSerialNumber: sitting?.cardSerialNumber,
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
			}))
		},
		resolver: yupResolver(OlevelResultSchema)
	});

	const clearValues = (subjectName, gradeName) => {
		setValue(subjectName, "");
		setValue(gradeName, "");
	};

	const handleAddAnother = () => {
		if (oLevelResult?.sittings?.length > 1) {
			setSittings([...sittings, sittings[sittings.length - 1] + 1]);
			setHideSittingIndex(sittings.length - 1);
			return;
		}
		setSittings([...sittings, sittings[sittings.length - 1] + 1]);
		setHideSittingIndex(sittings.length - 1);
	};

	const handleDeleteAddAnother = () => {
		setValue("sittings", [getValues()?.sittings?.[0]]);
		setSittings(sittings.slice(0, sittings.length - 1));
		setHideSittingIndex(null);
	};

	const onSubmit = (oLevelResult) => {
		const requestBody = {
			url: directEntryOLevelDetailsFormUrl({
				applicantId: directEntry.Id
			}),
			data: {
				OLevel: oLevelResult?.sittings.map((sitting) => ({
					ExaminationTypeId: sitting?.examinationType?.value,
					ExamCenter: sitting?.examCentre,
					ExamNumber: sitting?.examNumber,
					CardPin: sitting.cardPin,
					CardSerialNumber: sitting.cardSerialNumber,
					ExamYear: sitting?.examYear?.value,
					SubjectGrade: sitting?.subjects?.reduce(
						(total, subject) => ({
							...total,
							[subject?.subject?.value]: subject?.grade?.value
						}),
						{}
					)
				}))
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully completed your direct entry apllication",
					body: ""
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: DIRECT_ENTRY,
					payload: {
						...directEntryData,
						oLevelResult
					}
				});
				push({
					pathname: `/direct_entry_application/preview`,
					state: { details: directEntryData.JambRegNumber }
				});
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

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
				<Jumbotron
					key={sittingIndex}
					headerText={
						sittingIndex === 0 ? (
							<span>First Sitting</span>
						) : (
							<span>Second Sitting</span>
						)
					}
					endText={
						sittings.length > 1 ? (
							<button
								className="clickable"
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
										style={{ transform: "rotate(180deg)" }}
									/>
								) : (
									<ChevronDownFilled />
								)}
							</button>
						) : (
							""
						)
					}
					footerContent={
						sittingIndex === sittings.length - 1 ? (
							<Button
								data-cy="submit_personal"
								label="Next"
								buttonClass="primary"
								type="submit"
								loading={isFormLoading}
							/>
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
											htmlFor={`sittings.${sittingIndex}.examinationTypeid`}
										>
											O Level Type
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name={`sittings.${sittingIndex}.examinationType`}
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
														]?.examinationType
													}
													errorText={
														errors?.sittings?.[
															sittingIndex
														]?.examinationType &&
														errors?.sittings?.[
															sittingIndex
														]?.examinationType
															?.message
													}
													id={`sittings.${sittingIndex}.examinationTypeid`}
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
											Exam Center
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter an exam center"
											className="w-100"
											type="text"
											id={`sittings.${sittingIndex}.examCentreid`}
											name={`sittings.${sittingIndex}.examCentre`}
											register={register}
											required
											error={
												errors?.sittings?.[sittingIndex]
													?.examCentre
											}
											errorText={
												errors?.sittings?.[sittingIndex]
													?.examCentre &&
												errors?.sittings?.[sittingIndex]
													?.examCentre?.message
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
											Exam No
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter an exam number"
											className="w-100"
											type="text"
											id={`sittings.${sittingIndex}.examNumberid`}
											name={`sittings.${sittingIndex}.examNumber`}
											register={register}
											required
											error={
												errors?.sittings?.[sittingIndex]
													?.examNumber
											}
											errorText={
												errors?.sittings?.[sittingIndex]
													?.examNumber &&
												errors?.sittings?.[sittingIndex]
													?.examNumber?.message
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
											Exam Year
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
													placeholder="Select an exam year"
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
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											htmlFor={`sittings.${sittingIndex}.cardPin`}
										>
											O Level Card PIN
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter card pin"
											className="w-100"
											type="text"
											id={`sittings.${sittingIndex}.cardPin`}
											name={`sittings.${sittingIndex}.cardPin`}
											register={register}
											required
											error={
												errors?.sittings?.[sittingIndex]
													?.cardPin
											}
											errorText={
												errors?.sittings?.[sittingIndex]
													?.cardPin &&
												errors?.sittings?.[sittingIndex]
													?.cardPin?.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											htmlFor={`sittings.${sittingIndex}.cardSerialNumber`}
										>
											O Level Card Serial
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter card serial number"
											className="w-100"
											type="text"
											id={`sittings.${sittingIndex}.cardSerialNumber`}
											name={`sittings.${sittingIndex}.cardSerialNumber`}
											register={register}
											required
											error={
												errors?.sittings?.[sittingIndex]
													?.cardSerialNumber
											}
											errorText={
												errors?.sittings?.[sittingIndex]
													?.cardSerialNumber &&
												errors?.sittings?.[sittingIndex]
													?.cardSerialNumber?.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
								<span>Subject &amp; Results</span>
							</div>
							{subjectsAndResults.map((_, index) => (
								<>
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
													<div className="col-7">
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
													<div className="col-4">
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
								</>
							))}
							<div className="border-top px-4 py-3 text-right">
								{sittingIndex === sittings.length - 1 &&
								!(sittings.length >= 2) ? (
									<button
										className="clickable"
										type="button"
										onClick={handleAddAnother}
									>
										<span className="text-primary">
											+ Click to add Second Sitting
										</span>
									</button>
								) : sittingIndex === 1 &&
								  sittings.length >= 2 ? (
									<button
										className="clickable"
										type="button"
										onClick={handleDeleteAddAnother}
									>
										<Bin className="mr-1 align-middle" />
										<span className="text-danger">
											Delete Second Sitting
										</span>
									</button>
								) : (
									""
								)}
							</div>
						</>
					) : (
						""
					)}
				</Jumbotron>
			))}
		</form>
	);
};
