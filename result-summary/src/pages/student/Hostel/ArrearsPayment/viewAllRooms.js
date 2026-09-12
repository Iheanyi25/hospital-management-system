import { Breadcrumbs, PageTitle, Spinner } from "../../../../ui_elements";
import { useState } from "react";
import {
	getSundrySessionsUrl,
	getAllArrearsHostelsUrl
} from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import { PAGESIZE, PAYMENTIDENTIFIER } from "../../../../utils/constants";
import { useForm } from "react-hook-form";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import RoomTable from "./roomTable";
import ViewAllRoomsForm from "./viewAllRoomsForm";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

const ViewAllRooms = () => {
	const [filter, setFilter] = useState({
		hostelId: "",
		sessionId: "",
		pageSize: PAGESIZE.lg
	});

	const pageNumber = 1;

	const {
		data: hostels,
		isLoading: isLoadingHostels,
		error
	} = useApiGet(
		getAllArrearsHostelsUrl({ pageSize: filter?.pageSize, pageNumber }),
		{
			keepPreviousData: true
		}
	);

	const { data: sessions, isLoading: isSessionsLoading } = useApiGet(
		getSundrySessionsUrl(PAYMENTIDENTIFIER?.hostelArrears),
		{
			refetchOnWindowFocus: false
		}
	);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allHostels = formatSelectItems(hostels?.data?.items, "name", "id");

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			hostelId: filter?.hostelId
				? findValueAndLabel(filter?.hostelId, allHostels)
				: null,
			sessionId: filter?.sessionId
				? findValueAndLabel(filter?.sessionId, allSessions)
				: null
		}
	});

	const crumbItems = [
		{
			name: "Hostel",
			path: "/hostel"
		},
		{
			name: "Pay Arrears",
			path: ""
		}
	];

	if (isLoadingHostels || isSessionsLoading) return <Spinner />;

	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div>
			<Breadcrumbs crumbs={crumbItems} />
			<div className="mt-3">
				<PageTitle title={"Pay Arrears"} />
			</div>
			<div className="w-100 mt-5">
				<ViewAllRoomsForm
					control={control}
					errors={errors}
					allSessions={allSessions}
					allHostels={allHostels}
					isLoadingHostels={isLoadingHostels}
					isSessionsLoading={isSessionsLoading}
					setFilter={setFilter}
					handleSubmit={handleSubmit}
				/>

				<RoomTable filter={filter} />
			</div>
		</div>
	);
};

export default ViewAllRooms;
