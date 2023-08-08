import { Button, SMSelect, TextField } from "../../../../../../ui_elements";
import { useApiPut } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	updateSundryFeesAssignmentsUrl,
	getSundryFeesAssignmentsUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";

export const EditSundryFees = ({
	data,
	filter,
	closeModal,
	allServiceTypes,
	allPaymentPurpose,
	allPaymentTypes,
	pageNumber
}) => {
	const {
		id,
		studentTypeId,
		sessionId,
		serviceTypeId,
		paymentPurposeId,
		paymentTypeId
	} = data;
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPut();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			Amount: data?.Amount,
			TeneceCommission: data?.TeneceCommission,
			ServiceTypeId: findValueAndLabel(serviceTypeId, allServiceTypes),
			PaymentType: findValueAndLabel(paymentTypeId, allPaymentTypes),
			PaymentPurpose: findValueAndLabel(
				paymentPurposeId,
				allPaymentPurpose
			),
		},
		resolver: yupResolver(UploadSchema)
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: updateSundryFeesAssignmentsUrl(id),
			data: {
				studentTypeId,
				sessionId,
				Amount: data.Amount,
				TeneceCommission: data.TeneceCommission,
				serviceTypeId: data.ServiceTypeId.value,
				PaymentTypeId: data.PaymentType.value,
				PaymentPurposeId: data.PaymentPurpose.value,
				studentModeId:filter.StudentModeId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getSundryFeesAssignmentsUrl({
						SessionId: filter.SessionId,
						PaymentTypeId: filter.PaymentType,
						PaymentPurposeId: filter.PaymentPurpose,
						FacultyId: filter.FacultyId,
						LevelId: filter.Level,
						StudentTypeId: filter.StudentTypeId,
						StudentModeId: filter.StudentModeId,
						pageNumber,
						pageSize: filter.pageSize
					})
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Sundry fees successfully edited!",
					body: "You successfully edited sundry fees"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Sundry fees edit Failed!",
					body:
						response?.data?.message ||
						`Sundry fees wasn't edited successfully`
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
					<label htmlFor="amount">Amount</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="Amount"
						control={control}
						render={({ field }) => (
							<TextField
								type="number"
								placeholder="Enter amount"
								id="Amount"
								error={errors.Amount}
								errorText={
									errors.Amount && errors.Amount.message
								}
								{...field}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="TeneceCommission">Tenece commission</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="TeneceCommission"
						control={control}
						render={({ field }) => (
							<TextField
								type="number"
								placeholder="Enter commission"
								register={register}
								id="TeneceCommission"
								error={errors.TeneceCommission}
								errorText={
									errors.TeneceCommission &&
									errors.TeneceCommission.message
								}
								required
								{...field}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex  align-items-center">
					<label htmlFor="ServiceTypeId">Service Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="ServiceTypeId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select Service Type"
								options={allServiceTypes}
								id="ServiceTypeId"
								searchable={false}
								isError={!!errors.ServiceTypeId}
								errorText={
									errors.ServiceTypeId &&
									errors.ServiceTypeId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex  align-items-center">
					<label htmlFor="ServiceTypeId">Payment Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="PaymentType"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select Payment Type"
								options={allPaymentTypes}
								id="PaymentType"
								searchable={false}
								isError={!!errors.PaymentType}
								errorText={
									errors.PaymentType &&
									errors.PaymentType.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex  align-items-center">
					<label htmlFor="ServiceTypeId">Payment Purpose</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="PaymentPurpose"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select Payment Purpose"
								options={allPaymentPurpose}
								id="ServiceTypeId"
								searchable={false}
								isError={!!errors.PaymentPurpose}
								errorText={
									errors.PaymentPurpose &&
									errors.PaymentPurpose.message
								}
							/>
						)}
					/>
				</div>
			</div>

			<div className="d-flex justify-content-end">
				<Button
					label="Update"
					data-cy="update_acceptance"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
