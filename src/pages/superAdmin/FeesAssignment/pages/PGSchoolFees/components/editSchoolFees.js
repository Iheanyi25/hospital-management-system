import { Button, TextField } from "../../../../../../ui_elements";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	updatePGFeesUrl,
	getPGFeeAssignmentsUrl
} from "../../../../../../api/urls";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";

export const EditSchoolFees = ({ data, currentFilterState, closeModal }) => {
	const {
		id,
		sessionId,
		studentTypeId,
		departmentId,
		levelId,
		feePaymentTypeId
	} = data;
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPost();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			amount: data?.amount,
			teneceCommission: data?.portalCharge
		},
		resolver: yupResolver(UploadSchema)
	});

	const onSubmit = (data) => {
		const { amount, teneceCommission } = data;
		const requestDet = {
			url: updatePGFeesUrl(),
			data: {
				id,
				sessionId,
				amount,
				teneceCommission,
				studentTypeId,
				departmentId,
				levelId,
				feePaymentTypeId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getPGFeeAssignmentsUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "School fees successfully edited!",
					body: "You successfully edited school fees"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "School fees edit Failed!",
					body:
						response?.data?.message ||
						`School fees wasn't edited successfully`
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
						name="amount"
						control={control}
						render={({ field }) => (
							<TextField
								type="text"
								placeholder="Enter amount"
								id="amount"
								error={errors.amount}
								errorText={
									errors.amount && errors.amount.message
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
					<label htmlFor="teneceCommission">Tenece commission</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="teneceCommission"
						control={control}
						render={({ field }) => (
							<TextField
								type="text"
								placeholder="Enter commission"
								id="teneceCommission"
								register={register}
								error={errors.teneceCommission}
								errorText={
									errors.teneceCommission &&
									errors.teneceCommission.message
								}
								{...field}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					label="Update"
					buttonClass="primary"
					data-cy="edit_school_fees"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
