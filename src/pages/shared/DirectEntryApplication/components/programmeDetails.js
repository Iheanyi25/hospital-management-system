import React from "react";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { DIRECT_ENTRY } from "../../../../store/constant";
import { ProgrammeDetailsSchema } from "../directEntrySchema";
import { useApiPost } from "../../../../api/apiCall";
import { directEntryProgrammeDetailsFormUrl } from "../../../../api/urls";
import { useState } from "react";
import { RedCancel } from "../../../../assets/svgs";
import style from "../style.module.css";
import { useMemo } from "react";

export const ProgrammeDetails = ({
	allDepartments,
	allCertificateTypes,
	oLevelGrades,
	oLevelSubjects,
	allDegreeCertificateGrades,
	allDirectEntryGrades,
	fromDirectEntryState
}) => {
	const directEntry = useSelector((state) => state.directEntryData);
	const { programmeInfo } = directEntry;
	const [subjectsAndResults] = useState([0, 1, 2]);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();


	if (!state) {
		replace("/direct_entry_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();


	const {
		register,
		control,
		handleSubmit,
		setValue,
		clearErrors,
		getValues,
		trigger,
		formState: { errors }
	} = useForm({
		defaultValues: {
			department: programmeInfo?.department,
			certificateType: programmeInfo?.certificateType,
			grade: programmeInfo?.grade,
			cgpa: programmeInfo?.cgpa,
			previousSchool: programmeInfo?.previousSchool,
			previousCourse: programmeInfo?.previousCourse,
			regNo: directEntry?.JambRegNumber,
			aLevelSubjects: programmeInfo?.aLevelSubjects
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const currentCertificateType = getValues()?.certificateType?.label;

	const allGrades = useMemo(
		() =>
			currentCertificateType === "Degree"
				? allDegreeCertificateGrades
				: allDirectEntryGrades,
		[
			allDegreeCertificateGrades,
			allDirectEntryGrades,
			currentCertificateType
		]
	);


	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: directEntryProgrammeDetailsFormUrl(),
			data: {
				ApplicantId: directEntry.Id,
				DepartmentId: programmeInfo.department.value,
				CertificateTypeId: programmeInfo.certificateType.value,
				...(currentCertificateType !== "Degree" ||
					currentCertificateType !== "A Level" || 
					currentCertificateType !== "JUPEB"
					? { DirectEntryGradeId: programmeInfo?.grade?.value }
					: currentCertificateType === "Degree"
						? { DegreeCertificateId: programmeInfo?.grade?.value }
						: ""),
				CGPA: fromDirectEntryState ? parseFloat(programmeInfo.cgpa) : programmeInfo.cgpa,
				PreviousSchool: programmeInfo.previousSchool,
				PreviousCourse: programmeInfo.previousCourse,
				...((currentCertificateType === "A Level" || currentCertificateType === "JUPEB") && {
					SubjectGrade: programmeInfo?.aLevelSubjects?.reduce(
						(total, subject) => ({
							...total,
							[subject?.subject?.value]: subject?.grade?.value
						}),
						{}
					)
				})
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Details saved successfully",
					body: "Your programme details has been successfully saved"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: DIRECT_ENTRY,
					payload: {
						...directEntry,
						programmeInfo
					}
				});
				replace({ hash: "#section_c", state });
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

	const clearValues = (subjectName, gradeName) => {
		setValue(subjectName, "");
		setValue(gradeName, "");
	};

	const onCertificateTypeChange = (value) => {
		setValue("certificateType", value);
		setValue("grade", null);
		clearErrors("certificateType");
	};

	const onSubjectGradeChange = (value, index, type = "subject") => {
		setValue(`aLevelSubjects.${index}.${type}`, value);
		trigger("aLevelSubjects");
		clearErrors("aLevelSubjects");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Programme Details</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="department">Department</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="department"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a department"
										searchable={true}
										id="department"
										options={allDepartments}
										isError={errors.department}
										disabled={fromDirectEntryState}
										errorText={
											errors.department &&
											errors.department.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="regNo">Reg No</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter registration number"
								className="w-100"
								type="text"
								id="regNo"
								name="regNo"
								register={register}
								required
								error={errors.regNo}
								errorText={errors.regNo && errors.regNo.message}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="certificateType">
								Certificate Type
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="certificateType"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select certificate type"
										searchable={true}
										id="certificateType"
										onChange={onCertificateTypeChange}
										// disabled={fromDirectEntryState}
										options={allCertificateTypes}
										isError={errors.certificateType}
										errorText={
											errors.certificateType &&
											errors.certificateType.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{(currentCertificateType === "A Level" || currentCertificateType === "JUPEB") ? (
					<>
						<div className="px-4 py-3 jumbotron-header jumbo-header">
							<span>A'Level Subject (Best 3 Subjects)</span>
						</div>
						{subjectsAndResults.map((_, index) => (
							<React.Fragment key={index}>
								<div className="container-fluid px-4 my-4">
									<div className="row">
										<div className="col-lg-3 d-flex align-items-center">
											<label
												htmlFor={`aLevelSubjects.${index}.subject`}
											>
												Subject
											</label>
										</div>
										<div className="col-lg-9">
											<div
												className="row gap-2 gap-md-0"
												id="full_name"
											>
												<div className="col-md-7">
													<Controller
														name={`aLevelSubjects.${index}.subject`}
														control={control}
														rules={{
															required: true
														}}
														render={({ field }) => (
															<SMSelect
																{...field}
																placeholder="Select subject"
																searchable={
																	true
																}
																onChange={(
																	event
																) =>
																	onSubjectGradeChange(
																		event,
																		index
																	)
																}
																options={
																	oLevelSubjects
																}
																id={`aLevelSubjects.${index}.subject`}
															/>
														)}
													/>
												</div>
												<div className="col-md-4">
													<Controller
														name={`aLevelSubjects.${index}.grade`}
														control={control}
														rules={{
															required: true
														}}
														render={({ field }) => (
															<SMSelect
																{...field}
																placeholder="Select grade"
																searchable={
																	true
																}
																onChange={(
																	event
																) =>
																	onSubjectGradeChange(
																		event,
																		index,
																		"grade"
																	)
																}
																options={
																	oLevelGrades
																}
																id={`aLevelSubjects.${index}.grade`}
															/>
														)}
													/>
												</div>
												<div
													className={`col-md-1 d-flex`}
												>
													<span
														className={`p-2 ${style.cancel}`}
														role="button"
														onClick={() =>
															clearValues(
																`aLevelSubjects.${index}.subject`,
																`aLevelSubjects.${index}.grade`
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
							</React.Fragment>
						))}
						{errors?.aLevelSubjects?.type === "duplicate" ||
							errors?.aLevelSubjects?.type === "incomplete" ? (
							<div className="px-4 py-2 bg-danger">
								<p className="text-white">
									{errors?.aLevelSubjects?.message}
								</p>
							</div>
						) : (
							""
						)}
					</>
				) : (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="grade">Grade</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="grade"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select grade"
											searchable={true}
											id="grade"
											disabled={!currentCertificateType}
											options={allGrades}
											isError={errors.grade}
											errorText={
												errors.grade &&
												errors.grade.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="cgpa">
								CGPA for Previous Certificate Result
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter CGPA"
								className="w-100"
								type="text"
								id="cgpa"
								name="cgpa"
								register={register}
								// disabled={fromDirectEntryState}
								required
								error={errors.cgpa}
								errorText={errors.cgpa && errors.cgpa.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="previousSchool">
								Name of Previous School
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter name of previous school"
								className="w-100"
								type="text"
								id="previousSchool"
								name="previousSchool"
								register={register}
								// disabled={fromDirectEntryState}
								required
								error={errors.previousSchool}
								errorText={
									errors.previousSchool &&
									errors.previousSchool.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="previousCourse">
								Previous Course
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter previous course"
								className="w-100"
								type="text"
								id="previousCourse"
								name="previousCourse"
								register={register}
								required
								error={errors.previousCourse}
								// disabled={fromDirectEntryState}
								errorText={
									errors.previousCourse &&
									errors.previousCourse.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
