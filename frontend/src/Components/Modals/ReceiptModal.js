import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const pageStyle = `
  @page {
    // size: 80mm 50mm;
    margin-top: 10rem;
    margin-left: 3rem;
  }

  // @media all {
  //   .pagebreak {
  //     display: none;
  //   }
  // }

  @media print {
    .pagebreak {
      // page-break-before: always;

    }
  }
`;
export default function ReceiptModal({ children, modalId }) {
  console.log(children, "hh");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle,
  });
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header p-0"></div>
          <div className="modal-body p-0">
            <div ref={componentRef}>{children}</div>
          </div>
          <div className="bg-light py-3 mt-5 px-5">
            {/* <div className="actions "> */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="">
                Need help? <Link to="#">help@lLinkviemedic.com</Link>
              </div>
              <div>
                <button
                  type="button"
                  className="btn text-light btn-primary"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
