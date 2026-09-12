import {
	Button,
	Checkbox,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../ui_elements";

import styles from "../style.module.css";

import {
	createHostelBedUrl,
	yearOfStudyUrl,
	getPGActualProgrammesUrl,
	updateHostelBedUrl
} from "../../../../../api/urls";

import { useApiGet, useApiPost, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import { createHostelBedSchema } from "./hostelSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { STUDENT_TYPES } from "../../../../../utils/constants";
import { fieldSetterAndClearer } from "../../../../../utils/fieldSetterAndClearer";

export const CreateBedspaceModal = ({
	closeModal,
	currentData,
	currentId,
	setCurrentId,
	filter,
	allActivationStatuses,
	allStudentTypes,
	state
}) => {
	const { mutate: callAction, isLoading: isAdding } = useApiPost();
	const { mutate, isLoading: isEditing } = useApiPut();
	const [active, setActive] = useState(currentData?.active || false);
	const [watchData, setWatchData] = useState({
		groupSelectionId: currentData?.groupSelectionId ?? "",
		studentTypeId: currentData?.studentTypeId ?? "",
		PGSelectionId: currentData?.pgSelectionId ?? ""
	});
	const isStudentTypeSelected =
		watchData.studentTypeId === STUDENT_TYPES.POSTGRADUATE;
	const queryClient = useQueryClient();

	const { data: level, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData.studentTypeId }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData.studentTypeId
		}
	);

	const { data: programmes, isLoading: isLoadingProgrammes } = useApiGet(
		getPGActualProgrammesUrl(),
		{
			refetchOnWindowFocus: false,
			enabled: !!isStudentTypeSelected
		}
	);

	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allLevels = formatSelectItems(level?.data, "name", "id");
	const isChooseProgrammeSelectionRquired =
		(watchData.PGSelectionId === 2 || watchData.PGSelectionId === 3) &&
		allProgrammes.length > 0 &&
		isStudentTypeSelected;

	const isChooseLevelSelectionRquired =
		(watchData.groupSelectionId === 2 ||
			watchData.groupSelectionId === 3) &&
		allLevels.length > 0;
	const {
		control,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: currentData?.name,
			groupSelectionId: findValueAndLabel(
				currentData?.groupSelectionId,
				allActivationStatuses
			),
			PGSelectionId: findValueAndLabel(
				currentData?.pgSelectionId,
				allActivationStatuses
			),
			studentTypeId: findValueAndLabel(
				currentData?.studentTypeId,
				allStudentTypes
			),
			levelId: currentData?.levelId?.map((levelId) =>
				findValueAndLabel(levelId, allLevels)
			),
			PGProgrammeId: currentData?.pgProgrammeId?.map((pgProgrammeId) =>
				findValueAndLabel(pgProgrammeId, allProgrammes, "label")
			),
			active: currentData?.active
		},
		resolver: yupResolver(createHostelBedSchema),
		context: {
			isChooseLevelSelectionRquired,
			isChooseProgrammeSelectionRquired,
			isProgrammeRequired:
				isStudentTypeSelected && allProgrammes?.length > 0
		}
	});
	useEffect(() => {
		const subscription = watch(
			({ groupSelectionId, studentTypeId, PGSelectionId }) => {
				setWatchData((state) => ({
					studentTypeId: studentTypeId?.value ?? state.studentTypeId,
					groupSelectionId:
						groupSelectionId?.value ?? state.groupSelectionId,
					PGSelectionId: PGSelectionId?.value ?? state.PGSelectionId
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const createHostelBed = (data) => {
		const requestDet = {
			url: createHostelBedUrl(),
			data: {
				name: data?.name,
				active: active,
				hostelRoomId: state?.id,
				studentTypeId: data?.studentTypeId?.value,
				groupSelectionId: data?.groupSelectionId?.value,
				PGSelectionId: data?.PGSelectionId?.value,
				levelId: data?.levelId?.map((levelId) => levelId.value),
				PGProgrammeId: data?.PGProgrammeId?.map(
					(PGProgrammeId) => PGProgrammeId.value
				)
			}
		};
		callAction(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Bedspace Action Success!",
					body: "Bedspace added successfully"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Bedspace Action Failed!",
					body:
						response?.data?.message ||
						`Bedspace not added successfully`
				});
				closeModal();
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const editHostelBed = (data) => {
		const requestDet = {
			url: updateHostelBedUrl(currentId),
			data: {
				name: data?.name,
				active,
				hostelRoomId: state?.id,
				studentTypeId: data?.studentTypeId?.value,
				groupSelectionId: data?.groupSelectionId?.value,
				PGSelectionId: data?.PGSelectionId?.value,
				levelId: data?.levelId?.map((levelId) => levelId.value),
				PGProgrammeId: data?.PGProgrammeId?.map(
					(PGProgrammeId) => PGProgrammeId.value
				)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Bedspace Update Success!",
					body: "Bedspace was updated successfully"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Bedspace Update Failed!",
					body:
						response?.data?.message ||
						`Bedspace wasn't updated successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const levels =
		state.groupSelectionId === 1
			? allLevels
			: state.groupSelectionId === 2
			? allLevels.filter(
					(item) => !state.levelId.includes(String(item.value))
			  )
			: allLevels.filter((item) =>
					state.levelId.includes(String(item.value))
			  );
	const pgprogrames = Object.keys(currentData).length > 0
		? currentData?.pgSelectionId === 1
			? allProgrammes
			: currentData?.pgSelectionId === 2
			? allProgrammes.filter(
					(item) =>
						!currentData?.pgProgrammeId.includes(String(item.value))
			  )
			: allProgrammes.filter((item) =>
					currentData?.pgProgrammeId.includes(String(item.value))
			  )
		: allProgrammes;
	return (
		<form
			onSubmit={handleSubmit(
				currentId === null ? createHostelBed : editHostelBed
			)}
		>
			<div className={styles.add_notice_body}>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="name">Bedspace Name</label>
					</div>
					<div className="col-lg-9">
						<TextField
							name={"name"}
							placeholder="Enter bedspace name"
							register={register}
							error={errors.name}
							errorText={errors.name && errors.name.message}
							required
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="studentTypeId">Student Type</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="studentTypeId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id={"studentTypeId"}
									options={allStudentTypes}
									placeholder="Select student type"
									onChange={(value) =>
										fieldSetterAndClearer({
											value,
											setterFunc: setValue,
											setField: "studentTypeId",
											clearFields: [
												"PGProgrammeId",
												"PGSelectionId",
												"levelId",
												"groupSelectionId"
											]
										})
									}
									isError={!!errors.studentTypeId}
									errorText={
										errors.studentTypeId &&
										errors.studentTypeId.message
									}
								/>
							)}
						/>
					</div>
				</div>
				{isStudentTypeSelected && (
					<div className="row mb-4">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="PGSelectionId">
								Select Programmes
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="PGSelectionId"
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<SMSelect
										{...field}
										id={"PGSelectionId"}
										options={allActivationStatuses}
										placeholder="Select programme action"
										isError={!!errors.PGSelectionId}
										errorText={
											errors.PGSelectionId &&
											errors.PGSelectionId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				)}
				{isLoadingProgrammes && (
					<div className="row mb-4">
						<Spinner />
					</div>
				)}
				{isChooseProgrammeSelectionRquired && (
					<div className="row mb-4">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="PGProgrammeId">
								Specify Programme Exceptions
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="PGProgrammeId"
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="PGProgrammeId"
										options={pgprogrames}
										placeholder="Select programmes"
										isMulti
										searchable={true}
										isError={!!errors.PGProgrammeId}
										errorText={
											errors.PGProgrammeId &&
											errors.PGProgrammeId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				)}
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
									placeholder="Select level action"
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
				{isLoadingLevels && (
					<div className="row mb-4">
						<Spinner />
					</div>
				)}
				{isChooseLevelSelectionRquired && (
					<div className="row mb-4">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="levelId">
								Specify Level Exceptions
							</label>
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
										options={levels}
										placeholder="Select levels"
										isMulti
										searchable={true}
										isError={!!errors.levelId}
										errorText={
											errors.levelId &&
											errors.levelId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				)}
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						{/* <label htmlFor="levelId">Is reserved</label> */}
					</div>
					<div className="col-lg-9 px-0 d-flex align-items-center">
						<Checkbox
							label={"Is reserved"}
							labelClassName="ml-3"
							id={"active"}
							checked={active ? false : true}
							onSelect={() => setActive(!active)}
						/>
					</div>
				</div>
			</div>

			<div className="mt-5 d-flex align-items-center justify-content-end">
				<Button
					type={"submit"}
					buttonClass="primary"
					label={
						currentId === null ? "Create Bedspace" : "Edit Bedspace"
					}
					loading={currentId === null ? isAdding : isEditing}
				/>
			</div>
		</form>
	);
};
