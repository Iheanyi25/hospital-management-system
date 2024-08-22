import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { useApiGet, useApiPut } from "../../../../../../api/apiCall";
import {
	getAllStudetInvoicesUrl,
	getDepartmentOptionUrl,
	getDepartmentsUrl,
	updateFeeInvoiceUrl
} from "../../../../../../api/urls";
import { Controller, useForm } from "react-hook-form";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useEffect, useMemo, useState } from "react";

export const Schema = yup.object().shape({
	session: yup.mixed().required("please select a session"),
	level: yup.mixed().required("please select a level"),
	matricNumber: yup.string().required("please enter reg number")
});

export const EditStatus = ({
	data,
	allLevels,
	allSessions,
	allPaymentTypes,
	closeModal,
	studentId,
	currentFilterState
}) => {
	const { mutate, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const [departmentIdState, setDepartmentId] = useState(data?.departmentId);
	const {
		rrr,
		paymentTypeId,
		paymentPurposeId,
		studentTypeId,
		departmentId
	} = data;

	const { data: departments, isLoading: isDepartmentsLoading } = useApiGet(
		getDepartmentsUrl(studentTypeId),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: departmentOption, isLoading: isLoadingDepartmentOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentIdState,
				studentTypeId
			}),
			{
				enabled: !!departmentIdState,
				refetchOnWindowFocus: false
			}
		);
	const {
		control,
		handleSubmit,
		register,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			session: findValueAndLabel(data?.session, allSessions, "label"),
			paymentTypeId: findValueAndLabel(data?.paymentTypeId, allPaymentTypes),
			matricNumber: data?.matricNumber,
			level: findValueAndLabel(data?.level, allLevels, "label")
		},
		resolver: yupResolver(Schema)
	});

	useEffect(() => {
		const subscription = watch(({ departmentId }) => {
			setDepartmentId(departmentId?.value);

		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onSubmit = (data) => {
		const requestDet = {
			url: updateFeeInvoiceUrl(),
			data: {
				rrr,
				sessionId: data.session.value,
				matricNumber: data.matricNumber,
				levelId: data.level.value,
				departmentId: data.departmentId?.value,
				departmentOptionId: data.departmentOptionId?.value,
				studentId,
				paymentPurposeId,
				paymentTypeId: data.paymentTypeId?.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllStudetInvoicesUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice Update Success!",
					body: "Invoice was updated successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice Update Failed!",
					body:
						response?.data?.message ||
						`Invoice wasn't updated successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption?.data]
	);


	return (
		<form
			className={`${styles.form_content} w-100 mt-4`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="department">Remita number</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="department"
						placeholder="Enter remita number"
						type="text"
						name="department"
						value={data?.rrr}
						disabled
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="matricNumber">Reg Number</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="matricNumber"
						placeholder="Enter registration number"
						type="text"
						name="matricNumber"
						register={register}
						error={errors.matricNumber}
						errorText={
							errors.matricNumber && errors.matricNumber.message
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="session">Session</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="session"
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { value, onChange } }) => (
							<SMSelect
								value={value}
								onChange={onChange}
								id="session"
								options={allSessions}
								placeholder="Select Session"
								searchable={false}
								isError={!!errors.session}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="level">Level</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="level"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="level"
								options={allLevels}
								placeholder="Select Level"
								searchable={false}
								isError={!!errors.level}
							/>
						)}
					/>
				</div>
			</div>
			{isDepartmentsLoading ? (
				<Spinner />
			) : (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="departmentId">Department</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="departmentId"
							control={control}
							defaultValue={findValueAndLabel(
								departmentId,
								allDepartments
							)}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="departmentId"
									options={allDepartments}
									placeholder="Select Department"
									searchable={false}
									isError={!!errors.departmentId}
								/>
							)}
						/>
					</div>
				</div>
			)}

			{isLoadingDepartmentOptions ? (
				<Spinner />
			) : (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="departmentOptionId">
							Department Option
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="departmentOptionId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field: { value, onChange } }) => (
								<SMSelect
									value={value}
									onChange={onChange}
									defaultValue={findValueAndLabel(
										data?.departmentOptionId,
										allDepartmentOption
									)}
									id="departmentOptionId"
									options={allDepartmentOption}
									placeholder="Select department option"
									searchable={false}
								/>
							)}
						/>
					</div>
				</div>
			)}

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="paymentTypeId">
						Payment Type
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="paymentTypeId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { value, onChange } }) => (
							<SMSelect
								value={value}
								onChange={onChange}
								defaultValue={findValueAndLabel(
									paymentTypeId,
									allPaymentTypes
								)}
								id="paymentTypeId"
								options={allPaymentTypes}
								placeholder="Select Payment type"
								searchable={false}
							/>
						)}
					/>
				</div>
			</div>

			<div className={`d-flex justify-content-end ${styles.margin_btn}`}>
				<Button
					data-cy="update_invoice"
					label="Update"
					buttonClass="primary"
					loading={isPosting}
				/>
			</div>
		</form>
	);
};
