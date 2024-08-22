import styles from "../style.module.css";
import { Controller, useForm } from "react-hook-form";
import { Button, SMSelect, TextField } from "../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { useApiPost } from "../../../../../api/apiCall";
import {
	createApplicationTypeUrl,
	getAllApplicationTypesUrl
} from "../../../../../api/urls";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";

export const AddApplication = ({
	currentFilterState,
	allSessions,
	allServiceTypes,
	allStudentTypes,
	currentData,
	allDepartments,
	allActivationStatuses,
	closeModal
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const [watchData, setWatchData] = useState({
		groupSelectionId: currentData?.groupSelectionId ?? ""
	});

	const isChooseSelectionRquired =
		watchData.groupSelectionId === 2 || watchData.groupSelectionId === 3;
	const {
		register,
		handleSubmit,
		control,
		setValue,
		clearErrors,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema),
		context: {
			isChooseSelectionRquired
		}
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: createApplicationTypeUrl(),
			data: {
				name: data.name.toUpperCase(),
				code: data.code.toUpperCase(),
				amount: data.amount,
				teneceCommission: data.teneceCommission,
				sessionId: data.sessionId.value,
				studentTypeId: data.studentTypeId.value,
				serviceTypeId: data.serviceTypeId.value,
				groupSelectionId: data?.groupSelectionId.value,
				departmentId: data?.departmentId?.map(
					(departmentId) => departmentId?.value
				)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllApplicationTypesUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application Action Success!",
					body: "Application was added successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Application Action Failure!",
					body:
						response?.data?.message ||
						`Application wasn't added successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		const subscription = watch(({ groupSelectionId }) => {
			setWatchData((state) => ({
				groupSelectionId:
					groupSelectionId?.value ?? state.groupSelectionId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onGroupChange = (value) => {
		setWatchData({ groupSelectionId: value.value });
		setValue("groupSelectionId", value);
		setValue("departmentId", null);
		clearErrors("groupSelectionId");
	};
	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="name">Title</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="name"
						placeholder="Enter a title for the application"
						type="text"
						name="name"
						register={register}
						error={errors.name}
						errorText={errors.name && errors.name.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="code">Code</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="code"
						placeholder="Enter a code for the application"
						type="text"
						name="code"
						register={register}
						error={errors.code}
						errorText={errors.code && errors.code.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="amount">Amount</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="amount"
						placeholder="Enter amount"
						type="text"
						name="amount"
						register={register}
						error={errors.amount}
						errorText={errors.amount && errors.amount.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="teneceCommission">Commission</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="teneceCommission"
						placeholder="Enter commission"
						type="text"
						name="teneceCommission"
						register={register}
						error={errors.teneceCommission}
						errorText={
							errors.teneceCommission &&
							errors.teneceCommission.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="sessionId">Session</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="sessionId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="sessionId"
								options={allSessions}
								placeholder="Select Session"
								is
								searchable={false}
								isError={!!errors.sessionId}
								errorText={
									errors.sessionId && errors.sessionId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="studentTypeId">Student Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="studentTypeId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="studentTypeId"
								options={allStudentTypes}
								placeholder="Select Student Type"
								is
								searchable={false}
								isError={!!errors.studentTypeId}
								errorText={
									errors.studentTypeId &&
									errors.studentTypeId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="serviceTypeId">Service Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="serviceTypeId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="serviceTypeId"
								options={allServiceTypes}
								placeholder="Select service type"
								searchable={false}
								isError={!!errors.serviceTypeId}
								errorText={
									errors.serviceTypeId &&
									errors.serviceTypeId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="groupSelectionId">Department Action</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="groupSelectionId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"groupSelectionId"}
								options={allActivationStatuses}
								onChange={onGroupChange}
								placeholder="Select action"
								isError={!!errors.groupSelectionId}
								errorText={
									errors.groupSelectionId &&
									errors.groupSelectionId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			{isChooseSelectionRquired && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="departmentId">Specify Exception</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="departmentId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="departmentId"
									options={allDepartments}
									placeholder="Select Department"
									isMulti
									searchable={true}
									isError={!!errors.departmentId}
									errorText={
										errors.departmentId &&
										errors.departmentId.message
									}
								/>
							)}
						/>
					</div>
				</div>
			)}
			<div className="d-flex justify-content-end">
				<Button
					data-cy="add_application"
					label="Add Application"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
