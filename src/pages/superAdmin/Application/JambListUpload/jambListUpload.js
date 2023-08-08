import {
	Button,
	CenteredDialog,
	Search,
	TMTable
} from "../../../../ui_elements";
import styles from "./style.module.css";
import { useMemo, useState } from "react";
import { UploadList } from "./components";
import { getJambListUrl } from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const JambListUpload = () => {
	const [open, setOpen] = useState(false);
	const pageSize = PAGESIZE.md;
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
		getJambListUrl({
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
				Header: "Name",
				accessor: `fullName`,
				Cell: ({ cell: { row } }) => (
					<div>
						<span>{`${row?.original?.surname || ""} ${
							row?.original?.firstname || ""
						} ${row?.original?.middlename || ""}`}</span>
					</div>
				)
			},
			{
				Header: "Jamb Number",
				accessor: "jambNumber"
			},
			{
				Header: "Jamb Score",
				accessor: "utmeScore"
			}
		],
		[pageSize, pageNumber]
	);
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="upload_list"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Upload List"
			>
				<UploadList
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					setUploadModal={setOpen}
				/>
			</CenteredDialog>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="Jamb List"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for list"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Upload list"
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

export default JambListUpload;
