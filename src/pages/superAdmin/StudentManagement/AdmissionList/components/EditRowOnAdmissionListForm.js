import React from "react";
import { Controller } from "react-hook-form";
import styles from "../style.module.css";
import { Button, SMSelect, TextField } from "../../../../../ui_elements";
import { Spinner } from "../../../../../ui_elements";
import { useApiPut } from "../../../../../api/apiCall";
import {
	updateAdmissionListRecordUrl,
	getAdmissionList,
	getSearchAdmissionList
} from "../../../../../api/urls";
import { useQueryClient } from "react-query";
import { STUDENT_TYPES } from "../../../../../utils/constants";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { fieldSetterAndClearer } from "../../../../../utils/fieldSetterAndClearer";

export default function EditRowOnAdmissionListForm({
	errors,
	register,
	handleSubmit,
	control,
	allSessions,
	allDepartments,
	allStudentModes,
	allStudentTypes,
	allDepartmentOptions,
	isLoadingDepartmentOptions,
	setEditOpen,
	filter,
	pageNumber,
	searchTerm,
	pageSize,
	isFacultyPage,
	isSubmitting,
	studentTypeState,
	allStudentModesOfStudy,
	allProgrammes,
	editData,
	setValue,
	isLoadingProgrammes,
	isLoadingStudentModesOfStudy,
	admissionListId
}) {
	const { mutate, isLoading: isEditing } = useApiPut();
	const queryClient = useQueryClient();

	const onSubmitForm = (formData) => {
		const hasSchoolProgrammeId = formData?.programmeId?.value
			? { programmeId: formData?.programmeId?.value }
			: {};
		const hasModeOfStudyId = formData?.modeOfStudyId?.value
			? { modeOfStudyId: formData?.modeOfStudyId?.value }
			: {};
		const data = {
			admissionListId,
			Lastname: formData.surname,
			Firstname: formData.firstName,
			Middlename: formData.otherNames,
			RegNumber: formData.regno,
			supervisor: formData.supervisor,
			DepartmentId: formData.department.value,
			...(formData.departmentOption && {
				DepartmentAreaOfSpecializationId:
					formData.departmentOption.value
			}),
			DepartmentOptionId: formData.departmentOption?.value,
			StudentTypeId: formData.studentType.value,
			modeOfEntryId: formData.studentModeOfEntry.value,
			...hasSchoolProgrammeId,
			...hasModeOfStudyId,
			SessionId: formData.session.value,
			...(filter?.modeOfStudyId && {
				modeOfStudyId: filter?.modeOfStudyId
			})
		};

		const requestBody = {
			url: updateAdmissionListRecordUrl(admissionListId),
			data
		};

		mutate(requestBody, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(
					isFacultyPage
						? getAdmissionList({
								...filter,
								pageNumber,
								searchTerm
						  })
						: getSearchAdmissionList({
								pageSize,
								pageNumber,
								searchTerm
						  })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Edit Admission List Record ",
					body: "Admission List Record Updated successfully"
				});

				setEditOpen(false);
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
	const isPGSelected = studentTypeState === STUDENT_TYPES.POSTGRADUATE;
	const onStudentTypeChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "studentType",
			clearFields: [
				"department",
				"departmentOption",
				"programmeId",
				"modeOfStudyId"
			]
		});
	};

	return (
		<form className={`w-100 mt-5`} onSubmit={handleSubmit(onSubmitForm)}>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="surname"
						className={styles.admission_list_edit_label}
					>
						Surname
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="surname"
						register={register}
						error={errors.surname}
						errorText={errors.surname && errors.surname.message}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="firstName"
						className={styles.admission_list_edit_label}
					>
						First Name
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="firstName"
						register={register}
						error={errors.firstName}
						errorText={errors.firstName && errors.firstName.message}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="otherNames"
						className={styles.admission_list_edit_label}
					>
						Middle Name
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="otherNames"
						register={register}
						error={errors.otherNames}
						errorText={
							errors.otherNames && errors.otherNames.message
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="regno"
						className={styles.admission_list_edit_label}
					>
						Reg No
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="regno"
						register={register}
						error={errors.regno}
						errorText={errors.regno && errors.regno.message}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="studentType"
						className={styles.admission_list_edit_label}
					>
						Student Type
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="studentType"
						control={control}
						defaultValue={
							editData?.studentTypeId
								? findValueAndLabel(
										editData?.studentTypeId,
										allStudentTypes
								  )
								: null
						}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Please choose a student type"
								onChange={onStudentTypeChange}
								options={allStudentTypes}
								id="studentType"
								searchable={true}
							/>
						)}
					/>
				</div>
			</div>
			{allDepartments && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor="department"
							className={styles.admission_list_edit_label}
						>
							Department
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="department"
							control={control}
							defaultValue={
								editData?.departmentId
									? findValueAndLabel(
											editData?.departmentId,
											allDepartments
									  )
									: null
							}
							render={({ field }) => (
								<SMSelect
									placeholder="Please choose a department"
									options={allDepartments}
									searchable={true}
									isError={!!errors.department}
									{...field}
								/>
							)}
						/>
					</div>
				</div>
			)}
			{isLoadingDepartmentOptions ? (
				<div className="mb-4">
					<Spinner />
				</div>
			) : (
				allDepartmentOptions?.length > 0 && (
					<div className="row mb-4">
						<div className="col-lg-3 d-flex align-items-center">
							<label
								htmlFor="departmentOption"
								className={styles.admission_list_edit_label}
							>
								Department Option
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="departmentOption"
								control={control}
								defaultValue={
									editData?.departmentOptionId
										? findValueAndLabel(
												editData?.departmentOptionId,
												allDepartmentOptions
										  )
										: null
								}
								render={({ field }) => (
									<SMSelect
										placeholder="Please choose a department option"
										options={allDepartmentOptions}
										searchable={true}
										id="departmentOption"
										isError={!!errors.departmentOption}
										{...field}
									/>
								)}
							/>
						</div>
					</div>
				)
			)}
			{isLoadingProgrammes && (
				<div className="mb-4">
					<Spinner />
				</div>
			)}
			{allProgrammes?.length > 0 && isPGSelected && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor="programmeId"
							className={styles.admission_list_edit_label}
						>
							Programme
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="programmeId"
							defaultValue={
								editData?.programmeId
									? findValueAndLabel(
											editData?.programmeId,
											allProgrammes
									  )
									: null
							}
							control={control}
							render={({ field }) => (
								<SMSelect
									placeholder="Please choose a programme"
									options={allProgrammes}
									searchable={true}
									id="programmeId"
									isError={!!errors.programmeId}
									{...field}
								/>
							)}
						/>
					</div>
				</div>
			)}

			{isLoadingStudentModesOfStudy && (
				<div className="mb-4">
					<Spinner />
				</div>
			)}
			{allStudentModesOfStudy?.length > 0 && isPGSelected && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor="modeOfStudyId"
							className={styles.admission_list_edit_label}
						>
							Mode of Study
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="modeOfStudyId"
							defaultValue={
								editData?.modeOfStudyId
									? findValueAndLabel(
											editData?.modeOfStudyId,
											allStudentModesOfStudy
									  )
									: null
							}
							control={control}
							render={({ field }) => (
								<SMSelect
									placeholder="Please choose a mode of study"
									options={allStudentModesOfStudy}
									searchable={true}
									id="modeOfStudyId"
									isError={!!errors.modeOfStudyId}
									{...field}
								/>
							)}
						/>
					</div>
				</div>
			)}

			{isPGSelected && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor="supervisor"
							className={styles.admission_list_edit_label}
						>
							Supervisor
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							name="supervisor"
							placeholder="Enter supervisor name"
							register={register}
							error={errors.supervisor}
							errorText={
								errors.supervisor && errors.supervisor.message
							}
						/>
					</div>
				</div>
			)}
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="studentModeOfEntry"
						className={styles.admission_list_edit_label}
					>
						Student Mode Of Entry
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="studentModeOfEntry"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder=""
								options={allStudentModes}
								searchable={true}
								id="studentModeOfEntry"
								{...field}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="session"
						className={styles.admission_list_edit_label}
					>
						Session
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="session"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder=""
								searchable={true}
								id="session"
								{...field}
								options={allSessions}
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update_rows"
					type="submit"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isEditing}
				/>
			</div>
		</form>
	);
}
