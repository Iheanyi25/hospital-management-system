import {
	Button,
	Checkbox,
	SMSelect,
	TextField
} from "../../../../../ui_elements";

import styles from "../style.module.css";

import {
	createHostelBedUrl,
	updateHostelBedUrl
} from "../../../../../api/urls";

import { useApiPost, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import { createHostelBedSchema } from "./hostelSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

export const CreateBedspaceModal = ({
	closeModal,
	currentData,
	currentId,
	setCurrentId,
	filter,
	allLevels,
	state
}) => {
	const { mutate: callAction, isLoading: isAdding } = useApiPost();
	const { mutate, isLoading: isEditing } = useApiPut();
	const [active, setActive] = useState(currentData?.active ?? false);

	const queryClient = useQueryClient();
	const levels = state.levelId.includes("0")
		? allLevels
		: allLevels.filter((item) =>
				state.levelId.includes(String(item.value))
		  );
	const createHostelBed = (data) => {
		const requestDet = {
			url: createHostelBedUrl(),
			data: {
				name: data?.name,
				active: !active,
				hostelRoomId: state?.id,
				levelId: data?.levelId?.value
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
				levelId: data?.levelId.value
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
				setCurrentId(null);
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
			name: currentData?.name,
			levelId: findValueAndLabel(currentData?.levelId, levels)
		},
		resolver: yupResolver(createHostelBedSchema)
	});
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
						<label htmlFor="levelId">Level</label>
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
									id={"levelId"}
									options={levels}
									placeholder="Choose occupant level"
									isError={!!errors.levelId}
									errorText={
										errors.levelId && errors.levelId.message
									}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						{/* <label htmlFor="levelId">Is reserved</label> */}
					</div>
					<div className="col-lg-9 px-0 d-flex align-items-center">
						<Checkbox
							label={"Is reserved"}
							labelClassName="ml-3"
							id={"active"}
							checked={active}
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
