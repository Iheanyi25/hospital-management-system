import { Button, Search, TMTable } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useMemo, useState } from "react";
import { getStudentsUrl } from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { useHistory } from "react-router-dom";

const ViewAllStudents = () => {
	const { push } = useHistory();
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
		getStudentsUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);
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
				Header: "Full Name",
				accessor: "fullName"
			},
			{
				Header: "Jamb No",
				accessor: "jambRegNumber"
			},
			{
				Header: "Reg No",
				accessor: "matricNumber"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<Button
						data-cy="edit_course"
						label="Edit"
						buttonClass="standard"
						onClick={() =>
							push({
								pathname: "/student_management/view/edit",
								state: { refCode: row.original.userId }
							})
						}
					/>
				)
			}
		],
		[pageSize, pageNumber, push]
	);
	if (error) return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="Student List"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for student name or JAMB REG NO "
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
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

export default ViewAllStudents;
