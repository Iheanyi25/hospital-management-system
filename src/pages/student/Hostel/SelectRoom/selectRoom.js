import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet } from "../../../../api/apiCall";
import { getAllHostelsRoomUrl } from "../../../../api/urlCategories/Hostel";
import {
	Breadcrumbs,
	CardTable,
	PageTitle,
	Search
} from "../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";

const tabValues = {
	1: "true",
	2: "false"
};

const SelectRoom = () => {
	const [modifiedData, setModifiedData] = useState([]);
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const [active, setActive] = useState("true");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);

	const { push, goBack } = useHistory();
	const { state } = useLocation();

	if (!state) goBack();

	const { data, isLoading, isFetching } = useApiGet(
		getAllHostelsRoomUrl({
			hostelId: state?.id,
			pageSize,
			searchTerm,
			pageNumber,
			active
		}),
		{
			keepPreviousData: true
		}
	);

	const crumbItems = [
		{
			name: "Hostel",
			path: "/hostel"
		},
		{
			name: "Book Hostel",
			path: "/hostel/book_hostel",
			state: state
		},
		{
			name: state?.name,
			path: "/hostel/select_room",
			state: state
		}
	];

	useEffect(() => {
		const modifiedData = data?.data?.items?.map((data) => {
			return {
				roomName: data?.name,
				noOfBedSpaces: data?.numberOfBeds,
				noOfBedSpacesLeft: data?.numberOfBedsAvailable,
				disabled: data?.active,
				onClick: () =>
					push({
						state: {
							roomId: data?.id,
							price: data?.price,
							roomName: data?.name,
							...state
						},
						pathname: "/hostel/bed_spaces"
					})
			};
		});

		setModifiedData(modifiedData);
	}, [data, push, state]);

	return (
		<>
			<Breadcrumbs crumbs={crumbItems} />
			<div className="mt-3">
				<PageTitle title={state.name} />
			</div>
			<Tabs
				id="default"
				onChange={(index) => setActive(tabValues[index + 1])}
			>
				<div className="my-5">
					<TabList>
						<Tab>{
							`Available Rooms`
							// (${
							// 	applications?.data?.numberOfApplicants ?? "0"
							// })`
						}</Tab>
						<Tab>{
							`All Rooms`
							// (${
							// 	applications?.data?.numberOfPendingApplicants ?? "0"
							// })`
						}</Tab>
					</TabList>
				</div>
				<TabPanel>
					<div className="w-100">
						<CardTable
							columns={[]}
							data={modifiedData}
							title="Available Rooms"
							additonalTitleData={
								<div className="d-flex align-items-center">
									<Search
										placeholder="Search room"
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
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<CardTable
							columns={[]}
							data={modifiedData}
							title="Available Rooms"
							additonalTitleData={
								<div className="d-flex align-items-center">
									<Search
										placeholder="Search room"
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
				</TabPanel>
			</Tabs>
		</>
	);
};

export default SelectRoom;
