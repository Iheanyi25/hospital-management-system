import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron,
	CenteredDialog
} from "../../../../../ui_elements";
import { UploadAdmissionList } from "./UploadAdmissionList";
import { STUDENT_TYPES } from "../../../../../utils/constants";
import { fieldSetterAndClearer } from "../../../../../utils/fieldSetterAndClearer";

export default function AdmissionListForm({
	control,
	errors,
	allSessions,
	allDepartments,
	allDepartmentOption,
	allStudentModes,
	allStudentTypes,
	allProgrammes,
	allStudentModesOfStudy,
	isLoadingStudentModesOfStudy,
	loadingProgrammes,
	isLoadingDepartmentOption,
	isDepartmentLoading,
	setFilter,
	handleSubmit,
	isLoadingAdmissionList,
	allAdmissionTypes,
	allAOS,
	isLoadingAOS,
	watchData,
	filter,
	pageNumber,
	pageSize,
	searchTerm,
	setValue,
	isLoadingStudentModes
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const isPGSelected =
		Number(watchData?.student_type) === STUDENT_TYPES.POSTGRADUATE;
	const onSubmit = (formData) => {
		setFilter((state) => ({
			departmentId: formData?.department?.value,
			//conditinally add departmentOptionId to filter object
			...(allDepartmentOption?.length > 0 && {
				departmentOptionId: formData?.departmentOption?.value
			}),
			...(formData?.student_mode?.value && {
				modeOfEntryId: formData?.student_mode?.value
			}),
			studentTypeId: formData?.student_type?.value,
			sessionId: formData?.session?.value,
			...(allProgrammes?.length && {
				programmeId: formData?.schoolProgramme?.value
			}),
			...(allStudentModesOfStudy?.length &&
				isPGSelected && {
					modeOfStudyId: formData?.modeOfStudyId?.value
				}),
			areaOfSpecializationId: formData?.areaOfSpecializationId?.value,
			pageSize: state?.pageSize
		}));
	};

	const onStudentTypeChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "student_type",
			clearFields: [
				"department",
				"departmentOption",
				"schoolProgramme",
				"programmeTypeId"
			]
		});
	};

	const onDepartmentChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "department",
			clearFields: ["departmentOption"]
		});
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<CenteredDialog
				modalId="upload_list"
				isOpen={open && !!filter.departmentId}
				closeModal={() => setOpen(false)}
				formTitle="Upload List"
			>
				<UploadAdmissionList
					allAdmissionTypes={allAdmissionTypes}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					pageSize={pageSize}
					setUploadModal={setOpen}
				/>
			</CenteredDialog>
			<Jumbotron
				headerText="View Admission List"
				borderClasses="border-bottom-0"
				footerContent={
					<>
						<Button
							data-cy="view_record"
							type="submit"
							ref={ref}
							buttonClass="primary"
							label="View records"
							loading={isLoadingAdmissionList}
							disabled={isLoadingDepartmentOption}
						/>
						<Button
							data-cy="upload_list"
							type="button"
							buttonClass="secondary"
							label="Upload List"
							customClass="ml-2"
							onClick={() => {
								ref?.current?.click();
								setOpen(true);
							}}
						/>
					</>
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
										htmlFor="session"
									>
										Session
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
												id="session"
												options={allSessions}
												placeholder="Select Academic Session"
												searchable={false}
												isError={!!errors.session}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="student_type"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="student_type"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												onChange={onStudentTypeChange}
												options={allStudentTypes}
												searchable={false}
												id="student_type"
												isError={!!errors.student_type}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{allDepartments.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="dept"
										>
											Department
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="department"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="dept"
													placeholder="Select department"
													onChange={
														onDepartmentChange
													}
													options={allDepartments}
													searchable={true}
													isError={
														!!errors.department
													}
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
						{allDepartmentOption.length > 0 && (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="dept_opt"
										>
											Department option
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentOption"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="dept_opt"
													placeholder="Select department option"
													options={
														allDepartmentOption
													}
													searchable={false}
													isError={
														!!errors.department_option
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
						{isLoadingStudentModes && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allStudentModes?.length > 0 && (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="student_mode"
										>
											Mode of Entry
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="student_mode"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select student mode"
													options={allStudentModes}
													id="student_mode"
													searchable={false}
													isError={
														!!errors.student_mode
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}

						{loadingProgrammes && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allProgrammes?.length && isPGSelected ? (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="schoolProgramme"
										>
											Programme
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="schoolProgramme"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select programme"
													options={allProgrammes}
													id="schoolProgramme"
													searchable={true}
													isError={
														!!errors.schoolProgramme
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
						{isLoadingStudentModesOfStudy && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allStudentModesOfStudy?.length && isPGSelected ? (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="modeOfStudyId"
										>
											Mode of Study
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="modeOfStudyId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select mode of study"
													options={
														allStudentModesOfStudy
													}
													id="modeOfStudyId"
													searchable={false}
													isError={
														!!errors.modeOfStudyId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
						{isLoadingAOS && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{isPGSelected && allAOS?.length > 0 && (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="schoolProgramme"
										>
											Area of special specialization
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="areaOfSpecializationId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select area of special specialization"
													options={allAOS}
													id="areaOfSpecializationId"
													searchable={true}
													isError={
														!!errors.areaOfSpecialization
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</Jumbotron>
		</form>
	);
}
