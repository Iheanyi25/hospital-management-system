import { Button, SMSelect, TextField } from "../../../../../ui_elements";

import styles from "../style.module.css";

import {
	updateHostelCategoryUrl,
	createHostelCategoryUrl
} from "../../../../../api/urls";

import { useApiPost, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { CategorySchema } from "./categorySchema";

export const AddCategoryModal = ({
	closeModal,
	currentId,
	setCurrentId,
	currentData,
	filter,
	optionsSelect
}) => {
	const { mutate: callAction, isLoading: isAdding } = useApiPost();

	const { mutate, isLoading: isEditing } = useApiPut();

	const queryClient = useQueryClient();

	const addCategory = (data) => {
		const requestDet = {
			url: createHostelCategoryUrl(),
			data: {
				name: data.categoryName,
				userTypeId: data.occupantType.value
			}
		};
		callAction(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Category Action Success!",
					body: "Category(s) added successfully"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Category Action Failed!",
					body:
						response?.data?.message ||
						`Category(s) not added successfully`
				});
				closeModal();
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const editCategory = (data) => {
		const requestDet = {
			url: updateHostelCategoryUrl(currentId),
			data: {
				name: data.categoryName,
				userTypeId: data.occupantType.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Category Update Success!",
					body: "Category was updated successfully"
				});
				closeModal();
				setCurrentId(null);
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Category Update Failed!",
					body:
						response?.data?.message ||
						`Category wasn't updated successfully`
				});
				setCurrentId(null);
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const {
		control,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			categoryName: currentData?.name,
			occupantType: findValueAndLabel(
				currentData?.userTypeId,
				optionsSelect
			)
		},
		resolver: yupResolver(CategorySchema)
	});

	return (
		<form
			onSubmit={handleSubmit(
				currentId === null ? addCategory : editCategory
			)}
		>
			<div className={styles.add_notice_body}>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="categoryName">Category name</label>
					</div>
					<div className="col-lg-9">
						<TextField
							name={"categoryName"}
							placeholder="Enter category name"
							register={register}
							error={errors.categoryName}
							errorText={
								errors.categoryName &&
								errors.categoryName.message
							}
							required
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="occupantType">Occupant type</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="occupantType"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id={"occupantType"}
									options={optionsSelect}
									placeholder="Select occupant type"
									isError={!!errors.occupantType}
									errorText={
										errors.occupantType &&
										errors.occupantType.message
									}
								/>
							)}
						/>
					</div>
				</div>
			</div>

			<div className="mt-5 d-flex align-items-center justify-content-end">
				<Button
					type={"submit"}
					buttonClass="primary"
					label={currentId ? "Edit Category" : "Create Category"}
					loading={currentId ? isEditing : isAdding}
				/>
			</div>
		</form>
	);
};
