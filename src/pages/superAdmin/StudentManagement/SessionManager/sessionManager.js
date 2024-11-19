import {
	Button,
	CenteredDialog,
	ConfirmationModal,
	Spinner
} from "../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import {
	getFacultiesUrl,
	getStudentTypesUrl,
	getAllDepartmentActiveSessionsUrl,
	rollbackDepartmentActiveSessionUrl,
	getAllSessionsUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { UpdateSession, Form, Table } from "./components";
import { PAGESIZE } from "../../../../utils/constants";
import { useQueryClient } from "react-query";

const SessionManager = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [open, setOpen] = useState(false);
	const { mutate, isLoading: isPosting } = useApiPost();
	const queryClient = useQueryClient();
	const [studentTypeState, setStudentTypeState] = useState("");
	const [filter, setFilter] = useState({
		facultyId: "",
		studentTypeId: "",
		searchTerm: "",
		pageSize: PAGESIZE.xl
	});
	const [deptsActiveSessionsToUpdate, setDeptsActiveSessionsToUpdate] =
		useState([]);

	const [pageNumber, setPageNumber] = useState(1);
	const {
		data: depts,
		isLoading: isLoadingDepartmentList,
		isFetching: isFetchingdepts,
		error: deptsError
	} = useApiGet(
		getAllDepartmentActiveSessionsUrl({ ...filter, pageNumber }),
		{
			enabled: !!filter.facultyId,
			keepPreviousData: true
		}
	);
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();

	const {
		data: faculties,
		isLoading: isLoadingFaculties,
		error
	} = useApiGet(getFacultiesUrl(studentTypeState), {
		refetchOnWindowFocus: false,
		enabled: !!studentTypeState
	});
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: sessions,
		isLoading,
		error: sessionError
	} = useApiGet(getAllSessionsUrl());

	const resetdepartmentArray = () => {
		setDeptsActiveSessionsToUpdate([]);
	};

	const updateChecks = (data) => {
		if (
			deptsActiveSessionsToUpdate.find((item) => {
				return item.departmentId === data.departmentId;
			})
		)
			setDeptsActiveSessionsToUpdate((prev) =>
				prev.filter((item) => item !== data)
			);
		else setDeptsActiveSessionsToUpdate((prev) => [...prev, data]);
	};
	const updateAllChecks = (itemsArray) => {
		if (
			itemsArray?.every((element) =>
				deptsActiveSessionsToUpdate?.includes(element)
			)
		) {
			setDeptsActiveSessionsToUpdate([]);
		} else {
			setDeptsActiveSessionsToUpdate(itemsArray);
		}
	};
	const handleRollback = () => {
		const requestDet = {
			url: rollbackDepartmentActiveSessionUrl(),
			data: {
				departmentId: deptsActiveSessionsToUpdate.map(
					(item) => item.departmentId
				),
				studentTypeId: filter.studentTypeId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				resetdepartmentArray();
				queryClient.invalidateQueries(
					getAllDepartmentActiveSessionsUrl({ ...filter, pageNumber })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Session Action Success!",
					body: `Session rolled back successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setOpen(false);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice Action Success!",
					body:
						response?.data?.message ||
						`Session wasn't rolled back successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const departmentList = () => {
		let depts = deptsActiveSessionsToUpdate.map(
			(dept, _) => dept?.department
		);

		if (depts.length > 0) {
			return depts.join(", ");
		} else {
			return "NONE";
		}
	};

	useEffect(() => {
		const subscription = watch(({ studentTypeId }) => {
			setStudentTypeState(studentTypeId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	if (isLoading || isLoadingStudentTypes) return <Spinner />;
	if (error || deptsError || sessionError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="edit_session"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Update Session"
			>
				<UpdateSession
					data={editData}
					allSessions={allSessions}
					filter={filter}
					resetdepartmentArray={resetdepartmentArray}
					deptsActiveSessionsToUpdate={deptsActiveSessionsToUpdate}
					currentFilterState={{ ...filter, pageNumber }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleClick={handleRollback}
				formTitle="Roll back Changes"
				message={`You are about to roll back session changes made to ${departmentList().toUpperCase()}. Do you wish to continue?`}
				isLoading={isPosting}
				isDeleteModal={true}
				buttonLabel="Yes, Roll Back"
			/>
			<div className="">
				<div className="w-100">
					<Form
						control={control}
						errors={errors}
						allFaculties={allFaculties}
						allStudentTypes={allStudentTypes}
						data={depts?.data?.items}
						setFilter={setFilter}
						handleSubmit={handleSubmit}
						isLoadingDepartmentList={isLoadingDepartmentList}
						isLoadingFaculties={isLoadingFaculties}
					/>
					<Table
						data={depts?.data?.items || []}
						setEditOpen={setEditOpen}
						setEditData={setEditData}
						paginationProps={depts?.data?.metaData || {}}
						setPageNumber={setPageNumber}
						setFilter={setFilter}
						updateChecks={updateChecks}
						updateAllChecks={updateAllChecks}
						deptsActiveSessionsToUpdate={
							deptsActiveSessionsToUpdate
						}
						loading={isFetchingdepts}
					/>
					{!!filter.facultyId && (
						<div className="d-flex justify-content-end">
							<Button
								data-cy={`default_1`}
								label="Roll back Changes"
								buttonClass="standard"
								disabled={
									deptsActiveSessionsToUpdate.length === 0 ||
									deptsActiveSessionsToUpdate.some(
										(item) => !item.rollBack
									)
								}
								onClick={() => setOpen(true)}
							/>
							<Button
								data-cy={`cancel_1}`}
								label="Update Session"
								buttonClass="primary"
								onClick={() => setEditOpen(true)}
								disabled={
									deptsActiveSessionsToUpdate.length === 0
								}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SessionManager;
