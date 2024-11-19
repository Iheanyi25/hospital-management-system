import React, { useMemo } from "react";
import { Button, PersonnelCard, TMTable } from "../../../../../../ui_elements";

export const Table = ({
	data,
	studentData,
	setOpen,
	setEditData,
	setOpenDelete,
	loading,
	totalSelectedCreditUnit,
	unitLoad
}) => {
	console.log(studentData);
	const columns = useMemo(
		() => [
			{
				Header: "Course Code",
				accessor: "courseCode"
			},
			{
				Header: "Course Title",
				accessor: "courseName"
			},
			{
				Header: "Course Unit",
				accessor: "unitLoad"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<Button
						data-cy="drop_course"
						label="Drop"
						buttonClass="standard-danger"
						onClick={() => {
							setEditData(row.original);
							setOpenDelete(true);
						}}
					/>
				)
			}
		],
		[setOpenDelete, setEditData]
	);

	const details = useMemo(() => {
		return [
			{
				title: "Full Name",
				value: studentData?.studentProfile?.fullname?.toUpperCase()
			},
			{
				title: "Entry Mode",
				value: studentData?.studentProfile?.modeOfEntry
			},
			{
				title: "Matric No",
				value: studentData?.studentProfile?.matricNumber
			},
			{ title: "Level", value: studentData?.studentProfile?.level },
			{ title: "School", value: studentData?.studentProfile?.faculty },
			{ title: "Session", value: studentData?.session },
			{
				title: "Department",
				value: studentData?.studentProfile?.department
			},
			{ title: "Semester", value: studentData?.semester }
		];
	}, [studentData]);

	return (
		<div>
			{studentData && (
				<div className="border border-bottom-0 py-4">
					<PersonnelCard
						details={details}
						user={{
							fullName:
								studentData?.studentProfile?.fullname?.toUpperCase(),
							passPort: studentData?.studentProfile?.passPort
						}}
						noMargin
						noLogo
					/>
				</div>
			)}
			<TMTable
				columns={columns}
				data={data}
				title={
					data?.length > 0 &&
					`Registered courses for  ${studentData?.studentProfile?.matricNumber}`
				}
				loading={loading}
				additonalTitleData={
					<div className="d-flex align-items-center">
						{data?.length > 0 && (
							<div
								className={
									totalSelectedCreditUnit <
										unitLoad?.minimum ||
									totalSelectedCreditUnit > unitLoad?.maximum
										? "u-danger"
										: "u-success"
								}
							>{`${totalSelectedCreditUnit} of ${unitLoad?.maximum} units`}</div>
						)}
						<Button
							data-cy="default"
							buttonClass="primary"
							label="Add courses"
							customClass="ml-3"
							onClick={() => setOpen(true)}
						/>
					</div>
				}
			/>
		</div>
	);
};
