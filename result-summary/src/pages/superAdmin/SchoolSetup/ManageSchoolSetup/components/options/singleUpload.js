import styles from "../../style.module.css";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	getAllPaginatedOptionsUrl,
	createOptionUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

export const SingleUpload = ({ setUploadModal, currentFilterState }) => {
	console.log(currentFilterState);

	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: createOptionUrl(),
			data: {
				name: data.name.toUpperCase(),
				code: data.code.toUpperCase(),
				departmentId: currentFilterState.departmentId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllPaginatedOptionsUrl(currentFilterState)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Option Action Success!",
					body: "Option was added successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setUploadModal(false);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Option Upload Failed!",
					body:
						response?.data?.message ||
						`Option wasn't uploaded successfully`
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
					data-cy="add_option"
					label="Add Option"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
