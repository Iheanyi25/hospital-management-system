import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron,
	ProfileContext
} from "../../../../../ui_elements";
import { useHistory } from "react-router-dom";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

export const Form = ({
	control,
	errors,
	allSessions,
	allDepartments,
	allDepartmentOption,
	allStudentModes,
	allStudentTypes,
	isLoadingDepartmentOption,
	departmentOption,
	isDepartmentLoading,
	setFilter,
	handleSubmit,
	isLoadingLevels,
	isLoadingCourses,
	filter,
	allFaculties,
	isLoadingFaculties,
	watchData,
	setValue
}) => {
	const { push } = useHistory();
	const data = useContext(ProfileContext);
	const programDetails = data?.profileData?.programmeDetail;
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			departmentId: formData.departmentId.value,
			facultyId: formData.facultyId.value,
			departmentOptionId:
				departmentOption?.data?.length > 0
					? formData?.departmentOptionId?.value
					: null,
			modeOfEntryId: formData.modeOfEntryId.value,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value
		}));
		push({
			search: new URLSearchParams({
				departmentId: formData.departmentId.value,
				facultyId: formData.facultyId.value,
				//conditinally add departmentOptionId to filter object
				...(allDepartmentOption.length > 0 &&
					formData?.departmentOptionId && {
						departmentOptionId: formData?.departmentOptionId?.value
					}),
				modeOfEntryId: formData.modeOfEntryId.value,
				studentTypeId: formData.studentTypeId.value,
				sessionId: formData.sessionId.value,
				pageSize: filter.pageSize
			}).toString()
		});
	};
	const onStudentTypeChange = (value) => {
		setValue("studentTypeId", value);
		setValue("facultyId", null);
		setValue("departmentId", null);
		setValue("departmentOptionId", null);
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Student clearance"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_records"
						type="submit"
						buttonClass="primary"
						label="View records"
						loading={isLoadingCourses}
						disabled={isLoadingDepartmentOption || isLoadingLevels}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
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
												options={allStudentTypes}
												onChange={onStudentTypeChange}
												searchable={false}
												id="studentTypeId"
												disabled={
													programDetails?.studentTypeId
												}
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingFaculties && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{watchData?.studentTypeId && allFaculties?.length > 0 && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="facultyId"
										>
											Faculty
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="facultyId"
											control={control}
											rules={{
												required: true
											}}
											defaultValue={
												programDetails?.facultyId
													? findValueAndLabel(
															programDetails.facultyId,
															allFaculties
													  )
													: null
											}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="facultyId"
													placeholder="Select faculty"
													options={allFaculties}
													searchable={true}
													disabled={
														programDetails?.facultyId
													}
													isError={!!errors.facultyId}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isDepartmentLoading && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{watchData?.facultyId && allDepartments?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="departmentId"
										>
											Department{" "}
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select department"
													options={allDepartments}
													id="departmentId"
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{departmentOption?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
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
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingDepartmentOption && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						<div className="col-md-6">
							<div
								className={`row ${
									(allFaculties?.length > 0 ||
										isLoadingFaculties ||
										isDepartmentLoading ||
										isLoadingDepartmentOption) &&
									"mt-5"
								}`}
							>
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
												placeholder="Select a Mode of Entry"
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
						<div className="col-md-6">
							<div className="row mt-5">
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
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
