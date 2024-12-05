import {
	ResultTableHeader,
	SummaryTable
} from "../../../../../../../ui_elements";

export const SummarySheet = ({ compositeSheet, data }) => {
	return (
		<>
			<ResultTableHeader
				details={{
					faculty: compositeSheet?.data?.faculty || "-",
					department: compositeSheet?.data?.department || "-",
					semester: compositeSheet?.data?.semester || "-",
					date: compositeSheet?.data?.date || "-",
					programme: compositeSheet?.data?.programme || "-",
					session: compositeSheet?.data?.session || "-"
				}}
				result={false}
			/>
			<SummaryTable
				semester={compositeSheet?.data?.semester}
				subjects={compositeSheet?.data?.courses}
				students={data}
			/>
		</>
	);
};
