import { Button, SMSelect, TextField } from "../../../../../../ui_elements";
import { useApiPut } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	updateAcceptanceFeesUrl,
	getAcceptanceFeesUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";

export const EditAcceptanceFee = ({
	data,
	filter,
	closeModal,
	allServiceTypes
}) => {
	const { id, studentTypeId, sessionId, serviceTypeId } = data;
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
			ServiceTypeId: findValueAndLabel(serviceTypeId, allServiceTypes)
		},
		resolver: yupResolver(UploadSchema)
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: updateAcceptanceFeesUrl(id),
			data: {
				studentTypeId,
				sessionId,
				Amount: data.Amount,
				TeneceCommission: data.TeneceCommission,
				serviceTypeId: data.ServiceTypeId.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAcceptanceFeesUrl({
						sessionId: filter.session,
						studentTypeId: filter.studentTypeId
					})
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Acceptance fees successfully edited!",
					body: "You successfully edited acceptance fees"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Acceptance fees edit Failed!",
					body:
						response?.data?.message ||
						`Acceptance fees wasn't edited successfully`
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
