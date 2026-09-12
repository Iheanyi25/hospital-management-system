import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet } from "../../../../api/apiCall";
import { getAllHostelsRoomUrl } from "../../../../api/urlCategories/Hostel";
import { CardTable, Search } from "../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";

const RoomTable = ({ filter }) => {
	const [modifiedData, setModifiedData] = useState([]);
	const pageSize = PAGESIZE.lg;
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);

	const { push } = useHistory();
	const { state } = useLocation();

	const { data, isLoading, isFetching } = useApiGet(
		getAllHostelsRoomUrl({
			...filter,
			pageSize,
			searchTerm,
			pageNumber,
			active: false
		}),
		{
			keepPreviousData: true,
			enabled: !!filter.hostelId,
			refetchOnWindowFocus: false
		}
	);

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
							...state,
							roomId: data?.id,
							price: data?.price,
							roomName: data?.name,
							isArrears: true,
							sessionId: filter?.sessionId
						},
						pathname: "/hostel/bed_spaces"
					})
			};
		});

		setModifiedData(modifiedData);
	}, [data, push, state, filter]);

	return (
		<CardTable
			columns={[]}
			data={modifiedData}
			title="All Rooms"
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
			pageNumber={pageNumber}
			availablePages={data?.data?.metaData.totalPages}
		/>
	);
};

export default RoomTable;
