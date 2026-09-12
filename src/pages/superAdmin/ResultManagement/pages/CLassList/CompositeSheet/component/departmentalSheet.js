import { ResultTable, ResultTableHeader } from "../../../../../../ui_elements";
import { AbbreviationTable } from "./abbreviationTable";
import { GradeTade } from "./gradeTable";
import { OfficalsTable } from "./officalsTable";
import { ResultSummary } from "./resultSummary";
import { Signature } from "./signature";
import { UnregisteredTable } from "./unregisteredTable";

export const DepartmentalSheet = ({ compositeSheet, data }) => {
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
							session: compositeSheet?.data?.session || "-"
						}}
					/>
					<div className="d-flex pt-4">
						<OfficalsTable compositeSheet={compositeSheet} />
						<AbbreviationTable />
						<GradeTade />
					</div>
					<div className="w-100 mt-4">
						<ResultTable
							semester={compositeSheet?.data?.semester}
							subjects={compositeSheet?.data?.courses}
							students={data}
						/>
					</div>
					<UnregisteredTable
						data={compositeSheet?.data?.unRegisteredStudentsInfo}
					/>
					<div className="d-flex justify-content-center w-100">
						<main className="w-100">
							<Signature name={"Dean’s Signature & Date"} />
							<Signature name={"HOD’s Signature & Date"} />
							<Signature
								name={"Course Adviser’s Signature & Date"}
							/>
						</main>
						<ResultSummary data={compositeSheet?.data?.summary} />
					</div>
				</div>
			))}
		</>
	);
};
