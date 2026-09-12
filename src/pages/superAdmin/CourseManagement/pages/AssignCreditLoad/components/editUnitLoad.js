import styles from "../style.module.css";
import { Button, TextField } from "../../../../../../ui_elements";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from ".";
import {
	editAllowableUnitsForStudentUrl,
	getAllowableUnitsForStudentUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { useApiPut } from "../../../../../../api/apiCall";

export const EditUnitLoad = ({ data, currentFilterState, closeModal }) => {
	const { semesterId, sessionId } = data;
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			maximumUnit: data?.maximumUnit,
			minimumUnit: data?.minimumUnit
		},
		resolver: yupResolver(UploadSchema)
	});

	const onSubmit = (data) => {
		const { maximumUnit, minimumUnit } = data;
		const requestDet = {
			url: editAllowableUnitsForStudentUrl({
				userId: currentFilterState.userId
			}),
			data: {
				maximumUnit,
				minimumUnit,
				semesterId,
				sessionId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllowableUnitsForStudentUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Credit Load Edit Success!",
					body: "Credit load Edited successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Upload Failed!",
					body: response?.data?.message || `Something went wrong!`
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
					<label htmlFor="maximumUnit">Maximum unit</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="maximumUnit"
						placeholder="Enter maximum unit"
						type="text"
						name="maximumUnit"
						register={register}
						error={errors.maximumUnit}
						errorText={
							errors.maximumUnit && errors.maximumUnit.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="minimumUnit">Minimum unit</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="minimumUnit"
						placeholder="Enter minimum unit"
						type="text"
						name="minimumUnit"
						register={register}
						error={errors.minimumUnit}
						errorText={
							errors.minimumUnit && errors.minimumUnit.message
						}
						required
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
