import { Button, SMSelect, TextField } from "../../../../../../ui_elements";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	bulkSundryFeesAssignmentsUrl,
	getSundryFeesAssignmentsUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { getDepartmentsUrl } from "../../../../../../api/urlCategories/Department";
import { useMemo } from "react";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";

export const EditSundryFees = ({
	data,
	filter,
	closeModal,
	allServiceTypes,
	allPaymentPurpose,
	allPaymentTypes,
	pageNumber,
	allStudentModesOfStudy,
	isLoadingStudentModesOfStudy
}) => {
	const {
		studentTypeId,
		sessionId,
		serviceTypeId,
		paymentPurposeId,
		paymentTypeId,
		modeOfStudyId
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
			Amount: data?.Amount,
			TeneceCommission: data?.TeneceCommission,
			ServiceTypeId: findValueAndLabel(serviceTypeId, allServiceTypes),
			PaymentType: findValueAndLabel(paymentTypeId, allPaymentTypes),
			modeOfStudyId: findValueAndLabel(
				modeOfStudyId,
				allStudentModesOfStudy
			),
			PaymentPurpose: findValueAndLabel(
				paymentPurposeId,
				allPaymentPurpose
			)
		},
		resolver: yupResolver(UploadSchema)
	});
	const { data: departmentTypes, isLoading: isLoadingDepartmentTypes } =
		useApiGet(getDepartmentsUrl(filter?.StudentTypeId, filter.FacultyId), {
			refetchOnWindowFocus: false,
			keepPreviousData: true
		});

	const allDepartmentTypes = useMemo(
		() =>
			formatSelectItems(
				departmentTypes?.data,
				"department",
				"departmentId"
			),
		[departmentTypes]
	);

	const onSubmit = (data) => {
		const requestDet = {
			url: bulkSundryFeesAssignmentsUrl(),
			data: {
				studentTypeId,
				sessionId,
				amount: data.Amount,
				teneceCommission: data.TeneceCommission,
				DepartmentId: data.DepartmentTypeId.map(
					(department) => department.value
				),
				serviceTypeId: data.ServiceTypeId.value,
				PaymentTypeId: data.PaymentType.value,
				paymentPurposeId: filter.PaymentPurpose,
				levelId: filter.Level,
				modeOfEntryId: filter.modeOfEntryId,
				studentModeId: filter.StudentModeId
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
						modeOfEntryId: filter.modeOfEntryId,
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
					<label htmlFor="DepartmentTypeId">Department</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="DepartmentTypeId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select Department"
								options={allDepartmentTypes}
								id="DepartmentTypeId"
								isMulti
								loading={isLoadingDepartmentTypes}
								searchable={false}
								isError={!!errors.DepartmentTypeId}
								errorText={
									errors.DepartmentTypeId &&
									errors.DepartmentTypeId.message
								}
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
			{allStudentModesOfStudy?.length > 0 && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							className="font-weight-bold"
							htmlFor="ModeOfStudyId"
						>
							Mode of Study
						</label>
					</div>

					<div className="col-lg-9">
						<Controller
							name="ModeOfStudyId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Select a mode of study"
									searchable={false}
									options={allStudentModesOfStudy}
									isError={!!errors.ModeOfStudyId}
									errorText={
										errors.ModeOfStudyId &&
										errors.ModeOfStudyId.message
									}
									id="ModeOfStudyId"
								/>
							)}
						/>
					</div>
				</div>
			)}
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
