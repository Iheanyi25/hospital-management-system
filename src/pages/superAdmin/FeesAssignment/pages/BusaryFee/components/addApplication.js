import styles from "../style.module.css";
import { Controller, useForm } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import {
	getSundryPaymentBusaryFees,
	createBusaryFeesUrl,
	getSetUpCategoryTypesUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";

export const AddApplication = ({
	currentFilterState,
	busaryCategories,
	serviceType,
	closeModal
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: createBusaryFeesUrl(),
			data: {
				BursaryFeeDescription: data.BursaryFeeDescription,
				BursaryFeeCode: data.BursaryFeeCode.toUpperCase(),
				Amount: data.Amount,
				TeneceCommission: data.TeneceCommission || 0,
				ServiceTypeId:data.ServiceTypeId.value,
				BursaryCategoryId: data.BursaryCategoryId.value,
				BursaryCategoryTypeId: data.BursaryCategoryTypeId.value,
				StampDuty: data.StampDuty || 0
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
	const watchData = watch({
		BursaryCategoryId: "BursaryCategoryId"
	});
	const { data: setupCategoryFees, isLoading: isLoadingSetupCategoryFees } =
		useApiGet(
			getSetUpCategoryTypesUrl({
				setupCategoryId: watchData?.BursaryCategoryId?.value
			}),
			{
				enabled: !!watchData?.BursaryCategoryId?.value,
				refetchOnWindowFocus: false
			}
		);
	const allSetupCategoryFees = formatSelectItems(
		setupCategoryFees?.data,
		"name",
		"id"
	);
	console.log(errors);
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
						render={({ field }) => (
							<SMSelect
								{...field}
								id="ServiceTypeId"
								options={serviceType}
								placeholder="Select a service type"
								is
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
								options={busaryCategories}
								placeholder="Select a bursary category"
								is
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
			{isLoadingSetupCategoryFees && (
				<div className="col-md-6">
					<Spinner />
				</div>
			)}
			{setupCategoryFees?.data?.length > 0 && (
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
									options={allSetupCategoryFees}
									placeholder="Select a bursary category"
									is
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
					label="Add fee"
					buttonClass="primary"
					loading={
						isSubmitting || isLoading || isLoadingSetupCategoryFees
					}
				/>
			</div>
		</form>
	);
};
