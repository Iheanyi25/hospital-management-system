import {
	Button,
	ConfirmationModal,
	Jumbotron,
	Spinner,
	TMTable
} from "../../../../../../ui_elements";
import { useApiDelete, useApiGet } from "../../../../../../api/apiCall";
import {
	getStudentScholarshipsUrl,
	deleteStudentSessionScholarshipUrl,
	deleteStudentScholarshipUrl,
	getStudentsScholarshipsUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { AwardPersonnelCard } from "./awardPersonnelCard";
import { useCallback, useMemo, useState } from "react";
import { PAGESIZE } from "../../../../../../utils/constants";

export const StudentScholarshipDetail = ({
	data: { scholarshipId, userId, sessionId },
	closeModal
}) => {
	const [pageNumber, setPageNumber] = useState(1);
	const [openDelete, setOpenDelete] = useState(false);
	const [editData, setEditData] = useState("");
	const [allDelete, setAllDelete] = useState(false);
	const pageSize = PAGESIZE.sm;
	const queryClient = useQueryClient();

	const { mutate, isLoading: isDeleting } = useApiDelete();

	const { data: studentData, isLoading: isLoadingStudentData } = useApiGet(
		getStudentScholarshipsUrl({ userId }),
		{
			refetchOnWindowFocus: false,
			enabled: !!userId
		}
	);

	const deleteSessionScholarship = useCallback(() => {
		const requestDet = {
			url: deleteStudentSessionScholarshipUrl(editData)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentScholarshipsUrl({ userId })
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Scholarship Deletion Success!",
					body: "Your scholarship was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Scholarship Deletion Failed!",
					body:
						response?.data?.message ||
						`Scholarship wasn't deleted successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	}, [mutate, queryClient, editData, userId]);

	const deleteScholarship = () => {
		const requestDet = {
			url: deleteStudentScholarshipUrl({
				userId,
				scholarshipId
			})
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentsScholarshipsUrl({ userId, sessionId })
				);
				setAllDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Scholarship Deletion Success!",
					body: "Your scholarship was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModal();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Scholarship Deletion Failed!",
					body:
						response?.data?.message ||
						`Scholarship wasn't deleted successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="Delete"
							buttonClass="danger"
							onClick={() => {
								setEditData(
									row?.original?.studentScholarshipId
								);
								setOpenDelete(true);
							}}
						/>
					</div>
				)
			}
		],
		[pageNumber, pageSize]
	);

	const details = [
		{
			title: "Full Name",
			value: `${studentData?.data?.fullname} `
		},
		{
			title: "Email",
			value: studentData?.data?.email
		},
		{
			title: "Phone",
			value: studentData?.data?.mobileNumber
		},
		{ title: "Matric No", value: studentData?.data?.matricNumber },
		{ title: "Faculty", value: studentData?.data?.faculty },
		{ title: "Department", value: studentData?.data?.department },
		{ title: "Entry Mode", value: studentData?.data?.modeOfEntry }
	];

	if (isLoadingStudentData) return <Spinner />;

	return (
		<>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteSessionScholarship}
				formTitle="Delete scholarship"
				message="Are you sure you want to delete this scholarship"
				buttonLabel="Delete"
				isLoading={isDeleting}
			/>
			<ConfirmationModal
				isOpen={allDelete}
				closeModal={() => setAllDelete(false)}
				handleClick={deleteScholarship}
				formTitle="Delete scholarship"
				message="Are you sure you want to delete this scholarship"
				buttonLabel="Delete"
				isLoading={isDeleting}
			/>
			<Jumbotron
				headerText="Student Details"
				footerContent={
					<Button
						data-cy="view_acceptance_records"
						type="submit"
						buttonClass="primary"
						label="Remove from schoarship"
						onClick={() => setAllDelete(true)}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="mt-5">
					<AwardPersonnelCard
						noMargin={false}
						noLogo={true}
						details={details}
						user={{
							fullName: `${studentData?.data?.fullname}`
						}}
					/>
					<div className="border-top mt-4 pt-3">
						<h5 className="text-bold mb-5 px-4">
							Scholarship details
						</h5>
						<TMTable
							columns={columns}
							data={studentData?.data?.scholarships?.items || []}
							title={"Scholarship Active Sessions"}
							setPageNumber={setPageNumber}
							loading={false}
						/>
					</div>
				</div>
			</Jumbotron>
		</>
	);
};
