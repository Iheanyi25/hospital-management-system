import { useTable, usePagination } from "react-table";
import { InfiniteProgressBar, PaginationElement } from "..";
import { motion, AnimatePresence } from "framer-motion";
import EmptyState from "../../assets/svgs/emptyState.svg";
import NoResultFound from "../../assets/svgs/searchError.svg";

import "./tmTable.css";
export const TMTable = ({
	columns,
	data,
	title,
	additonalTitleData,
	availablePages,
	setPageNumber,
	pageNumber,
	loading,
	isServerSidePagination = true,
	controlledPageCount,
	searchParams = "",
	hasPerformedQuery,
	customEmptyStateMessage,
	additonalFooterData
}) => {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		page, //we use page when its client side pagination
		prepareRow,

		gotoPage,
		pageOptions
	} = useTable(
		{
			columns,
			data,
			initialState: { pageNum: 1, pageSize: 10 }, // Pass our hoisted table state, this pageSize only applies to client side pagination
			manualPagination: isServerSidePagination, // Tell the usePagination
			// hook that we'll handle our own data fetching
			// This means we'll also have to provide our own
			// pageCount.
			...(controlledPageCount && { pageCount: controlledPageCount })
		},
		usePagination
	);

	const list = { hidden: { opacity: loading ? 0 : 1 } };

	const rowData = isServerSidePagination ? rows : page;

	// Render the UI for your table
	return (
		<div>
			{title && (
				<div className="d-md-flex justify-content-between align-items-center res-table-title">
					<div colSpan={12}>
						<h4 className="mb-3 mb-md-0">{title}</h4>
					</div>
					{additonalTitleData}
				</div>
			)}

			{loading && <InfiniteProgressBar width="inherit" />}
			<div style={{ overflowX: "scroll" }}>
				<motion.table
					className="res-tm-table"
					style={{
						width: "100%",
						filter: loading ? "blur(5px)" : "none"
					}}
					{...getTableProps({
						transition: { type: "spring", stiffness: 100 },
						initial: { visibility: "hidden", x: -25 },
						animate: { visibility: "visible", x: 1 }
					})}
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr
								{...headerGroup.getHeaderGroupProps()}
								className="res-table-col-headers"
							>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					{
						<motion.tbody
							{...getTableBodyProps()}
							className="res-table-content"
						>
							<AnimatePresence exitBeforeEnter={true}>
								{rowData.map((row, i) => {
									prepareRow(row);
									return (
										<motion.tr
											variants={list}
											key={1}
											{...row.getRowProps()}
										>
											{row.cells.map((cell, index) => {
												return (
													!loading && (
														<td
															{...cell.getCellProps()}
															key={index}
														>
															{cell.render(
																"Cell"
															)}
														</td>
													)
												);
											})}
											{row.cells.map((cell, index) => {
												return (
													loading && (
														<motion.td
															key={index}
															{...cell.getCellProps(
																{
																	transition:
																		{
																			type: "spring",
																			stiffness: 100
																		},
																	initial: {
																		visibility:
																			"hidden",
																		x: -25
																	},
																	// exit: {  maxHeight: 0 },
																	animate: {
																		visibility:
																			"visible",
																		x: 5
																	}
																}
															)}
														>
															{cell.render(
																"Cell"
															)}
														</motion.td>
													)
												);
											})}
										</motion.tr>
									);
								})}
							</AnimatePresence>
						</motion.tbody>
					}
				</motion.table>
			</div>
			{!loading && rowData.length === 0 && (
				<div className="w-100 border border-top-0 d-flex justify-content-center align-items-center flex-column p-5 search-message-style">
					<img
						src={hasPerformedQuery ? NoResultFound : EmptyState}
						alt="No activities"
					/>
					{
						<h4 className="mt-2">
							{hasPerformedQuery
								? `No result found${
										searchParams &&
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
						setPageNumber={
							isServerSidePagination ? setPageNumber : gotoPage
						}
						noOfPages={
							isServerSidePagination
								? availablePages
								: pageOptions.length
						}
						isServerSidePagination={isServerSidePagination}
					/>
				</div>
			</div>
		</div>
	);
};
