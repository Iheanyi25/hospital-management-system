import styles from "../style.module.css";
import { Button, SMSelect, TextField } from "../../../../../../ui_elements";
import { useApiPut } from "../../../../../../api/apiCall";
import {
	getAllStudetInvoicesUrl,
	updateFeeInvoiceUrl
} from "../../../../../../api/urls";
import { Controller, useForm } from "react-hook-form";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Schema = yup.object().shape({
	session: yup.mixed().required("please select a session"),
	email: yup.string().email().required("please enter valid email"),
	matricNumber: yup.string().required("please enter matric number"),
});

export const EditStatus = ({
	data,
	allSessions,
	closeModal,
	studentId,
	currentFilterState
}) => {
	const { mutate, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const { rrr, paymentTypeId, paymentPurposeId } = data;

	const {
		control,
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		defaultValues: {
			session: findValueAndLabel(data?.sessionId, allSessions),
			matricNumber: data?.regNumber,
			email: data?.email,
		},
		resolver: yupResolver(Schema)
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: updateFeeInvoiceUrl(),
			data: {
				rrr,
				sessionId: data.session.value,
				email: data.email,
				matricNumber: data.matricNumber,
				studentId,
				paymentPurposeId,
				paymentTypeId
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
	return (
		<form
			className={`${styles.form_content} w-100 mt-4`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="rrr">Remita number</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="rrr"
						placeholder="Enter remita number"
						type="text"
						name="rrr"
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
						errorText={errors.matricNumber && errors.matricNumber.message}
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
					<label htmlFor="email">Email</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="email"
						placeholder="Enter email address"
						type="text"
						name="email"
						register={register}
						error={errors.email}
						errorText={errors.email && errors.email.message}
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
