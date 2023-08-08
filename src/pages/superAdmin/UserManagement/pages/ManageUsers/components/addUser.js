import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { addUserSchema } from "./componentsSchema";
import {
	createUserUrl,
	getAllUsersUrl,
	getDepartmentsUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useEffect, useState } from "react";

export const AddUser = ({
	closeModal,
	allStudentTypes,
	allRoles,
	currentFilterState
}) => {
	const [studentTupeState, setStudentTupeState] = useState("");
	const queryClient = useQueryClient();

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
		watch,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(addUserSchema),
		context: {
			isLDepartment: allDepartments?.length > 0 ? true : false
		}
	});
	const { mutate, isLoading: isPosting } = useApiPost();
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
	const onSubmit = (data) => {
		const requestDet = {
			url: createUserUrl(),
			data: {
				LastName: data?.Surname,
				Firstname: data?.Firstname,
				Middlename: data?.Middlename,
				Username: data?.Username,
				Email: data?.Email,
				StudentTypeId: data?.StudentType?.value,
				DepartmentId: data?.Department?.value,
				PhoneNumber: data?.PhoneNumber,
				Role: data?.UserRole?.value
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
					title: "User creation Successful!",
					body: "User has been successfully created!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "User Action Failed!",
					body: response?.data?.message || `User creation failed!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};
	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="Fullname">Full name</label>
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
					<label htmlFor="Username">Username</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="Username"
						placeholder="Enter username"
						register={register}
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
						register={register}
						error={errors.Email}
						errorText={errors.Email && errors.Email.message}
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
								placeholder="Select student type"
								options={allStudentTypes}
								searchable={true}
								id="StudentType"
								onChange={onChange}
								isError={!!errors.StudentType}
								errorText={
									errors.StudentType &&
									errors.StudentType.message
								}
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
							<label htmlFor="Department">Department</label>
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
					<label htmlFor="admission_batch">User Role</label>
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
					label="Create User"
					buttonClass="primary"
					loading={isSubmitting || isPosting}
				/>
			</div>
		</form>
	);
};
