import { ResultTable, ResultTableHeader } from "../../../ui_elements";

export const ResultSheet = ({ compositeSheet, data }) => {
  return (
    <>
      {data?.map((data, i) => (
        <div key={i}>
          <ResultTableHeader
            details={{
              faculty: compositeSheet?.data?.faculty || "-",
              department: compositeSheet?.data?.department || "-",
              semester: compositeSheet?.data?.semester || "-",
              date: compositeSheet?.data?.date || "-",
              programme: compositeSheet?.data?.programme || "-",
              session: compositeSheet?.data?.session || "-",
            }}
          />
          <ResultTable
            semester={compositeSheet?.data?.semester}
            subjects={compositeSheet?.data?.courses}
            students={data}
          />
        </div>
      ))}
    </>
  );
};
