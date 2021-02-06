import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

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
export default function ReceiptModal ({children, modalId }) {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle
  })
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
          <div className="modal-header">
          </div>
          <div className="modal-body">
            <div ref={componentRef}>
              {children}
            </div>
          </div>
          <div className="modal-footer bg-white">
            <div className="actions ">
              <button type="button" className="btn text-light btn-primary" onClick={handlePrint}>
                Print
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};


