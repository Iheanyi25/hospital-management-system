import React, { useEffect, useState, useMemo } from "react";
import styles from "../../../../../AdmissionList/style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../../ui_elements";
import { useApiGet, useApiPost } from "../../../../../../../api/apiCall";
import {
	createNewLecturerUrl,
	getDepartmentsUrl,
	getLecturersUrl,
	getStudentCategoryUrl
} from "../../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { formatSelectItems } from "../../../../../../../utils/formatSelectItems";
import { Controller, useForm } from "react-hook-form";
import { LecturerSchema } from "./lecturerSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SingleUploadForm({
	allStudentTypes,
	setUploadModal,
	currentFilterState,
	genderList
}) {
	const [studentTypeIdState, setStudentTypeIdState] = useState("");
	const { mutate, isLoading: isEditing } = useApiPost();

	const queryClient = useQueryClient();

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTypeIdState),
		{
			enabled: !!studentTypeIdState,
			refetchOnWindowFocus: false
		}
	);

	const { data: studentCategory } = useApiGet(getStudentCategoryUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		clearErrors,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(LecturerSchema)
	});
	useEffect(() => {
		const subscription = watch(({ StudentTypeId }) => {
			setStudentTypeIdState(StudentTypeId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onStudentTpeChange = (value) => {
		setStudentTypeIdState(value.value);
		setValue("StudentTypeId", value);
		setValue("DepartmentId", null);
		clearErrors("StudentTypeId");
	};
	const allGender = formatSelectItems(genderList, "name", "id");
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allStudentCategory = useMemo(
		() => formatSelectItems(studentCategory?.data, "name", "id"),
		[studentCategory]
	);
	const onSubmit = (data) => {
		const requestBody = {
			url: createNewLecturerUrl(),
			data: {
				Lastname: data.Surname,
				Firstname: data.Firstname,
				Middlename: data.Middlename,
				DepartmentId: data?.DepartmentId?.value,
				StudentTypeId: data?.StudentTypeId?.value,
				GenderId: data?.GenderId?.value,
				Email: data.Email,
				MobileNumber: data.MobileNo,
				CategoryId: data?.CategoryId?.value
			}
		};

		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getLecturersUrl(currentFilterState)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Edit Lecturer List",
					body: "Lecturer List Updated successfully"
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
		<form className={`w-100 mt-5`} onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="Fullname"
						className={styles.admission_list_edit_label}
					>
						Full name
					</label>
				</div>
				<div className="col-lg-3">
					<TextField
						id={"Surname"}
						name="Surname"
						placeholder="Surname"
						register={register}
						error={errors.Surname}
						errorText={errors.Surname && errors.Surname.message}
					/>
				</div>{" "}
				<div className="col-lg-3">
					<TextField
						id={"Firstname"}
						name="Firstname"
						placeholder="First name"
						register={register}
						error={errors.Firstname}
						errorText={errors.Firstname && errors.Firstname.message}
					/>
				</div>
				<div className="col-lg-3">
					<TextField
						id={"Middlename"}
						name="Middlename"
						placeholder="Middle name"
						register={register}
						error={errors.Middlename}
						errorText={
							errors.Middlename && errors.Middlename.message
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="Email"
						className={styles.admission_list_edit_label}
					>
						Email
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="Email"
						placeholder="Enter email address"
						register={register}
						error={errors.Email}
						errorText={errors.Email && errors.Email.message}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="gender"
						className={styles.admission_list_edit_label}
					>
						Sex
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="GenderId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select sex"
								searchable={true}
								id="GenderId"
								{...field}
								options={allGender}
								isError={!!errors.GenderId}
								errorText={
									errors.GenderId && errors.GenderId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="MobileNo"
						className={styles.admission_list_edit_label}
					>
						Phone number
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="MobileNo"
						placeholder="Enter phone number"
						register={register}
						error={errors.MobileNo}
						errorText={errors.MobileNo && errors.MobileNo.message}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="StudentTypeId"
						className={styles.admission_list_edit_label}
					>
						Student Type
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="StudentTypeId"
						control={control}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select student type"
								searchable={true}
								id="StudentTypeId"
								onChange={onStudentTpeChange}
								options={allStudentTypes}
								isError={!!errors.StudentTypeId}
								errorText={
									errors.StudentTypeId &&
									errors.StudentTypeId.message
								}
							/>
						)}
					/>
				</div>
			</div>
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
			{isDepartmentLoading && (
				<>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="DepartmentId">Department</label>
							</div>
							<div className="col-lg-9">
								<Spinner />
							</div>
						</div>
					</div>
				</>
			)}
			{allDepartments?.length > 0 && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor="admission_batch"
							className={styles.admission_list_edit_label}
						>
							Department
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="DepartmentId"
							control={control}
							render={({ field }) => (
								<SMSelect
									placeholder="Select department"
									searchable={true}
									id="DepartmentId"
									{...field}
									options={allDepartments}
									isError={!!errors.DepartmentId}
									errorText={
										errors.DepartmentId &&
										errors.DepartmentId.message
									}
								/>
							)}
						/>
					</div>
				</div>
			)}
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
