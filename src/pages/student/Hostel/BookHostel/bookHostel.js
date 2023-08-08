import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApiGet } from "../../../../api/apiCall";
import { getAllHostelsUrl } from "../../../../api/urlCategories/Hostel";
import {
	Breadcrumbs,
	HostelCard,
	Jumbotron,
	PageTitle,
	PaginationElement
} from "../../../../ui_elements";
import { PAGESIZE } from "../../../../utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import numberFormatter from "../../../../utils/numberFormatter";

const BookHostel = () => {
	const { push } = useHistory();

	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);

	const { data, isFetching, error } = useApiGet(
		getAllHostelsUrl({ pageSize, pageNumber }),
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
			path: ""
		}
	];

	// if (isFetching) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<>
			<Breadcrumbs crumbs={crumbItems} />
			<div className="mt-3">
				<PageTitle title={"Book Hostel"} />
			</div>
			<motion.div
				className="mt-5"
				transition={{ type: "spring", stiffness: 100 }}
				initial={{ visibility: "hidden", x: -25 }}
				animate={{ visibility: "visible", x: 1 }}
				style={{
					filter: isFetching ? "blur(5px)" : "none"
				}}
			>
				<Jumbotron headerText={"Select Hostel"}>
					<div className="p-3">
						{data?.data?.items?.map((items) => (
							<motion.div
								className="mt-4"
								key={items.id}
								transition={{
									type: "spring",
									stiffness: 100
								}}
								initial={{ visibility: "hidden", x: -25 }}
								animate={{ visibility: "visible", x: 1 }}
								style={{
									filter: isFetching ? "blur(5px)" : "none"
								}}
							>
								<AnimatePresence exitBeforeEnter={true}>
									<HostelCard
										location={items.location ?? "-"}
										hostelName={items.name}
										noOfBedSpaces={items.numberOfBeds}
										noOfBedSpacesLeft={
											items.numberOfBedsAvailable
										}
										noOfRooms={items.numberOfRooms}
										gender={items.gender}
										price={
											items.minimumPrice &&
											items.maximumPrice !== ""
												? `₦${numberFormatter(
														items.minimumPrice
												  )} - ₦${numberFormatter(
														items.maximumPrice
												  )}`
												: `₦0`
										}
										disabled={items.active ? false : true}
										onClick={() =>
											push({
												pathname: "/hostel/select_room",
												state: {
													id: items?.id,
													name: items?.name
												}
											})
										}
									/>
									)
								</AnimatePresence>
							</motion.div>
						))}
					</div>
				</Jumbotron>
			</motion.div>
			<div className="mt-4 d-flex align-items-center justify-content-end">
				<PaginationElement
					setPageNumber={setPageNumber}
					noOfPages={data?.data?.metaData.totalPages}
					isServerSidePagination={true}
				/>
			</div>
		</>
	);
};

export default BookHostel;
