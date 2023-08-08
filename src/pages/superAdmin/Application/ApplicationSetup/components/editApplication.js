import styles from "../style.module.css";
import { Button, SMSelect, TextField } from "../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import {
	getAllApplicationTypesUrl,
	editApplicationTypeUrl
} from "../../../../../api/urls";
import { useApiPut } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

export const EditApplication = ({
	data,
	currentFilterState,
	allSessions,
	allServiceTypes,
	allStudentTypes,
	allPaymentPurpose,
	closeModal
}) => {
	const { id } = data;
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			name: data?.name,
			code: data?.code,
			amount: data?.amount,
			teneceCommission: data?.teneceCommission,
			sessionId: findValueAndLabel(data?.sessionId, allSessions),
			paymentType: { value: data?.paymentType, label: data?.paymentType },
			studentTypeId: findValueAndLabel(
				data?.studentTypeId,
				allStudentTypes
			),
			serviceTypeId: findValueAndLabel(
				data?.serviceTypeId,
				allServiceTypes
			)
		},
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: editApplicationTypeUrl(id),
			data: {
				name: data.name.toUpperCase(),
				code: data.code.toUpperCase(),
				amount: data.amount,
				teneceCommission: data.teneceCommission,
				paymentType: data.paymentType.label,
				sessionId: data.sessionId.value,
				studentTypeId: data.studentTypeId.value,
				serviceTypeId: data.serviceTypeId.value
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
					body: "Application was updated successfully"
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
						`Application wasn't updated successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	console.log(allPaymentPurpose, "data");
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
						type="number"
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
						type="number"
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
					<label htmlFor="paymentType">Payment Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="paymentType"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="paymentType"
								options={allPaymentPurpose}
								placeholder="Select Payment Type"
								is
								searchable={false}
								isError={!!errors.paymentType}
								errorText={
									errors.paymentType &&
									errors.paymentType.message
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
								is
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
			<div className="d-flex justify-content-end">
				<Button
					data-cy="edit_course"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
