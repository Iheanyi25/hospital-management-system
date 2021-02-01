import React, { useRef } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getPatientHealthHistoryUrl } from "../../../api/URLs";
import PatientHealthHistoryHeader from "./PatientHealthHistoryHeader";
import PatientHealthHistoryBody from "./PatientHealthHistoryBody";
import PageWrapper from "../../../Components/PageWrapper";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { useReactToPrint } from "react-to-print";
import { Card } from "../../../Components/reusable-css-in-js-components";
const pageStyle = `
  @page {
    // size: 80mm 50mm;
    display: flex;
    margin-top: 10rem;
    margin-left: 3rem;
  }

  @media print {
    .pagebreak {
      // page-break-before: always;
    }
    .show-elem-print {
      display: block !important;
    }
    .flex-container-print{
      display: flex !important;
    }
    .hide-elem-print {
      display: none;
    }
  }
`;

export default function PatientHealthHistoryContainer({ patientId }) {
  const getPatientHealthHistoryConfig = fetchConfig({
    url: getPatientHealthHistoryUrl(patientId),
  });
  const { data, error } = useRequest(getPatientHealthHistoryConfig, {
    revalidateOnFocus: false,
  });

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle,
  });
  if (error) return <div>failed to load!</div>;
  return (
    <>
      {!data ? (
        <SpinnerLoader />
      ) : (
        <PageWrapper>
          <PatientHealthHistoryHeader handlePrint={handlePrint} />
          <div ref={componentRef}>
            <Card>
              <PatientHealthHistoryBody
                patientDet={data.patientHealthHistory}
              />
              {(data.patientHealthHistory.clerking.length > 1 ||
                data.patientHealthHistory.preConsultation.length > 1) && (
                <DownloadStatement handlePrint={handlePrint} />
              )}
            </Card>
          </div>
        </PageWrapper>
      )}
    </>
  );
}

const DownloadStatement = ({ handlePrint }) => {
  return (
    <div
      onClick={handlePrint}
      className="d-flex justify-content-end text-primary hide-elem-print cursor"
    >
      Patient has additional records, download to view all!
    </div>
  );
};
