import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import {
	updateBusaryFeesUrl,
	getSundryPaymentBusaryFees,
	getSetUpCategoryTypesUrl,
	getServicesTypesUrl
} from "../../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useState } from "react";

export const EditApplication = ({
	data,
	currentFilterState,
	busaryCategories,
	closeModal
}) => {
	const [bursaryCategoryId, setBursaryCategoryId] = useState(
		data.bursaryCategoryId
	);

	const { id } = data;

	const { data: setupCategoryTypes, isLoading: isLoadingSetupCategoryTypes } =
		useApiGet(
			getSetUpCategoryTypesUrl({
				setupCategoryId: bursaryCategoryId
			})
		);

	const { data: serviceTypes } = useApiGet(getServicesTypesUrl(), {
		refetchOnWindowFocus: false
	});

	const allServiceTypes = formatSelectItems(serviceTypes?.data, "name", "id");

	const allSetupCategoryTypes = formatSelectItems(
		setupCategoryTypes?.data,
		"name",
		"id"
	);

	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			BursaryFeeDescription: data?.bursaryFeeDescription,
			BursaryFeeCode: data?.bursaryFeeCode,
			Amount: data?.amount,
			TeneceCommission: data?.teneceCommission,
			StampDuty: data?.stampDuty,
			BursaryCategoryId: findValueAndLabel(
				bursaryCategoryId,
				busaryCategories
			) || {
				label: data?.bursaryCategoryName,
				value: data?.bursaryCategoryId
			},
			BursaryCategoryTypeId: findValueAndLabel(
				data?.bursaryCategoryTypeId,
				allSetupCategoryTypes
			) || {
				label: data?.bursaryCategoryTypeName,
				value: data?.bursaryCategoryTypeId
			},
			ServiceTypeId: findValueAndLabel(
				data?.serviceTypeId,
				allServiceTypes
			) || {
				label: data?.serviceType,
				value: data?.serviceTypeId
			}
		},
		resolver: yupResolver(UploadSchema)
	});

	const onBusaryCategoryChange = (value) => {
		setBursaryCategoryId(value?.value);
		setValue("BursaryCategoryId", value);
		setValue("BursaryCategoryTypeId", null);
	};

	const onSubmit = (data) => {
		const requestDet = {
			url: updateBusaryFeesUrl({ id }),
			data: {
				BursaryFeeDescription: data.BursaryFeeDescription,
				BursaryFeeCode: data.BursaryFeeCode.toUpperCase(),
				Amount: data.Amount,
				TeneceCommission: data.TeneceCommission || 0,
				BursaryCategoryId: data.BursaryCategoryId.value,
				BursaryCategoryTypeId: data.BursaryCategoryTypeId.value,
				StampDuty: data.StampDuty || 0,
				ServiceTypeId: data.ServiceTypeId.value
			}
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getSundryPaymentBusaryFees(currentFilterState)
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

	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="name">Bursary Fee Description</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="BursaryFeeDescription"
						placeholder="Enter bursary fee description"
						type="text"
						name="BursaryFeeDescription"
						register={register}
						error={errors.BursaryFeeDescription}
						errorText={
							errors.BursaryFeeDescription &&
							errors.BursaryFeeDescription.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="code">Bursary Fee Code</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="BursaryFeeCode"
						placeholder="Enter bursary fee code "
						type="text"
						name="BursaryFeeCode"
						register={register}
						error={errors.BursaryFeeCode}
						errorText={
							errors.BursaryFeeCode &&
							errors.BursaryFeeCode.message
						}
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
						id="Amount"
						placeholder="Enter amount"
						type="text"
						name="Amount"
						register={register}
						error={errors.Amount}
						errorText={errors.Amount && errors.Amount.message}
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
						id="TeneceCommission"
						placeholder="Enter commission"
						type="text"
						name="TeneceCommission"
						register={register}
						error={errors.TeneceCommission}
						errorText={
							errors.TeneceCommission &&
							errors.TeneceCommission.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="StampDuty">Stamp Duty</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="StampDuty"
						placeholder="Enter stamp duty"
						type="text"
						name="StampDuty"
						register={register}
						error={errors.StampDuty}
						errorText={errors.StampDuty && errors.StampDuty.message}
						required
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="BursaryCategoryId">Service Type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="ServiceTypeId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { value, onChange } }) => (
							<SMSelect
								value={value}
								onChange={onChange}
								id="ServiceTypeId"
								options={allServiceTypes}
								placeholder="Select a service type"
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
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="BursaryCategoryId">Bursary Category</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="BursaryCategoryId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="BursaryCategoryId"
								onChange={onBusaryCategoryChange}
								options={busaryCategories}
								placeholder="Select a bursary category"
								searchable={false}
								isError={!!errors.BursaryCategoryId}
								errorText={
									errors.BursaryCategoryId &&
									errors.BursaryCategoryId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			{isLoadingSetupCategoryTypes && (
				<div className="col-md-6">
					<Spinner />
				</div>
			)}
			{setupCategoryTypes?.data?.length > 0 && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="BursaryCategoryTypeId">
							Sub Category
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="BursaryCategoryTypeId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="BursaryCategoryTypeId"
									options={allSetupCategoryTypes}
									placeholder="Select a bursary category"
									searchable={false}
									isError={!!errors.BursaryCategoryTypeId}
									errorText={
										errors.BursaryCategoryTypeId &&
										errors.BursaryCategoryTypeId.message
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
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
