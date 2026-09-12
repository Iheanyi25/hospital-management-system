import { AsyncMultiSelect, Button, SMSelect } from "../../../../../ui_elements";

import styles from "../style.module.css";

import {
	bulkToggleHostelRoomsUrl,
	getAllHostelsRoomUrl
} from "../../../../../api/urls";

import { getSearchRequest, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import { batchRoomSchema } from "./hostelSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import { formatHostelRoomDisplay } from "../../../../../utils/formatHostelRoomDisplay";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

export const BatchRoomActionsModal = ({
	closeModal,
	filter,
	allActivationStatuses,
	state,
	rooms
}) => {
	const { mutate: callAction, isLoading: isAdding } = useApiPut();
	const ref = useRef();
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.xl;
	const [watchData, setWatchData] = useState({
		groupSelectionId: ""
	});

	const toggleRoomAction = (data) => {
		const requestDet = {
			url: bulkToggleHostelRoomsUrl(),
			data: {
				groupSelectionId: data?.groupSelectionId?.value,
				hostelId: state?.id,
				hostelRoomId:
					watchData.groupSelectionId === 2
						? rooms?.filter((item) =>
								data?.hostelRoomId?.some(
									(obj2) => obj2.value !== item
								)
						  )
						: data?.hostelRoomId?.map(
								(hostelRoomId) => hostelRoomId.value
						  ),
				action: data?.action?.value
			}
		};


		callAction(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(filter);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Room Action Success!",
					body: "Room batch action completed successfully"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Room Batch Action Failed!",
					body:
						response?.data?.message ||
						`Room batch action not completed successfully`
				});
				closeModal();
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const {
		control,
		handleSubmit,
		setValue,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(batchRoomSchema)
	});

	const apiOptions = async (query) => {
		const data = await getSearchRequest({
			queryKey: getAllHostelsRoomUrl({
				hostelId: state?.id,
				searchTerm: query,
				pageSize
			})
		});

		return formatHostelRoomDisplay({
			rooms: data.data.items,
			name: "name",
			value: "id"
		});
	};

	
	  // Create a debounced version of fetchStudents
	  const debouncedFetchStudents = useDebouncedCallback(
		apiOptions,
		SEARCH_DELAY.sm
	  );
	

	const handleFieldChange = (name, value) => {
		setValue(name, value);
		clearErrors(name);
	};
	useEffect(() => {
		const subscription = watch(({ groupSelectionId }) => {
			setWatchData((state) => ({
				groupSelectionId:
					groupSelectionId?.value ?? state.groupSelectionId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const actions = [
		{
			label: "Activate Rooms",
			value: true
		},
		{ label: "Deactivate Rooms", value: false }
	];
	const isChooseRoomRquired =
		watchData.groupSelectionId === 2 || watchData.groupSelectionId === 3;
	return (
		<form onSubmit={handleSubmit(toggleRoomAction)}>
			<div className={styles.add_notice_body}>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="action">Action</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="action"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id={"action"}
									options={actions}
									placeholder="Select action"
									isError={!!errors.action}
									errorText={
										errors.action && errors.action.message
									}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="groupSelectionId">Select Rooms</label>
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
				{isChooseRoomRquired && (
					<div className="row mb-4">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="hostelRoomId">
								Specify Exception
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="hostelRoomId"
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<AsyncMultiSelect
										placeholder="Search for rooms"
										id="hostelRoomId"
										apiOptions={debouncedFetchStudents}
										isMulti={true}
										isClearable
										defaultOptions
										{...field}
										onChange={(data) =>
											handleFieldChange(
												"hostelRoomId",
												data
											)
										}
										ref={ref}
										isError={!!errors.hostelRoomId}
										errorText={
											errors.hostelRoomId &&
											errors.hostelRoomId.message
										}
										required
									/>
								)}
							/>
						</div>
					</div>
				)}
			</div>

			<div className="mt-5 d-flex align-items-center justify-content-end">
				<Button
					type={"submit"}
					buttonClass="primary"
					label={"Select Action"}
					loading={isAdding}
				/>
			</div>
		</form>
	);
};
