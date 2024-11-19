import styles from "../style.module.css";
import { Button, TextField } from "../../../../../../ui_elements";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./";
import {
	editUnitLoadsToManageUrl,
	getUnitLoadsToManageUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { useApiPut } from "../../../../../../api/apiCall";

export const EditUnitLoad = ({
	data,
	currentFilterState,
	closeModal,
	filter
}) => {
	const {
		id,
		department,
		departmentOption,
		yearOfStudyId,
		departmentId,
		departmentOptionId,
		modeOfEntryId
	} = data;
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
			url: editUnitLoadsToManageUrl(id),
			data: {
				maximumUnit,
				minimumUnit,
				yearOfStudyId,
				departmentId,
				departmentOptionId: departmentOptionId || 0,
				semesterId: filter?.semesterId,
				studentTypeId: filter?.studentTypeId,
				levelId: filter?.yearOfStudyId,
				modeOfEntryId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getUnitLoadsToManageUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Unit Load Update Success!",
					body: "Unit load has been updated successfully"
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
						`Unit load wasnn't updated successfully`
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
					<label htmlFor="department">Department</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="department"
						placeholder="Enter maximum unit"
						type="text"
						name="department"
						value={department}
						disabled
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="dept_option">Department Option</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="dept_option"
						placeholder="Enter maximum unit"
						type="text"
						name="dept_option"
						value={departmentOption || "NONE"}
						disabled
					/>
				</div>
			</div>
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
					data-cy="update_min_unit"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
