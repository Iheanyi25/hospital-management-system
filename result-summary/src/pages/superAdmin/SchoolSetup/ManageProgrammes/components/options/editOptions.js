import styles from "../../style.module.css";
import { Button, TextField } from "../../../../../../ui_elements";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import {
	getAllPaginatedOptionsUrl,
	updateOptionUrl
} from "../../../../../../api/urls";
import { useApiPut } from "../../../../../../api/apiCall";
import { useQueryClient } from "react-query";

export const EditOptions = ({ data, currentFilterState, closeModal }) => {
	const { departmentOptionId } = data;
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			name: data?.departmentOption,
			code: data?.code
		},
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: updateOptionUrl(),
			data: {
				name: data.name.toUpperCase(),
				code: data.code.toUpperCase(),
				departmentId: currentFilterState.departmentId,
				id: departmentOptionId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllPaginatedOptionsUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Option Updated Success!",
					body: "Option was updated successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Option Updated Failed!",
					body:
						response?.data?.message ||
						`Option wasn't updated successfully`
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
					<label htmlFor="name">Option Name</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="name"
						placeholder="Enter option name"
						type="text"
						name="name"
						register={register}
						error={errors.name}
						errorText={errors.name && errors.name.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="code">Option Code</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="code"
						placeholder="Enter option code"
						type="text"
						name="code"
						register={register}
						error={errors.code}
						errorText={errors.code && errors.code.message}
						required
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="edit_option"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
