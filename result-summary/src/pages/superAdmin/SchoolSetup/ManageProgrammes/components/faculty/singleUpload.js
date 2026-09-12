import styles from "../../style.module.css";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	getAllPaginatedFacultiesUrl,
	createFacultyUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

export const SingleUpload = ({ setUploadModal, currentFilterState }) => {
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
			url: createFacultyUrl(),
			data: {
				Name: data.name.toUpperCase()
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllPaginatedFacultiesUrl(currentFilterState)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Facult Action Success!",
					body: "Faculty was added successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setUploadModal(false);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Upload Failed!",
					body:
						response?.data?.message ||
						`Course wasn't uploaded successfully`
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
					<label htmlFor="name">Faculty Name</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="name"
						placeholder="Enter faculty name"
						type="text"
						name="name"
						register={register}
						error={errors.name}
						errorText={errors.name && errors.name.message}
						required
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="add_faculty"
					label="Add Faculty"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
