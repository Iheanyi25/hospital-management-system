import { Button, Quill, SMSelect, TextField } from "../../../../ui_elements";

import styles from "../style.module.css";

import { getNoticeByIdUrl, postNoticeUrl } from "../../../../api/urls";

import { useApiPost, useApiPut } from "../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import { NoticeSchema } from "./noticeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { formatInputDate } from "../../../../utils/formatDate";

export const AddNoticeModal = ({
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

	const addNotice = (data) => {
		const requestDet = {
			url: postNoticeUrl(),
			data: {
				title: data.title,
				description: data.description,
				senderName: data.senderName,
				categoryId: data.categoryId.value,
				startDate: data.startDate,
				endDate: data.endDate
			}
		};
		callAction(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Notice Action Success!",
					body: "Notice(s) added successfully"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Notice Action Failed!",
					body:
						response?.data?.message ||
						`Notice(s) not added successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const editNotice = (data) => {
		const requestDet = {
			url: getNoticeByIdUrl(currentId),
			data: {
				title: data.title,
				description: data.description,
				senderName: data.senderName,
				categoryId: data.categoryId.value,
				startDate: data.startDate,
				endDate: data.endDate
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Notice Update Success!",
					body: "Notice was updated successfully"
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
					title: "Notice Update Failed!",
					body:
						response?.data?.message ||
						`Notice wasn't updated successfully`
				});
				setCurrentId(null);
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	// get categories

	const {
		control,
		register,
		handleSubmit,
		setValue,
		getValues,
		clearErrors,
		formState: { errors },
		watch
	} = useForm({
		defaultValues: {
			startDate: currentData?.startDate?.split("T")[0],
			endDate: currentData?.endDate?.split("T")[0],
			title: currentData?.title,
			senderName: currentData?.senderName,
			description: currentData?.description,
			categoryId: findValueAndLabel(
				currentData?.categoryId,
				optionsSelect
			)
		},
		resolver: yupResolver(NoticeSchema)
	});

	const fileFieldValue = watch("startDate");
	return (
		<form
			onSubmit={handleSubmit(currentId === null ? addNotice : editNotice)}
		>
			<div className={styles.add_notice_body}>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="NoticeTitle">Notice title</label>
					</div>
					<div className="col-lg-9">
						<TextField
							name={"title"}
							placeholder="Enter notice title"
							register={register}
							error={errors.title}
							errorText={errors.title && errors.title.message}
							required
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="StartDate">Start date</label>
					</div>
					<div className="col-lg-9">
						<TextField
							id={"startDate"}
							name={"startDate"}
							register={register}
							error={errors.startDate}
							errorText={
								errors.startDate && errors.startDate.message
							}
							min={formatInputDate(new Date())}
							type="date"
							placeholder="Choose start date"
							required
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="EndDate">End date</label>
					</div>
					<div className="col-lg-9">
						<TextField
							type="date"
							placeholder="Choose end date"
							id={"endDate"}
							name={"endDate"}
							register={register}
							error={errors.endDate}
							errorText={errors.endDate && errors.endDate.message}
							disabled={!fileFieldValue}
							min={fileFieldValue}
							required
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="EndDate">Sender's Name</label>
					</div>
					<div className="col-lg-9">
						<TextField
							placeholder="Enter a sender"
							id={"senderName"}
							name={"senderName"}
							register={register}
							error={errors.senderName}
							errorText={
								errors.senderName && errors.senderName.message
							}
							required
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="Category">Category</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="categoryId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id={"categoryId"}
									options={optionsSelect}
									placeholder="Choose notice category"
									isError={!!errors.categoryId}
									errorText={
										errors.categoryId &&
										errors.categoryId.message
									}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-start">
						<label className="mt-2" htmlFor="NoticeDescription">
							Notice description
						</label>
					</div>
					<div className="col-lg-9">
						<Quill
							theme="snow"
							value={getValues().description}
							onChange={(e) => {
								setValue("description", e);
								clearErrors("description");
							}}
							error={errors.description}
							errorText={
								errors.description && errors.description.message
							}
						/>
					</div>
				</div>
			</div>

			<div className="mt-5 d-flex align-items-center justify-content-end">
				<Button
					type={"submit"}
					buttonClass="primary"
					label={currentId ? "Edit notice" : "Add notice"}
					loading={currentId ? isEditing : isAdding}
				/>
			</div>
		</form>
	);
};
