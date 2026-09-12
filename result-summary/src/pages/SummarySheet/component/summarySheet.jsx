import { TableHeader, SummaryTable } from "../../../ui_elements";

export const SummarySheet = ({ summarySheet, data }) => {
  return (
    <>
      <TableHeader
        details={{
          faculty: summarySheet?.data?.faculty || "-",
          department: summarySheet?.data?.department || "-",
          semester: summarySheet?.data?.semester || "-",
          date: summarySheet?.data?.date || "-",
          programme: summarySheet?.data?.programme || "-",
          session: summarySheet?.data?.session || "-",
        }}
        result={false}
      />
      <SummaryTable
        semester={summarySheet?.data?.semester}
        subjects={summarySheet?.data?.courses}
        students={data}
      />
    </>
  );
};
