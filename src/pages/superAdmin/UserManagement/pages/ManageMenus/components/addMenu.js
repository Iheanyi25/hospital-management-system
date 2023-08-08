import styles from "../style.module.css";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEditSchema } from "./componentsSchema";
import { useApiPost } from "../../../../../../api/apiCall";
import { addMenuUrl, getMenusUrl } from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

export const AddMenu = ({ currentFilterState, closeModal }) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(addEditSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: addMenuUrl(),
			data: { Name: data.Name }
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getMenusUrl(currentFilterState));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Add Menu Success!",
					body: "You have added a new menu successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModal();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Add Menu Failed!",
					body:
						response?.data?.message ||
						`Add menu wasn't successfully`
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
					<label htmlFor="MenuName">Menu Name</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="Name"
						placeholder="Enter menu name"
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
					data-cy="create_menu"
					label="Create Menu"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
