import { useMemo, useRef } from "react";
import { Button, SMSelect, Spinner } from "../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { deactiveStudentSchema } from "./componentsSchema";
import { PersonnelCard } from "./personnelCard";
import {
	deactivateStudentUrl,
	getAllStudentsUrl,
	getStudentProfileUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import { SEMESTERS } from "../../../../../utils/constants";

export const DeactivateStudentModal = ({
	userId,
	filter,
	pageNumber,
	searchTerm,
	closeModal,
	allSessions,
	allRoles
}) => {
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useApiPost();
	const status = useRef()

	const {
		data: studentData,
		isLoading: isLoadingStudentData,
		error
	} = useApiGet(getStudentProfileUrl({ refCode: userId }), {
		refetchOnWindowFocus: false,
		enabled: !!userId
	});

	const modifiedRoles = useMemo(
		() => allRoles.filter((role) => role.value !== "student"),
		[allRoles]
	);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(deactiveStudentSchema)
	});

	const onSubmit = ({ endSession, startSession, semester, status }) => {
		const requestDet = {
			url: deactivateStudentUrl(),
			data: {
				userId: userId,
				startSessionId: startSession.value,
				endSessionId: endSession.value,
				semesterId: [semester.value],
				role: status.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllStudentsUrl({
						...filter,
						pageNumber,
						searchTerm
					})
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: `Status Changed to ${status.label}!`,
					body: `User status was changed successfully`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Status Change Failure!",
					body:
						response?.data?.message ||
						`User status change was not successful!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const details = [
		{
			title: "Full Name",
			value: `${studentData?.data?.personalData?.fullname}`
		},
		{
			title: "Department",
			value: studentData?.data?.programmeDetail?.department
		},
		{
			title: "Matric No",
			value: studentData?.data?.programmeDetail?.matricNumber
		},
		{
			title: "Email",
			value: studentData?.data?.personalData?.email
		},
		{
			title: "Phone",
			value: studentData?.data?.personalData?.mobileNumber
		},
		{
			title: "State of Origin",
			value: studentData?.data?.personalData?.state
		},
		{
			title: "Entry Mode",
			value: studentData?.data?.programmeDetail?.modeOfEntry
		}
	];

	const handleStatusChange = (value) => {
		setValue("status", value)
		status.current = value
	}

	if (isLoadingStudentData) return <Spinner />;

	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<form className={`w-100 mt-5`} onSubmit={handleSubmit(onSubmit)}>
			<div className="my-5">
				<PersonnelCard
					noMargin={false}
					noLogo={true}
					details={details}
					user={{
						fullName: details?.[0]?.value,
						passport: studentData?.data?.personalData?.passport
					}}
				/>
			</div>
			<div className="row mb-4  justify-content-between border-top pt-4">
				<div className="row col-md-6 align-items-center mb-4">
					<div className="col-lg-4">
						<label htmlFor="status">Status</label>
					</div>
					<div className="col-lg-8">
						<Controller
							name="status"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="status"
									options={modifiedRoles}
									onChange={handleStatusChange}
									placeholder="Select Status"
									searchable={true}
									isError={!!errors.status}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row col-md-6 align-items-center mb-4">
					<div className="col-lg-4">
						<label htmlFor="semester">Semester</label>
					</div>
					<div className="col-lg-8">
						<Controller
							name="semester"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="semester"
									options={SEMESTERS}
									placeholder="Select Semester"
									searchable={true}
									isError={!!errors.semester}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row col-md-6 align-items-center">
					<div className="col-lg-4">
						<label htmlFor="startSession">Start Session</label>
					</div>
					<div className="col-lg-8">
						<Controller
							name="startSession"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="startSession"
									options={allSessions}
									placeholder="Select Session"
									searchable={true}
									isError={!!errors.startSession}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row col-md-6 align-items-center">
					<div className="col-lg-4">
						<label htmlFor="endSession">End Session</label>
					</div>
					<div className="col-lg-8">
						<Controller
							name="endSession"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="endSession"
									options={allSessions}
									placeholder="Select Session"
									searchable={true}
									isError={!!errors.endSession}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					label="Cancel"
					data-cy="cancel"
					type="button"
					onClick={closeModal}
				/>
				<Button
					label="Deactivate"
					data-cy="deactivate"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
