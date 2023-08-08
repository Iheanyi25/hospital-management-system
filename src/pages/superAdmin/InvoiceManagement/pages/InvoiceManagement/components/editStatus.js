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
	level: yup.mixed().required("please select a level")
});

export const EditStatus = ({
	data,
	allLevels,
	allSessions,
	closeModal,
	matricNo
}) => {
	const { mutate, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const { rrr } = data;

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			session: findValueAndLabel(data?.session, allSessions, "label"),
			level: findValueAndLabel(data?.level, allLevels, "label")
		},
		resolver: yupResolver(Schema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: updateFeeInvoiceUrl(),
			data: {
				rrr,
				sessionId: data.session.value,
				levelId: data.level.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllStudetInvoicesUrl(matricNo)
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
					<label htmlFor="session">Session</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="session"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
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
