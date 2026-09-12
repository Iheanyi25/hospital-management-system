import React from "react";
import { Controller } from "react-hook-form";
import styles from "../../style.module.css";
import { Button, SMSelect, TextField } from "../../../../../../ui_elements";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	singleUploadAdmissionListUrl,
	getAdmissionList
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

export default function SingleUploadForm({
	errors,
	register,
	handleSubmit,
	control,
	allAdmissionTypes,
	filter,
	pageNumber,
	searchTerm,
	pageSize,
	isSubmitting,
	setUploadModal,
	isPGSelected,
	allStudentCategory
}) {
	const { mutate, isLoading: isEditing } = useApiPost();
	const queryClient = useQueryClient();
	const onSubmitForm = (formData) => {
		const data = {
			lastname: formData.surname,
			firstname: formData.firstName,
			middlename: formData.otherNames,
			regNumber: formData.regno,
			supervisor: formData?.supervisor,
			admissionTypeId: formData.admissionType.value,
			CategoryId: formData.CategoryId.value,
			departmentId: filter.departmentId,
			departmentOptionId: filter.departmentOptionId,
			studentTypeId: filter.studentTypeId,
			modeOfEntryId: filter.modeOfEntryId,
			sessionId: filter.sessionId,
			...(filter?.programmeId && {
				programmeId: filter?.programmeId
			}),
			...(filter?.modeOfStudyId && {
				modeOfStudyId: filter?.modeOfStudyId
			})
		};

		const requestBody = {
			url: singleUploadAdmissionListUrl(),
			data
		};

		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAdmissionList({
						...filter,
						pageNumber,
						pageSize,
						searchTerm
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Edit Admission List Record ",
					body: "Admission List Record Updated successfully"
				});
				setUploadModal(false);
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
						placeholder="Enter surname"
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
						placeholder="Enter first name"
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
						placeholder="Enter middle name"
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
						placeholder="Enter registration number"
						register={register}
						error={errors.regno}
						errorText={errors.regno && errors.regno.message}
					/>
				</div>
			</div>
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
						htmlFor="CategoryId"
						className={styles.admission_list_edit_label}
					>
						Student Category
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="CategoryId"
						control={control}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select student type"
								searchable={true}
								id="CategoryId"
								options={allStudentCategory}
								isError={!!errors.CategoryId}
								errorText={
									errors.CategoryId &&
									errors.CategoryId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						Admission batch
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="admissionType"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Choose admission batch"
								searchable={true}
								id="admission_batch"
								{...field}
								options={allAdmissionTypes}
								isError={!!errors.admissionType}
								errorText={
									errors.admissionType &&
									errors.admissionType.message
								}
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
