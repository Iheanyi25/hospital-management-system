import styles from "../style.module.css";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEditSchema } from "./componentsSchema";
import { useApiPut } from "../../../../../../api/apiCall";
import { getMenusUrl, updateMenuUrl } from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

export const EditMenu = ({ currentFilterState, editMenuData, closeModal }) => {
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(addEditSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: updateMenuUrl(editMenuData.id),
			data: { Name: data.Name }
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getMenusUrl(currentFilterState));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Edit Menu Success!",
					body: "Menu edit successful"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModal();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Edit Menu Failed!",
					body:
						response?.data?.message || `Edit menu wasn't successful`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		setValue("Name", editMenuData.name);
	}, [editMenuData.name, setValue]);

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
