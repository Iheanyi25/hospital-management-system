import styles from "../style.module.css";
import { Button, SMSelect } from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiPost } from "../../../../../../api/apiCall";
import { cloneFeesAssignmentUrl } from "../../../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UploadSchema = yup.object().shape({
	oldSessionId: yup.mixed().required("please select session to clone from"),
	newSessionId: yup.mixed().required("please select session to clone to")
});

export const CloneAcceptanceFeesAssignment = ({
	allSessions,
	closeModal,
	paymentPurposeId
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});

	const { mutate, isLoading: isPosting } = useApiPost();
	const onSubmit = (data) => {
		const { oldSessionId, newSessionId } = data;
		const requestDet = {
			url: cloneFeesAssignmentUrl(),
			data: {
				NewSessionId: newSessionId.value,
				PaymentPurposeId: paymentPurposeId,
				OldSessionId: oldSessionId.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Acceptance Fees Action Successful!",
					body: "Your acceptance fee assignment was cloned successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Acceptance Fees Action Failed!",
					body:
						response?.data?.message ||
						`acceptance fee assignment wasn't cloned correctly!`
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
					<label htmlFor="oldSessionId">From</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="oldSessionId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select Session to clone from"
								options={allSessions}
								searchable={true}
								id="oldSessionId"
								{...field}
								isError={!!errors.oldSessionId}
								errorText={
									errors.oldSessionId &&
									errors.oldSessionId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="newSessionId">To</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="newSessionId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select Session to clone to"
								options={allSessions}
								searchable={true}
								id="newSessionId"
								{...field}
								isError={!!errors.newSessionId}
								errorText={
									errors.newSessionId &&
									errors.newSessionId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update_school_fees"
					label="Clone acceptance fees"
					buttonClass="primary"
					loading={isSubmitting || isPosting}
				/>
			</div>
		</form>
	);
};
