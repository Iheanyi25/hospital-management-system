import styles from "../style.module.css";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRoleSchema } from "./componentsSchema";
import { useApiPost } from "../../../../../../api/apiCall";
import { addRoleUrl, getRolesUrl } from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

export const AddRole = ({ currentFilterState, closeModal }) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(addRoleSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: addRoleUrl({ Name: data.Name })
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getRolesUrl(currentFilterState));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Add Role Success!",
					body: "You have added a new role successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModal();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Add Role Failed!",
					body:
						response?.data?.message ||
						`Add role wasn't successfully`
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
					<label htmlFor="RoleName">Role Name</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="Name"
						placeholder="Enter role name"
						type="text"
						name="Name"
						register={register}
						error={errors.Name}
						errorText={errors.Name && errors.Name.message}
						required
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="create_role"
					label="Create Role"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
