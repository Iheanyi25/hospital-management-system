import { Button, SMSelect, TextField } from "../../../../../ui_elements";

import styles from "../style.module.css";

import { updateHostelUrl, createHostelsUrl } from "../../../../../api/urls";

import { useApiPost, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import { createHostelSchema } from "./hostelSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { useEffect } from "react";
import { useState } from "react";

export const CreateHostelModal = ({
	closeModal,
	currentId,
	setCurrentId,
	currentData,
	filter,
	allDepartments,
	allActivationStatuses,
	allGenders
}) => {
	const { mutate: callAction, isLoading: isAdding } = useApiPost();
	const genders = [{ label: "Mixed", value: 3 }, ...allGenders];
	const { mutate, isLoading: isEditing } = useApiPut();
	const [watchData, setWatchData] = useState({
		groupSelectionId: currentData?.groupSelectionId ?? ""
	});

	const queryClient = useQueryClient();

	const createHostel = (data) => {
		const requestDet = {
			url: createHostelsUrl(),
			data: {
				name: data?.name,
				location: data?.location,
				genderId: data?.genderId.value,
				groupSelectionId: data?.groupSelectionId.value,
				departmentId: data?.departmentId?.map(
					(departmentId) => departmentId.value
				)
			}
		};
		callAction(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Hostel Action Success!",
					body: "Hostel added successfully"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Hostel Action Failed!",
					body:
						response?.data?.message ||
						`Hostel not added successfully`
				});
				closeModal();
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const editHostel = (data) => {
		const requestDet = {
			url: updateHostelUrl(currentId),
			data: {
				name: data?.name,
				location: data?.location,
				genderId: data?.genderId.value,
				groupSelectionId: data?.groupSelectionId.value,
				departmentId: data?.departmentId?.map(
					(departmentId) => departmentId.value
				)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Hostel Update Success!",
					body: "Hostel was updated successfully"
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
					title: "Hostel Update Failed!",
					body:
						response?.data?.message ||
						`Hostel wasn't updated successfully`
				});
				setCurrentId(null);
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const isChooseSelectionRquired =
		watchData.groupSelectionId === 2 || watchData.groupSelectionId === 3;
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: currentData?.name,
			location: currentData?.location,
			departmentId: currentData?.departmentId?.map((departmentId) =>
				findValueAndLabel(departmentId, allDepartments)
			),
			groupSelectionId: findValueAndLabel(
				currentData?.groupSelectionId,
				allActivationStatuses
			),
			genderId: findValueAndLabel(currentData?.genderId, genders)
		},
		resolver: yupResolver(createHostelSchema),
		context: {
			isChooseSelectionRquired
		}
	});
	useEffect(() => {
		const subscription = watch(({ groupSelectionId }) => {
			setWatchData((state) => ({
				groupSelectionId:
					groupSelectionId?.value ?? state.groupSelectionId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	return (
		<form
			onSubmit={handleSubmit(
				currentId === null ? createHostel : editHostel
			)}
		>
			<div className={styles.add_notice_body}>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="name">Hostel Name</label>
					</div>
					<div className="col-lg-9">
						<TextField
							name={"name"}
							placeholder="Enter hostel name"
							register={register}
							error={errors.name}
							errorText={errors.name && errors.name.message}
							required
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="genderId">Occupant's Gender</label>
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
									options={genders}
									placeholder="Choose occupant gender"
									isError={!!errors.genderId}
									errorText={
										errors.genderId &&
										errors.genderId.message
									}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="groupSelectionId">
							Select Departments
						</label>
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
							<label htmlFor="hostelRoomId">
								Specify Exception
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="departmentId"
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="departmentId"
										options={allDepartments}
										placeholder="Select Department"
										isMulti
										searchable={true}
										isError={!!errors.departmentId}
										errorText={
											errors.departmentId &&
											errors.departmentId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				)}
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="location">Location</label>
					</div>
					<div className="col-lg-9">
						<TextField
							placeholder="Enter a location"
							id={"location"}
							name={"location"}
							register={register}
							error={errors.location}
							errorText={
								errors.location && errors.location.message
							}
							required
						/>
					</div>
				</div>
			</div>

			<div className="mt-5 d-flex align-items-center justify-content-end">
				<Button
					type={"submit"}
					buttonClass="primary"
					label={currentId === null ? "Create Hostel" : "Edit Hostel"}
					loading={currentId === null ? isAdding : isEditing}
				/>
			</div>
		</form>
	);
};
