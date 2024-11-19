import {
	CenteredDialog,
	Spinner,
	ConfirmationModal
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiDelete, useApiGet, useApiPut } from "../../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getDepartmentOptionUrl,
	getStudentModeOfEntryUrl,
	yearOfStudyUrl,
	getStudentTypesUrl,
	getCoursesAssignedToDeptsUrl,
	editCourseAssignedToDeptsUrl,
	toggleCourseAssignedActivationUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	AddCourse,
	AssignCoursetForm,
	EditCourse,
	AssignCourseTable
} from "./components";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { CloneCourseAssignment } from './components/cloneCourseAssignment';

const AssignCourse = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [cloneOpen, setCloneOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [filter, setFilter] = useState({
		departmentId: "",
		departmentOptionId: "" || 0,
		modeOfEntryId: "",
		studentTypeId: "",
		sessionId: "",
		semesterId: "",
		levelId: "",
		pageSize: PAGESIZE.sm
	});
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const { mutate, isLoading: isDeleting } = useApiDelete();
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const {
		data: courseList,
		isLoading: isLoadingcourseList,
		isFetching: isFetchingcourseList,
		error: courseListError
	} = useApiGet(
		getCoursesAssignedToDeptsUrl({ ...filter, pageNumber, searchTerm }),
		{
			enabled: !!filter.departmentId,
			keepPreviousData: true
		}
	);

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const watchData = watch({
		departmentId: "departmentId",
		studentTypeId: "studentTypeId",
		departmentOptionId: "departmentOptionId"
	});

	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(watchData?.studentTypeId?.value), {
		enabled: !!watchData?.studentTypeId?.value
	});

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId?.value,
				studentTypeId: watchData?.studentTypeId?.value
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData?.departmentId?.value
			}
		);
	const { data: studentModes, isLoading: isLoadingStudentModes } = useApiGet(
		getStudentModeOfEntryUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentTypeId?.value }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId?.value
		}
	);
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allDepartmentOption = formatSelectItems(
		departmentOption?.data,
		"departmentOption",
		"departmentOptionId"
	);
	const allStudentModes = formatSelectItems(studentModes?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	useEffect(() => {
		if (departmentOption?.data?.length === 0)
			setFilter((state) => ({ ...state, departmentOptionId: null }));
	}, [departmentOption]);

	const deleteCourse = () => {
		const requestDet = {
			url: editCourseAssignedToDeptsUrl(editData.id)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesAssignedToDeptsUrl({
						...filter,
						pageNumber,
						searchTerm
					})
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Deletion Success!",
					body: "Your course was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setOpenDelete(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Deletion Failed!",
					body:
						response?.data?.message ||
						`Course wasn't deleted successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const toggleCourseActivation = ({ active, id }) => {
		const requestDet = {
			url: toggleCourseAssignedActivationUrl(id),
			data: {
				activate: active
			}
		};
		toggle(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesAssignedToDeptsUrl({
						...filter,
						pageNumber,
						searchTerm
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Action Success!",
					body: `Course was ${active ? "activated" : "deactivated"
						} successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Action Success!",
					body:
						response?.data?.message ||
						`Course wasn't ${active ? "activated" : "deactivated"
						} successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	if (isLoading || isLoadingStudentModes || isLoadingStudentTypes)
		return <Spinner />;
	if (error || departmentError || courseListError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="clone_assignment"
				isOpen={cloneOpen}
				closeModal={() => setCloneOpen(false)}
				width={705}
				formTitle="Clone Course Assignment"
			>
				<CloneCourseAssignment
					filter={filter}
					allSessions={allSessions}
					currentFilterState={{ ...filter, pageNumber, searchTerm }}
					closeModal={() => setCloneOpen(false)}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="add_course"
				isOpen={open}
				closeModal={() => setOpen(false)}
				width={705}
				formTitle="Add course"
			>
				<AddCourse
					filter={filter}
					currentFilterState={{ ...filter, pageNumber, searchTerm }}
					closeModal={() => setOpen(false)}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit course"
			>
				<EditCourse
					data={editData}
					filter={filter}
					currentFilterState={{ ...filter, pageNumber, searchTerm }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteCourse}
				formTitle="Delete course"
				isLoading={isDeleting}
			/>
			<div className={styles.page_content}>
				<div className="w-100">
					<AssignCoursetForm
						control={control}
						errors={errors}
						allSessions={allSessions}
						allDepartments={allDepartments}
						allDepartmentOption={allDepartmentOption}
						allStudentModes={allStudentModes}
						allStudentTypes={allStudentTypes}
						isDepartmentLoading={isDepartmentLoading}
						isLoadingDepartmentOption={isLoadingDepartmentOption}
						departmentOption={departmentOption}
						isLoadingLevels={isLoadingLevels}
						levels={levels}
						allLevels={allLevels}
						setFilter={setFilter}
						setValue={setValue}
						setCloneOpen={setCloneOpen}
						handleSubmit={handleSubmit}
						isLoadingCourses={isLoadingcourseList}
					/>
					<AssignCourseTable
						data={courseList?.data?.items || []}
						setOpen={setOpen}
						setEditOpen={setEditOpen}
						setEditData={setEditData}
						setOpenDelete={setOpenDelete}
						hasPerformedQuery={!!filter.departmentId}
						paginationProps={courseList?.data?.metaData || {}}
						setPageNumber={setPageNumber}
						debouncedSearch={debounced}
						pageNumber={pageNumber}
						pageSize={filter.pageSize}
						searchValue={searchTerm}
						loading={isFetchingcourseList}
						isPosting={isPosting}
						onSubmit={toggleCourseActivation}
					/>
				</div>
			</div>
		</div>
	);
};

export default AssignCourse;
