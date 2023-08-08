import {
	Button,
	CenteredDialog,
	ConfirmationModal,
	Search,
	TMTable
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useMemo, useState } from "react";
import { EditCourse, UploadCourse } from "./components";
import {
	editUploadedCourseUrl,
	getCoursesToManageUrl
} from "../../../../../api/urls";
import { useApiDelete, useApiGet } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const ManageCourse = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [openDelete, setOpenDelete] = useState(false);
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);
	const { data, isLoading, isFetching, error } = useApiGet(
		getCoursesToManageUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const queryClient = useQueryClient();
	const deleteCourse = () => {
		const requestDet = {
			url: editUploadedCourseUrl(editData.id)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesToManageUrl({ pageSize, pageNumber, searchTerm })
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
	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Course code",
				accessor: "courseCode"
			},
			{
				Header: "Course title",
				accessor: "title"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit_course"
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setEditData({
									code: row.original.courseCode,
									title: row.original.title,
									id: row.original.id
								});
								setEditOpen(true);
							}}
						/>
						<Button
							data-cy="delete_course"
							label="Delete"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData({
									id: row.original.id
								});
								setOpenDelete(true);
							}}
						/>
					</div>
				)
			}
		],
		[pageSize, pageNumber]
	);
	if (error) return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="upload_courses"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Upload Courses"
			>
				<UploadCourse
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					setUploadModal={setOpen}
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
					closeModal={() => setEditOpen(false)}
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
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
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="Course List"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for course"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Upload course"
									customClass="ml-3"
									onClick={() => setOpen(true)}
								/>
							</div>
						}
						loading={isLoading || isFetching}
						setPageNumber={setPageNumber}
						availablePages={data?.data?.metaData.totalPages}
					/>
				</div>
			</div>
		</div>
	);
};

export default ManageCourse;
