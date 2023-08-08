import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiGet, useApiPut } from "../../../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getLecturersUrl,
	singleLecturerEditUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { LecturerSchema } from "./UploadLecturerList/lecturerSchema";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { useEffect, useState } from "react";

export const EditLecturer = ({
	data,
	currentFilterState,
	allStudentTypes,
	closeModal,
	currentId,
	genderList
}) => {
	const [studentTypeIdState, setStudentTypeIdState] = useState("");
	const allGender = formatSelectItems(genderList, "name", "id");
	const { mutate, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTypeIdState || data?.studentTypeId),
		{
			enabled: !!studentTypeIdState || !!data?.studentTypeId,
			refetchOnWindowFocus: false
		}
	);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const {
		control,
		register,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			Surname: data.lastname,
			Firstname: data.firstName,
			Middlename: data.middlename,
			GenderId: findValueAndLabel(data?.genderId, allGender),
			DepartmentId: {
				label: data?.department,
				value: data?.departmentId
			},
			Email: data.email,
			MobileNo: data.mobileNumber
		},
		resolver: yupResolver(LecturerSchema)
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: singleLecturerEditUrl(currentId),
			data: {
				Lastname: data.Surname,
				Firstname: data.Firstname,
				Middlename: data.Middlename,
				DepartmentId: data?.DepartmentId?.value,
				StudentTypeId: data?.StudentTypeId?.value,
				GenderId: data?.GenderId?.value,
				Email: data.Email,
				MobileNumber: data.MobileNo
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getLecturersUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Lecturer Action Successful!",
					body: "Lecturer records were updated successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Acction Failed!",
					body:
						response?.data?.message ||
						`Lecturer records weren't updated successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};

	useEffect(() => {
		const subscription = watch(({ StudentTypeId }) => {
			setStudentTypeIdState(StudentTypeId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onStudentTypeChange = (value) => {
		setStudentTypeIdState(value.value);
		setValue("StudentTypeId", value);
		setValue("DepartmentId", null);
		clearErrors("StudentTypeId");
	};

	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
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
						defaultValue={findValueAndLabel(
							data?.studentTypeId,
							allStudentTypes
						)}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select student type"
								searchable={true}
								id="StudentTypeId"
								onChange={onStudentTypeChange}
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
			{(allDepartments?.length > 0 || data?.departmentId) && (
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
									{...field}
									defaultValue={findValueAndLabel(
										data?.departmentId,
										allDepartments
									)}
									placeholder="Select department"
									searchable={true}
									id="DepartmentId"
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
					loading={isSubmitting || isPosting}
				/>
			</div>
		</form>
	);
};
