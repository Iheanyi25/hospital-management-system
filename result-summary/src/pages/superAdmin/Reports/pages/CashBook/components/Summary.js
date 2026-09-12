import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { useMemo } from "react";
import { TMTable } from "../../../../../../ui_elements";
import numberFormatter from "../../../../../../utils/numberFormatter";
export const Summary = ({ reports, loading }) => {
	return (
		<div>
			<Tabs id="default">
				<div className="my-4">
					<TabList>
						<Tab>Level view</Tab>
						<Tab>Department view</Tab>
						<Tab>Faculty view</Tab>
					</TabList>
				</div>
				<TabPanel>
					<div className="w-100">
						<LevelTable
							data={reports?.levelSummary}
							loading={loading}
						/>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<DepartmentTable
							data={reports?.departmentSummary}
							loading={loading}
						/>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<FacultyTable
							data={reports?.facultySummary}
							loading={loading}
						/>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
};

const LevelTable = ({ data, loading }) => {
	const columns = useMemo(
		() => [
			{
				Header: "Level",
				accessor: "group"
			},
			{
				Header: "Students Paid",
				accessor: "numberOfStudents",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(row.original.numberOfStudents) ||
							"NONE"}
					</>
				)
			},
			{
				Header: "Amount (₦)",
				accessor: "total",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.total) || "NONE"}</>
				)
			}
		],
		[]
	);
	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				loading={loading}
				title="Summary"
			/>
		</div>
	);
};

const DepartmentTable = ({ data, loading }) => {
	const columns = useMemo(
		() => [
			{
				Header: "Department",
				accessor: "group"
			},
			{
				Header: "100L",
				accessor: "numberOfStudents1",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[0]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "200L",
				accessor: "numberOfStudents2",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[1]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "300L",
				accessor: "numberOfStudents",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[2]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "400L",
				accessor: "numberOfStudents3",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[3]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "500L",
				accessor: "numberOfStudents4",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[4]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "Amount (₦)",
				accessor: "total",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.total) || "NONE"}</>
				)
			}
		],
		[]
	);
	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				loading={loading}
				title="Summary"
			/>
		</div>
	);
};

const FacultyTable = ({ data, loading }) => {
	const columns = useMemo(
		() => [
			{
				Header: "Faculty",
				accessor: "group"
			},
			{
				Header: "100L",
				accessor: "numberOfStudents1",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[0]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "200L",
				accessor: "numberOfStudents2",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[1]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "300L",
				accessor: "numberOfStudents",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[2]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "400L",
				accessor: "numberOfStudents3",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[3]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "500L",
				accessor: "numberOfStudents4",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(
							row.original.summary[4]?.numberOfStudents
						) || "NONE"}
					</>
				)
			},
			{
				Header: "Amount (₦)",
				accessor: "total",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.total) || "NONE"}</>
				)
			}
		],
		[]
	);
	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				loading={loading}
				title="Summary"
			/>
		</div>
	);
};
