import React, { useContext, useRef } from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron,
	ProfileContext
} from "../../../../ui_elements";
import styles from "./style.module.css";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { fieldSetterAndClearer } from "../../../../utils/fieldSetterAndClearer";
import { STUDENT_TYPES } from "../../../../utils/constants";

export default function ViewAllStudentsForm({
	control,
	errors,
	allLevels,
	allStudentRoles,
	allDepartments,
	allDepartmentOption,
	allStudentModes,
	allStudentTypes,
	allAOS,
	loadingProgrammes,
	allProgrammes,
	isLoadingAOS,
	isLoadingDepartmentOption,
	isLoadingLevels,
	setFilter,
	handleSubmit,
	isLoadingAdmissionList,
	watchData,
	isLoadingFaculties,
	allFaculties,
	isDepartmentLoading,
	setValue,
	isLoading
}) {
	const ref = useRef(null);
	const data = useContext(ProfileContext);
	const programDetails = data?.profileData?.programmeDetail;
	const isPGSelected =
		Number(watchData?.studentTypeId) === STUDENT_TYPES.POSTGRADUATE;

	const onSubmit = (formData) => {
		setFilter((state) => ({
			departmentId: formData.departmentId.value,
			//conditinally add departmentOptionId to filter object
			...(allDepartmentOption?.length > 0 && {
				departmentOptionId: formData?.departmentOption?.value
			}),
			studentModeId: formData.studentModeId.value,
			facultyId: formData.facultyId.value,
			studentTypeId: formData.studentTypeId.value,
			active: formData.active.value,
			levelId: formData.levelId.value,
			role: formData.status?.value,
			pageSize: state.pageSize
		}));
	};

	const onStudentTypeChange = (value) => {
		setValue("studentTypeId", value);
		setValue("departmentId", null);
		setValue("facultyId", null);
		setValue("departmentOptionId", null);
	};

	const onActiveChange = (value) => {
		setValue("active", value);
		setValue("status", null);
	};

	const onDepartmentChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "departmentId",
			clearFields: ["departmentOption"]
		});
	};

	const allObj = { value: "", label: "All" };
	const allPortalStatus = [
		{
			value: true,
			label: "Active"
		},
		{
			value: false,
			label: "Inactive"
		}
	];
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Records"
				borderClasses="border-bottom-0"
				footerContent={
					<>
						<Button
							data-cy="view_record"
							type="submit"
							ref={ref}
							buttonClass="primary"
							label="View records"
							loading={isLoadingAdmissionList || isLoading}
							disabled={isLoadingDepartmentOption}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className={styles.filter_container}>
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
													programDetails?.studentTypeId,
													allStudentTypes
											  )
											: null
									}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select Student Type"
											options={allStudentTypes}
											searchable={false}
											onChange={onStudentTypeChange}
											id="studentTypeId"
											// disabled={
											// 	programDetails?.studentTypeId
											// }
											isError={!!errors.studentTypeId}
										/>
									)}
								/>
							</div>
						</div>
						{isLoadingFaculties && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{watchData?.studentTypeId && allFaculties?.length > 0 && (
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
												// disabled={
												// 	programDetails?.facultyId
												// }
												isError={!!errors.facultyId}
											/>
										)}
									/>
								</div>
							</div>
						)}
						{isDepartmentLoading && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{watchData?.facultyId && allDepartments?.length > 0 && (
							<div className="row">
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
										defaultValue={
											programDetails?.departmentId
												? findValueAndLabel(
														programDetails.departmentId,
														allDepartments
												  )
												: null
										}
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select department"
												options={allDepartments}
												onChange={onDepartmentChange}
												// disabled={
												// 	programDetails?.departmentId
												// }
												id="departmentId"
											/>
										)}
									/>
								</div>
							</div>
						)}
						{allDepartmentOption.length > 0 && (
							<div>
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
							<div>
								<Spinner />
							</div>
						)}
						<div>
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="studentModeId"
									>
										Mode of Entry
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="studentModeId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select student mode"
												options={[
													allObj,
													...allStudentModes
												]}
												id="studentModeId"
												searchable={false}
												isError={!!errors.studentModeId}
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
						{allLevels.length > 0 && (
							<div>
								<div className="row">
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
													options={[
														allObj,
														...allLevels
													]}
													placeholder="Select Level"
													searchable={false}
													isError={!!errors.levelId}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div>
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="active"
									>
										Portal Status
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="active"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="active"
												options={allPortalStatus}
												onChange={onActiveChange}
												placeholder="Select Status"
												searchable={false}
												isError={!!errors.active}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{watchData?.active && (
							<div>
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="status"
										>
											Student Status
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="status"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="status"
													options={[
														allObj,
														...allStudentRoles
													]}
													placeholder="Select Status"
													searchable={false}
													isError={!!errors.status}
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
							<div>
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
						{isLoadingAOS && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{isPGSelected && allAOS?.length > 0 && (
							<div>
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
