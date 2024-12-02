import styles from "../style.module.css";
import {
	Button,
	ProfileContext,
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
	getDepartmentOptionUrl,
	getDepartmentsUrl,
	getUserProfileUrl
} from "../../../../../../api/urls";
import { editUserSchema } from "./componentsSchema";
import { useEffect, useRef, useState } from "react";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { RedCancel } from "../../../../../../assets/svgs";
import { useContext } from "react";

export const EditUser = ({
	data,
	currentFilterState,
	closeModal,
	allStudentTypes,
	allGenders,
	allCampuses,
	allRoles
}) => {
	console.log(data, "YOOHOO");
	const ref = useRef();
	const profileData = useContext(ProfileContext);
	const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false);
	const { data: user } = useApiGet(getUserProfileUrl(), {
		refetchOnWindowFocus: false,
		enabled: shouldUpdateProfile
	});

	user?.data && profileData?.setProfileData(user.data);

	const [studentTupeState, setStudentTupeState] = useState(
		data?.studentTypeId
	);
	const [departmentType, setDepartmentType] = useState(data?.departmentId);

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
	const allDepartmentOption = formatSelectItems(
		departmentOption?.data,
		"departmentOption",
		"departmentOptionId"
	);

	console.log(
		"YOOOWAAAA",
		findValueAndLabel(data?.departmentOptionId, allDepartmentOption)
	);
	console.log(
		"BAAAAAAA",
		findValueAndLabel(data?.departmentId, allDepartments)
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
			PhoneNumber: data.mobileNumber,
			StaffNumber: data?.staffNumber,
			CampusId: findValueAndLabel(data?.campusId, allCampuses),
			Gender: findValueAndLabel(data?.genderId, allGenders),
			Department: findValueAndLabel(data?.departmentId, allDepartments),
			StudentType: findValueAndLabel(
				data?.studentTypeId,
				allStudentTypes
			),
			UserRole: { label: data.role, value: data.role },
			Username: data.userName,
			MobileNo: data.mobileNo,
			DepartmentOption: findValueAndLabel(
				data?.departmentOptionId,
				allDepartmentOption
			)
		},
		resolver: yupResolver(editUserSchema),
		context: {
			isLDepartment: allDepartments?.length > 0 ? true : false
		}
	});
	const { mutate, isLoading: isPosting } = useApiPut();

	const queryClient = useQueryClient();
	const onSubmit = (submitData) => {
		console.log("WAHAHAHAHA", submitData);
		const requestDet = {
			url: editUserUrl(data.userId),
			data: {
				LastName: submitData?.Surname,
				Firstname: submitData?.Firstname,
				MiddleName: submitData?.Middlename ?? "",
				MobileNumber: submitData?.PhoneNumber,
				StaffNumber: submitData?.StaffNumber,
				StudentTypeId: submitData?.StudentType?.value,
				CampusId: submitData?.CampusId?.value,
				DepartmentId: submitData?.Department?.value,
				GenderId: submitData?.Gender?.value,
				Role: submitData?.UserRole?.value,
				DepartmentOptionId: submitData?.DepartmentOption?.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllUsersUrl(currentFilterState)
				);

				setShouldUpdateProfile(true);
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
		setValue("DepartmentOption", null);
	};

	useEffect(() => {
		if (allDepartmentOption.length > 0) {
			const defaultDepartmentOption = findValueAndLabel(
				data?.departmentOptionId,
				allDepartmentOption
			);
			setValue("DepartmentOption", defaultDepartmentOption);
		}
	}, [allDepartmentOption, data?.departmentOptionId, setValue]);
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
					<label
						htmlFor="gender"
						className={styles.admission_list_edit_label}
					>
						Gender
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="Gender"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select gender"
								searchable={true}
								id="Gender"
								{...field}
								options={allGenders}
								isError={!!errors.Gender}
								errorText={
									errors.Gender && errors.Gender.message
								}
							/>
						)}
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
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="admission_batch">Campus</label>
				</div>
				<div className="col-lg-8">
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
				<div className={`col-1 d-flex`}>
					<span
						className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
						role="button"
						onClick={() => {
							ref?.current?.clearValue();
							setValue("CampusId", null);
						}}
					>
						<RedCancel className="align-middle" />
					</span>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="StudentType">Student Type</label>
				</div>
				<div className="col-lg-8">
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
				<div className={`col-1 d-flex`}>
					<span
						className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
						role="button"
						onClick={() => {
							ref?.current?.clearValue();
							setValue("StudentType", null);
							setValue("Department", null);
						}}
					>
						<RedCancel className="align-middle" />
					</span>
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
						<div className="col-lg-8">
							<Controller
								name="Department"
								control={control}
								defaultValue={
									data?.departmentId
										? findValueAndLabel(
												data?.departmentId,
												allDepartments
										  )
										: null
								}
								render={({ field }) => (
									<SMSelect
										placeholder="Select department"
										searchable={true}
										id="Department"
										{...field}
										ref={ref}
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
						<div className={`col-1 d-flex`}>
							<span
								className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
								role="button"
								onClick={() => {
									ref?.current?.clearValue();
									setValue("Department", null);
								}}
							>
								<RedCancel className="align-middle" />
							</span>
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
					<div className="row mb-4">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="departmentOption">
								Department Option*
							</label>
						</div>
						<div className="col-lg-8">
							<Controller
								name="DepartmentOption"
								control={control}
								defaultValue={
									data?.departmentOptionId
										? findValueAndLabel(
												data?.departmentOptionId,
												allDepartmentOption
										  )
										: null
								}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a programme option"
										searchable={true}
										id="DepartmentOption"
										options={allDepartmentOption}
										ref={ref}
										isError={!!errors.departmentOption}
										errorText={
											errors.DepartmentOption &&
											errors.DepartmentOption.message
										}
									/>
								)}
							/>
						</div>
						<div className={`col-1 d-flex`}>
							<span
								className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
								role="button"
								onClick={() => {
									ref?.current?.clearValue();
									setValue("departmentOption", null);
								}}
							>
								<RedCancel className="align-middle" />
							</span>
						</div>
					</div>
				)
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
