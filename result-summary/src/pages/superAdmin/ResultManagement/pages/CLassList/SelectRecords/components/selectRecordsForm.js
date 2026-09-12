import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron
} from "../../../../../../../ui_elements";
import { SEMESTERS } from "../../../../../../../utils/constants";
import { findValueAndLabel } from "../../../../../../../utils/findValueAndLabel";

export const SelectRecordsForm = ({
	control,
	errors,
	allSessions,
	allDepartments,
	allDepartmentOption,
	isDepartmentLoading,
	setValue,
	allStudentTypes,
	allStudentModes,
	isLoadingDepartmentOption,
	departmentOption,
	setFilter,
	filter,
	handleSubmit,
	allLevels,
	levels,
	isLoadingLevels,
	isLoadingCourses,
	handleCompositeSubmit,
	programDetails,
	isLoadingCompositeSheet,
	handleSummarySubmit,
	isLoadingSummarySheet,
	role,
}) => {
	const { push } = useHistory();

	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			departmentId: formData?.departmentId?.value,
			//conditinally add departmentOptionId to filter object
			...(allDepartmentOption.length > 0 && {
				departmentOptionId: formData?.departmentOptionId?.value
			}),
			studentTypeId: formData?.studentTypeId?.value,
			sessionId: formData?.sessionId?.value,
			semesterId: formData?.semesterId?.value,
			levelId: formData?.levelId?.value,
			modeOfEntryId: formData?.modeOfEntryId?.value,
			pageNumber: 1
		}));
		push({
			search: new URLSearchParams({
				departmentId: formData?.departmentId?.value,
				//conditinally add departmentOptionId to filter object
				...(allDepartmentOption.length > 0 && {
					departmentOptionId: formData?.departmentOptionId?.value
				}),
				levelId: formData?.levelId?.value,
				studentTypeId: formData?.studentTypeId?.value,
				sessionId: formData?.sessionId?.value,
				semesterId: formData?.semesterId?.value,
				modeOfEntryId: formData?.modeOfEntryId?.value,
				pageSize: filter.pageSize
			}).toString()
		});
	};

	const onStudentTypeChange = (value) => {
		setValue("studentTypeId", value);
		setValue("departmentId", null);
		setValue("departmentOptionId", null);
		setValue("levelId", null);
	};

	useEffect(() => {
		if (allDepartmentOption.length > 0) {
			const defaultDepartmentOption = findValueAndLabel(
				programDetails?.departmentOptionId,
				allDepartmentOption
			);
			setValue("departmentOptionId", defaultDepartmentOption);
		}
	}, [allDepartmentOption, programDetails?.departmentOptionId, setValue]);
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Class list results"
				borderClasses="border-bottom-0"
				footerContent={
					<>
						<Button
							data-cy="view_res_data"
							type="button"
							buttonClass="standard"
							label="Print Composite Sheet"
							loading={isLoadingCompositeSheet}
							onClick={handleSubmit(handleCompositeSubmit)}
						/>
						<Button
							data-cy="view_res_data"
							type="button"
							buttonClass="secondary"
							label="Print Summary Sheet"
							loading={isLoadingSummarySheet}
							onClick={handleSubmit(handleSummarySubmit)}
						/>
						<Button
							data-cy="view_res_data"
							type="submit"
							buttonClass="primary"
							label="View results"
							loading={isLoadingCourses}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div
								className={`row ${
									isDepartmentLoading ? "mb-5" : ""
								}`}
							>
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="studentTypeId"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="studentTypeId"
										control={control}
										rules={{
											required: true
										}}
										defaultValue={
											programDetails?.studentTypeId
												? findValueAndLabel(
														programDetails.studentTypeId,
														allStudentTypes
												  )
												: null
										}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select student type"
												onChange={onStudentTypeChange}
												options={allStudentTypes}
												searchable={false}
												id="studentTypeId"
												disabled={
													role === "Exams Officer"
												}
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isDepartmentLoading && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="departmentId"
									>
										Department
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="departmentId"
										control={control}
										rules={{
											required: true
										}}
										defaultValue={
											programDetails?.departmentId
												? findValueAndLabel(
														programDetails.departmentId,
														allDepartments
												  )
												: null
										}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="departmentId"
												placeholder="Select department"
												options={allDepartments}
												searchable={true}
												isError={!!errors.departmentId}
												disabled={
													role === "Exams Officer"
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{departmentOption?.data?.length > 0 && (
							<div className="col-md-6">
								<div className={`row ${"mt-5"}`}>
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="departmentOptionId"
										>
											Department option
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentOptionId"
											control={control}
											rules={{
												required: true
											}}
											defaultValue={
												programDetails?.departmentOptionId
													? findValueAndLabel(
															programDetails.departmentOptionId,
															allDepartmentOption
													  )
													: null
											}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="departmentOptionId"
													placeholder="Select department option"
													options={
														allDepartmentOption
													}
													searchable={false}
													isError={
														!!errors.departmentOptionId
													}
													disabled={
														role === "Exams Officer"
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingDepartmentOption && <Spinner />}
						<div className="col-md-6">
							<div className={`row ${"mt-5"}`}>
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="sessionId"
									>
										Session
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="sessionId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="sessionId"
												options={allSessions}
												placeholder="Select Academic Session"
												searchable={false}
												isError={!!errors.sessionId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row mt-5">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="semesterId"
									>
										Semester
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="semesterId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="semesterId"
												placeholder="Select Semester"
												options={SEMESTERS}
												searchable={false}
												isError={!!errors.semesterId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingLevels && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{levels?.data?.length > 0 && (
							<div className="col-md-6">
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
										{isLoadingLevels ? (
											<Spinner />
										) : (
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
														placeholder="Select year of study"
														options={allLevels}
														searchable={false}
														isError={
															!!errors.levelId
														}
													/>
												)}
											/>
										)}
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6">
							<div className="row mt-5">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="modeOfEntryId"
									>
										Mode of Entry
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="modeOfEntryId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select student mode"
												options={allStudentModes}
												id="modeOfEntryId"
												searchable={false}
												isError={!!errors.modeOfEntryId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
