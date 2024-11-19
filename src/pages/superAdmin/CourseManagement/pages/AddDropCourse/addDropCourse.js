import {
	CenteredDialog,
	ConfirmationModal,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost, useApiPut } from "../../../../../api/apiCall";
import {
	getCoursesToAddOrDropUrl,
	dropCourseUrl,
	addCoursesUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Form, Table, AddCourses } from "./components";
import { useQueryClient } from "react-query";

const AddDropCourse = () => {
	const [open, setOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [openDelete, setOpenDelete] = useState(false);
	const [allCourses, setCourses] = useState([]);
	const [allSelectedCourses, setSelectedCourses] = useState([]);
	const [totalSelectedCreditUnit, setTotalSelectedCreditUnit] = useState(0);
	const [isSelecetd, setIsSelected] = useState({});
	const { mutate, isLoading: isDroping } = useApiPut();
	const { mutate: callAction, isLoading: isAdding } = useApiPost();
	const queryClient = useQueryClient();
	const [filter, setFilter] = useState({
		sessionId: "",
		matricNo: "",
		semester: ""
	});

	const {
		data: addOrDropCourses,
		isLoading: isLoadingAddOrDropCourse,
		isFetching: isFetchingAddOrDropCourse,
		error: addOrDropCourseError,
		isFetched
	} = useApiGet(
		getCoursesToAddOrDropUrl({
			sessionId: filter.sessionId,
			userId: filter.matricNo,
			semesterId: filter.semester
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!filter.sessionId
		}
	);
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	useEffect(() => {
		if (addOrDropCourses?.data?.registerableCourses) {
			setCourses(addOrDropCourses.data.registerableCourses);
			setSelectedCourses(addOrDropCourses.data.registerableCourses);

			//select all courses initially
			const allSelectedInitially = {};
			addOrDropCourses.data.registerableCourses.forEach((course) => {
				allSelectedInitially[
					course.courseAssignedForDepartmentId
				] = true;
			});
			setIsSelected(allSelectedInitially);

			//calculate total credit unit
			const totalCreditUnitSelectedInitially =
				addOrDropCourses.data.registerableCourses.reduce(
					(acc, course) => acc + course.unitLoadId,
					0
				);
			setTotalSelectedCreditUnit(totalCreditUnitSelectedInitially);
		}
	}, [addOrDropCourses]);

	const addCourse = (data) => {

		const requestDet = {
			url: addCoursesUrl(),
			data: {
				userId: addOrDropCourses?.data?.studentProfile?.userId,
				sessionId: addOrDropCourses?.data?.studentProfile?.sessionId,
				levelId: addOrDropCourses?.data?.studentProfile?.levelId,
				semesterId: addOrDropCourses?.data?.studentProfile?.semesterId,
				coursesToRegister: data
			}
		};
		callAction(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesToAddOrDropUrl({
						sessionId: filter.sessionId,
						userId: filter.matricNo,
						semesterId: filter.semester
					})
				);
				setOpen(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Action Success!",
					body: "Course(s) added successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setOpen(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Action Failed!",
					body:
						response?.data?.message ||
						`Course(s) not added successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const dropCourse = () => {
		const { courseAssignedForDepartmentId, unitLoadId } = editData;
		const requestDet = {
			url: dropCourseUrl(courseAssignedForDepartmentId),
			data: {
				userId: filter.matricNo,
				courseUnit: unitLoadId,
				levelId: addOrDropCourses?.data?.studentProfile?.levelId,
				sessionId: addOrDropCourses?.data?.studentProfile?.sessionId,
				semesterId: filter?.semester
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesToAddOrDropUrl({
						sessionId: filter.sessionId,
						userId: filter.matricNo,
						semesterId: filter.semester
					})
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Action Success!",
					body: "Course dropped successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Action Failed!",
					body:
						response?.data?.message ||
						`Course wasn't dropped successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		if (isFetched && addOrDropCourseError) {
			setCourses([]);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Course Action Failed!",
				body:
					addOrDropCourseError?.response.data?.message ||
					`Course wasn't dropped successfully`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [isFetched, addOrDropCourseError]);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	if (isLoading) return <Spinner />;
	if (error)
		return `An error has occurred: ${
			error?.message ?? error?.response?.data?.message
		}`;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="add-courses"
				isOpen={open}
				closeModal={() => setOpen(false)}
				width="80vw"
			>
				<AddCourses
					setOpen={setOpen}
					setCourses={setCourses}
					sessionId={filter.sessionId}
					academicYearDetails={filter}
					setSelectedCourses={setSelectedCourses}
					studentData={addOrDropCourses?.data?.studentProfile}
					isAdding={isAdding}
					adminCallback={addCourse}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={dropCourse}
				formTitle="Drop course"
				message="Are you sure you want to drop this course"
				buttonLabel="Drop course"
				isLoading={isDroping}
			/>
			<div className={styles.page_content}>
				<div className="w-100">
					<Form
						control={control}
						setValue={setValue}
						errors={errors}
						allSessions={allSessions}
						setFilter={setFilter}
						handleSubmit={handleSubmit}
						isLoadingAddOrDropCourse={isLoadingAddOrDropCourse}
					/>
					<Table
						data={allCourses}
						studentData={addOrDropCourses?.data}
						totalSelectedCreditUnit={totalSelectedCreditUnit}
						isSelecetd={isSelecetd}
						selectedCourses={allSelectedCourses}
						setOpen={setOpen}
						setOpenDelete={setOpenDelete}
						unitLoad={addOrDropCourses?.data?.unitLoad}
						setEditData={setEditData}
						loading={
							isLoadingAddOrDropCourse ||
							isFetchingAddOrDropCourse
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddDropCourse;
