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
	getDepartmentOptionUrl,
	getDepartmentsUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useEffect, useMemo, useState } from "react";

export const AddUser = ({
	closeModal,
	allStudentTypes,
	allRoles,
	allGenders,
	allCampuses,
	currentFilterState
}) => {
	const [studentTupeState, setStudentTupeState] = useState("");
	const queryClient = useQueryClient();
	const [departmentType, setDepartmentType] = useState("");
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTupeState),
		{
			refetchOnWindowFocus: false,
			enabled: !!studentTupeState
		}
	);
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentType,
				studentTypeId: studentTupeState
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!departmentType
			}
		);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption]
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
		defaultValues: {
			UserRole: currentFilterState?.roleName
				? {
						label: currentFilterState.roleName,
						value: currentFilterState.roleName
				  }
				: null
		},
		resolver: yupResolver(addUserSchema),
		context: {
			isLDepartment: allDepartments?.length > 0 ? true : false
		}
	});
	const { mutate, isLoading: isPosting } = useApiPost();
	useEffect(() => {
		const subscription = watch(({ StudentType, Department }) => {
			setStudentTupeState(StudentType?.value);
			setDepartmentType(Department?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onChange = (value) => {
		clearErrors("StudentType");
		setValue("StudentType", value);
		setValue("Department", null);
		setValue("departmentOption", null);
	};
	const onSubmit = (data) => {
		const requestDet = {
			url: createUserUrl(),
			data: {
				LastName: data?.Surname.trim(),
				Firstname: data?.Firstname.trim(),
				Middlename: data?.Middlename.trim(),
				Username: data?.Username,
				Email: data?.Email,
				StaffNumber: data?.StaffNumber,
				StudentTypeId: data?.StudentType?.value,
				DepartmentId: data?.Department?.value,
				DepartmentOptionId: data?.departmentOption?.value,
				MobileNumber: data?.PhoneNumber,
				GenderId: data?.GenderId?.value,
				CampusId: data?.CampusId?.value,
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
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="admission_batch">Gender</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="GenderId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select a gender"
								searchable={true}
								id="GenderId"
								{...field}
								options={allGenders}
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
					<label htmlFor="StaffNumber">Staff Number</label>
				</div>
				<div className="col-lg-9">
					<TextField
						name="StaffNumber"
						placeholder="Enter staff number"
						register={register}
						error={errors.StaffNumber}
						errorText={
							errors.StaffNumber && errors.StaffNumber.message
						}
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
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="admission_batch">Campus</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="CampusId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select a campus"
								searchable={true}
								id="CampusId"
								{...field}
								options={allCampuses}
								isError={!!errors.CampusId}
								errorText={
									errors.CampusId && errors.CampusId.message
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
			{isLoadingDepartmentOption ? (
				<div className="mb-4">
					<Spinner />
				</div>
			) : (
				allDepartmentOption?.length > 0 && (
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="departmentOption">
								Department Option*
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="departmentOption"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a programme option"
										searchable={true}
										id="departmentOption"
										options={allDepartmentOption}
										isError={!!errors.departmentOption}
										errorText={
											errors.departmentOption &&
											errors.departmentOption.message
										}
									/>
								)}
							/>
						</div>
					</div>
				)
			)}
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
