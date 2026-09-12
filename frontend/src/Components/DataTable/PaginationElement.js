import React from 'react'
import { Link } from 'react-router-dom';
const PaginationElement = ({
  paginationDetails,
  setPageNumber,
  pageNumber,
  pageSize,
  setPageSize,
}) => {
  console.log(paginationDetails);
  const { hasNext, hasPrevious, totalPages } = paginationDetails;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  // const x = [1, 1, 1, 1, 1, 1,1 ,1,1,1, 1,1,1 ,1,1 ,1,1 ,1,1 ,1,1 ,1,1 ,1 ,1,1, 1 ,1, 1,1,1,1,1]
  return (
    <div className="card animated fadeInUp delay-01s bg-light mt-5">
      <div className="card-body d-flex">
        <label className="mr-4 font-weight-normal">
          Show{" "}
          <select
            style={{ width: "auto", display: "inline-block" }}
            className="custom-select custom-select-sm form-control form-control-sm"
            name="serviceCategoryId"
            onChange={(e) => setPageSize(e.target.value)}
            value={pageSize}
          >
            <option>50</option>
            <option>100</option>
            <option>150</option>
            <option>200</option>
          </select>{" "}
          entries
        </label>
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${hasPrevious ? null : "disabled"}`}>
              <Link
                className="page-link"
                tabindex="-1"
                to="#"
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </Link>
            </li>
            {pages.map((page) => (
              <li
                className={`page-item ${page === pageNumber ? "active" : null}`}
              >
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => setPageNumber(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li className={`page-item ${hasNext ? null : "disabled"}`}>
              <Link
                className="page-link"
                to="#"
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { PaginationElement };
