import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiGet, useApiPut } from "../../../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import {
	editUserUrl,
	getAllUsersUrl,
	getDepartmentsUrl
} from "../../../../../../api/urls";
import { editUserSchema } from "./componentsSchema";
import { useEffect, useState } from "react";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";

export const EditUser = ({
	data,
	currentFilterState,
	closeModal,
	allStudentTypes,
	allRoles
}) => {
	const [studentTupeState, setStudentTupeState] = useState(
		data?.studentTypeId
	);
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTupeState),
		{
			refetchOnWindowFocus: false,
			enabled: !!studentTupeState
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
		clearErrors,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			Surname: data.lastName,
			Firstname: data.firstName,
			Middlename: data.middleName,
			PhoneNumber: data.phoneNumber,
			Department: findValueAndLabel(data?.departmentId, allDepartments),
			StudentType: findValueAndLabel(
				data?.studentTypeId,
				allStudentTypes
			),
			UserRole: { label: data.role, value: data.role },
			Username: data.userName,
			MobileNo: data.mobileNo
		},
		resolver: yupResolver(editUserSchema),
		context: {
			isLDepartment: allDepartments?.length > 0 ? true : false
		}
	});
	const { mutate, isLoading: isPosting } = useApiPut();

	const queryClient = useQueryClient();
	const onSubmit = (submitData) => {
		const requestDet = {
			url: editUserUrl(data.userId),
			data: {
				LastName: submitData?.Surname,
				Firstname: submitData?.Firstname,
				MiddleName: submitData?.Middlename ?? "",
				PhoneNumber: submitData?.PhoneNumber,
				StudentTypeId: submitData?.StudentType?.value,
				DepartmentId: submitData?.Department?.value,
				Role: submitData?.UserRole?.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllUsersUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "User edit Successful!",
					body: "User has been successfully edited!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "User Action Failed!",
					body:
						response?.data?.message ||
						`User wasnt edited successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};
	useEffect(() => {
		const subscription = watch(({ StudentType }) =>
			setStudentTupeState(StudentType?.value)
		);
		return () => subscription.unsubscribe();
	}, [watch]);
	const onChange = (value) => {
		clearErrors("StudentType");
		setValue("StudentType", value);
		setValue("Department", null);
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
						htmlFor="Username"
						className={styles.admission_list_edit_label}
					>
						Username
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="Username"
						placeholder="Enter username"
						register={register}
						disabled
						error={errors.Username}
						errorText={errors.Username && errors.Username.message}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="Email">Email</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="Email"
						placeholder="Enter email"
						error={errors.Email}
						value={data.email}
						errorText={errors.Email && errors.Email.message}
						disabled
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="PhoneNumber">Phone Number</label>
				</div>
				<div className="d-flex col-lg-9">
					<TextField
						className="w-100"
						placeholder="Enter phone number"
						type="text"
						id="PhoneNumber"
						name="PhoneNumber"
						register={register}
						required
						error={errors.PhoneNumber}
						errorText={
							errors.PhoneNumber && errors.PhoneNumber.message
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="StudentType">Student Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="StudentType"
						control={control}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select a student type"
								options={allStudentTypes}
								onChange={onChange}
								searchable={true}
								id="StudentType"
							/>
						)}
					/>
				</div>
			</div>
			{isDepartmentLoading ? (
				<div className="mb-4">
					<Spinner />
				</div>
			) : (
				allDepartments?.length > 0 && (
					<div className="row mb-4">
						<div className="col-lg-3 d-flex align-items-center">
							<label
								htmlFor="gender"
								className={styles.admission_list_edit_label}
							>
								Department
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Department"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Select department"
										searchable={true}
										id="Department"
										{...field}
										options={allDepartments}
										isError={!!errors.Department}
										errorText={
											errors.Department &&
											errors.Department.message
										}
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
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						User Role
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="UserRole"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select user role"
								searchable={true}
								id="UserRole"
								{...field}
								options={allRoles}
								isError={!!errors.UserRole}
								errorText={
									errors.UserRole && errors.UserRole.message
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
					loading={isSubmitting || isPosting}
				/>
			</div>
		</form>
	);
};
