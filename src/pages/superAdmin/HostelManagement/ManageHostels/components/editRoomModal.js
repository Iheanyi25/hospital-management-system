import styles from "../style.module.css";
import { Controller, useForm } from "react-hook-form";
import { Button, SMSelect, TextField } from "../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { useApiPut } from "../../../../../api/apiCall";
import { updateHostelRoomUrl } from "../../../../../api/urls";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { useState } from "react";
import { useEffect } from "react";

export const EditRoomModal = ({
	setUploadModal,
	filter,
	allGenders,
	allLevels,
	allCategories,
	currentData,
	allActivationStatuses
}) => {
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const [watchData, setWatchData] = useState({
		groupSelectionId: currentData?.groupSelectionId ?? ""
	});
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			name: currentData?.name,
			price: currentData?.price,
			hostelRoomCategoryId: findValueAndLabel(
				currentData?.hostelRoomCategoryId,
				allCategories
			),
			groupSelectionId: findValueAndLabel(
				currentData?.groupSelectionId,
				allActivationStatuses
			),
			levelId: currentData?.levelId?.map((levelId) =>
				findValueAndLabel(levelId, allLevels)
			),
			genderId: findValueAndLabel(currentData?.genderId, allGenders)
		},
		resolver: yupResolver(UploadSchema)
	});
	const isChooseSelectionRquired =
		watchData.groupSelectionId === 2 || watchData.groupSelectionId === 3;

	useEffect(() => {
		const subscription = watch(({ groupSelectionId }) => {
			setWatchData((state) => ({
				groupSelectionId:
					groupSelectionId?.value ?? state.groupSelectionId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onSubmit = (data) => {
		const requestDet = {
			url: updateHostelRoomUrl(currentData?.id),
			data: {
				name: data.name,
				genderId: data?.genderId.value,
				hostelRoomCategoryId: data?.hostelRoomCategoryId?.value,
				price: data?.price,
				groupSelectionId: data?.groupSelectionId.value,
				levelId: data?.levelId.map((levelId) => levelId.value)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Room Edition Success!",
					body: "Room was edited successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setUploadModal(false);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Room Edition Failed!",
					body:
						response?.data?.message ||
						`Room wasn't edited successfully`
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
					<label htmlFor="name">Room Name</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="name"
						placeholder="Enter room name"
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
					<label htmlFor="price">Price</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="price"
						placeholder="Enter a price"
						type="text"
						name="price"
						register={register}
						error={errors.price}
						errorText={errors.price && errors.price.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="genderId">Gender</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="genderId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"genderId"}
								options={allGenders}
								placeholder="Choose occupant gender"
								disabled={
									currentData?.genderId === 1 ||
									currentData?.genderId === 2
								}
								isError={!!errors.genderId}
								errorText={
									errors.genderId && errors.genderId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="groupSelectionId">Select Levels</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="groupSelectionId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"groupSelectionId"}
								options={allActivationStatuses}
								placeholder="Select action"
								isError={!!errors.groupSelectionId}
								errorText={
									errors.groupSelectionId &&
									errors.groupSelectionId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			{isChooseSelectionRquired && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="levelId">Specify Exception</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="levelId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="levelId"
									options={allLevels}
									placeholder="Select levels"
									isMulti
									searchable={true}
									isError={!!errors.levelId}
									errorText={
										errors.levelId && errors.levelId.message
									}
								/>
							)}
						/>
					</div>
				</div>
			)}
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="hostelRoomCategoryId">Categories</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="hostelRoomCategoryId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"hostelRoomCategoryId"}
								options={allCategories}
								placeholder="Choose occupant level"
								isError={!!errors.hostelRoomCategoryId}
								errorText={
									errors.hostelRoomCategoryId &&
									errors.hostelRoomCategoryId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="edit_room"
					label="Edit"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
