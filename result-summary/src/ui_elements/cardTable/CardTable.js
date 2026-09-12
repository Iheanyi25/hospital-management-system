import ".././tMTable/TMTable";
import "./CardTable.css";
import { InfiniteProgressBar, PaginationElement } from "../../ui_elements";
import EmptyState from "../../assets/svgs/emptyState.svg";
import NoResultFound from "../../assets/svgs/searchError.svg";
import { RoomCard } from "../roomCard/RoomCard";
import { motion, AnimatePresence } from "framer-motion";

export const CardTable = ({
	title,
	additonalTitleData,
	loading,
	data = [],
	hasPerformedQuery,
	customEmptyStateMessage,
	searchParams = "",
	additonalFooterData,
	availablePages,
	setPageNumber,
	pageNumber
}) => {
	return (
		<div className="card-table-main">
			{title && (
				<div className="d-md-flex justify-content-between align-items-center res-table-title">
					<div colSpan={12}>
						<h4 className="mb-3 mb-md-0">{title}</h4>
					</div>
					{additonalTitleData}
				</div>
			)}

			{loading && <InfiniteProgressBar width="inherit" />}

			<div
				className="res-card-table-container m-0 px-4 pb-2"
				style={{ overflowX: "scroll" }}
			>
				<motion.div
					className="row"
					transition={{ type: "spring", stiffness: 100 }}
					initial={{ visibility: "hidden", x: -25 }}
					animate={{ visibility: "visible", x: 1 }}
					style={{
						filter: loading ? "blur(5px)" : "none"
					}}
				>
					<AnimatePresence exitBeforeEnter={true}>
						{data?.map((roomData, i) => (
							<motion.div
								key={i}
								className="col-lg-2 col-md-3 col-sm-6 mt-4"
							>
								<RoomCard
									disabled={roomData?.disabled}
									roomName={roomData?.roomName}
									noOfBedSpaces={roomData.noOfBedSpaces}
									noOfBedSpacesLeft={
										roomData.noOfBedSpacesLeft
									}
									onClick={roomData?.onClick}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{!loading && data?.length === 0 && (
				<div className="w-100 border border-top-0 d-flex justify-content-center align-items-center flex-column p-5 search-message-style">
					<img
						src={hasPerformedQuery ? NoResultFound : EmptyState}
						alt="No activities"
					/>
					{
						<h4 className="mt-2">
							{hasPerformedQuery
								? `No result found${searchParams &&
								` for  "${searchParams}"`
								}, check your selection and try
						again`
								: customEmptyStateMessage
									? customEmptyStateMessage
									: "Your request results will be displayed here"}
						</h4>
					}
				</div>
			)}
			<div className="d-flex justify-content-between align-items-center  mt-5">
				<div>{additonalFooterData}</div>
				<div
					style={{
						filter: loading ? "blur(5px)" : "none"
					}}
				>
					<PaginationElement
						pageNumber={pageNumber}
						setPageNumber={setPageNumber}
						noOfPages={availablePages}
						isServerSidePagination={true}
					/>
				</div>
			</div>
		</div>
	);
};
