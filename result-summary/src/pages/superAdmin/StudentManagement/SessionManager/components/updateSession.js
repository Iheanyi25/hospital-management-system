import styles from "../style.module.css";
import { Button, SMSelect } from "../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from ".";
import {
	getAllDepartmentActiveSessionsUrl,
	setDepartmentActiveSessionUrl
} from "../../../../../api/urls";
import { useQueryClient } from "react-query";
import { useApiPost } from "../../../../../api/apiCall";

export const UpdateSession = ({
	currentFilterState,
	closeModal,
	filter,
	deptsActiveSessionsToUpdate,
	resetdepartmentArray,
	allSessions
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: setDepartmentActiveSessionUrl(),
			data: {
				departmentId: deptsActiveSessionsToUpdate.map(
					(item) => item.departmentId
				),
				studentTypeId: filter.studentTypeId,
				activeSessionId: data.activeSessionId.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				resetdepartmentArray();
				queryClient.invalidateQueries(
					getAllDepartmentActiveSessionsUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Session Update Success!",
					body: "Session has been updated successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Unit Load Update Failed!",
					body:
						response?.data?.message ||
						`Session wasn't updated successfully`
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
					<label htmlFor="activeSessionId">Session</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="activeSessionId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="activeSessionId"
								options={allSessions}
								placeholder="Select Academic Session"
								searchable={false}
								isError={!!errors.activeSessionId}
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update_session"
					label="Update Session"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
