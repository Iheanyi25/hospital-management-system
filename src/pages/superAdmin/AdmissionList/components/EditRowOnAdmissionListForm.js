import React from "react";
import { Controller } from "react-hook-form";
import styles from "../style.module.css";
import { Button, SMSelect, TextField } from "../../../../ui_elements";
import { Spinner } from "../../../../ui_elements";
import { useApiPut } from "../../../../api/apiCall";
import {
	updateAdmissionListRecordUrl,
	getAdmissionList,
	getSearchAdmissionList
} from "../../../../api/urls";
import { useQueryClient } from "react-query";

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
	admissionListId
}) {
	const { mutate, isLoading: isEditing } = useApiPut();
	const queryClient = useQueryClient();

	const onSubmitForm = (formData) => {
		const data = {
			admissionListId,
			Lastname: formData.surname,
			Firstname: formData.firstName,
			Middlename: formData.otherNames,
			RegNumber: formData.regno,
			DepartmentId: formData.department.value,
			...(formData.departmentOption && {
				DepartmentAreaOfSpecializationId:
					formData.departmentOption.value
			}),
			DepartmentOptionId: formData.departmentOption?.value,
			StudentTypeId: formData.studentType.value,
			StudentModeOfEntryId: formData.studentModeOfEntry.value,
			SessionId: formData.session.value
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
							render={({ field }) => (
								<SMSelect
									placeholder=""
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
								render={({ field }) => (
									<SMSelect
										placeholder=""
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
						render={({ field }) => (
							<SMSelect
								placeholder=""
								options={allStudentTypes}
								searchable={true}
								id="studentType"
								{...field}
							/>
						)}
					/>
				</div>
			</div>
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
