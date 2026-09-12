import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { JUPEP_APPLICATIONS } from "../../../../store/constant";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { OlevelResultSchema } from "../jupebApplicationSchema";
import { Bin, ChevronDownFilled, RedCancel } from "../../../../assets/svgs";
import { useApiPut } from "../../../../api/apiCall";
import { addAndUpdateOLevelUrl } from "../../../../api/urls";
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

	const jupebData = useSelector((state) => state.jupebData);
	const { oLevelResult, Id } = useSelector((state) => state.jupebData);

	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

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
				examinationType: findValueAndLabel(
					sitting?.examinationTypeId ||
						sitting?.examinationType?.value,
					oLevelType
				),
				examNo: sitting?.examNumber || sitting?.examNo,
				examCenter: sitting?.examCenter,
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
			url: addAndUpdateOLevelUrl(Id),
			data: {
				oLevel: oLevelResult?.sittings.map((sitting) => ({
					examCenter: sitting?.examCenter,
					ExaminationTypeId: sitting?.examinationType?.value,
					examNumber: sitting?.examNo,
					examYear: sitting?.examYear?.value,
					cardPin: sitting.cardPin,
					cardSerialNumber: sitting.cardSerialNumber,
					subjectGrade: sitting?.subjects?.reduce(
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
					title: "Successfully uploaded your O-Level result",
					body: "You can now proceed to the next step"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: JUPEP_APPLICATIONS,
					payload: { ...jupebData, oLevelResult }
				});
				replace({ hash: "#section_d", state });
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
							<>
								<Button
									label="Previous"
									buttonClass="standard"
									onClick={() =>
										replace({ hash: "#section_b", state })
									}
								/>
								<Button
									data-cy="submit_personal"
									label="Next"
									buttonClass="primary"
									type="submit"
									loading={isFormLoading}
								/>
							</>
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
											htmlFor={`sittings.${sittingIndex}.examinationTypeId`}
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
													placeholder="Select an O level type"
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
													id={`sittings.${sittingIndex}.examinationTypeId`}
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
											htmlFor={`sittings.${sittingIndex}.examCenterid`}
										>
											Exam Center
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter exam center"
											className="w-100"
											type="text"
											id={`sittings.${sittingIndex}.examCenterid`}
											name={`sittings.${sittingIndex}.examCenter`}
											register={register}
											required
											error={
												errors?.sittings?.[sittingIndex]
													?.examCenter
											}
											errorText={
												errors?.sittings?.[sittingIndex]
													?.examCenter &&
												errors?.sittings?.[sittingIndex]
													?.examCenter?.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											htmlFor={`sittings.${sittingIndex}.examNoid`}
										>
											Exam No
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter exam number"
											className="w-100"
											type="text"
											id={`sittings.${sittingIndex}.examNoid`}
											name={`sittings.${sittingIndex}.examNo`}
											register={register}
											required
											error={
												errors?.sittings?.[sittingIndex]
													?.examNo
											}
											errorText={
												errors?.sittings?.[sittingIndex]
													?.examNo &&
												errors?.sittings?.[sittingIndex]
													?.examNo?.message
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
											<div className="col-lg-2 d-flex align-items-center">
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
													<div className="col-12 col-md-4">
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
															className={`p-2 ${style.cancel} mt-2 mt-md-0`}
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
										<span>
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
