import React from "react";
import Pagination from "@atlaskit/pagination";

const PaginationElement = ({
	setPageNumber = () => {},
	noOfPages,
	length,
	limit,
	isServerSidePagination,
	pageNumber
}) => {
	const pages = Array.from(
		{ length: noOfPages || Math.ceil(length / limit) },
		(_, index) => index + 1
	);

	return length > limit || noOfPages > 1 ? (
		<div className="d-flex justify-content-center align-items-center">
			<Pagination
				pages={pages}
				selectedIndex={pageNumber - 1}
				onChange={(_, page) =>
					setPageNumber(isServerSidePagination ? page : page - 1)
				}
			/>
		</div>
	) : null;
};

export { PaginationElement };
