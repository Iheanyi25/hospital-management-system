import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getStudentsScholarshipsUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import {
	Breadcrumbs,
	Spinner,
	CenteredDialog,
	Button,
	PageTitle
} from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	AwardScholarship,
	StudentScholarshipDetail,
	ViewScholarshipDetailsForm,
	ViewScholarshipDetailsTable
} from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { useHistory, useLocation } from "react-router-dom";

const ViewScholarshipStudents = () => {
	const {
		state: { id, name }
	} = useLocation();
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [filter, setFilter] = useState({
		session: "",
		studentTypeId: ""
	});
	const [editData, setEditData] = useState({});
	const { push } = useHistory();
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		data: scholarshipStudents,
		isLoading: isLoadingScholarshipStudents,
		isFetching: isFetchingScholarshipStudents,
		error: scholarshipStudentsError
	} = useApiGet(
		getStudentsScholarshipsUrl({
			scholarshipId: id,
			sessionId: filter.session
		}),
		{
			enabled: !!filter.session && !!id,
			keepPreviousData: true
		}
	);

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	const crumbItems = [
		{
			name: "Scholarship Management",
			path: "/fees_assignment/scholarship_management"
		},
		{
			name,
			path: "/"
		}
	];

	const columns = useMemo(
		() => [
			{
				Header: "First Name",
				accessor: "firstname"
			},
			{
				Header: "Last Name",
				accessor: "lastname"
			},
			{
				Header: "Middle Name",
				accessor: "middlename"
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Matric No",
				accessor: "matricNumber"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="View"
							buttonClass="standard"
							data-cy="view_student"
							onClick={() => {
								setEditData({
									userId: row.original.userId,
									scholarshipId: id,
									sessionId: filter.session
								});
								setOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[setOpen, filter, id]
	);

	useEffect(() => {
		if (id === null) return push("/fees_assignment/scholarship_management");
	}, [id, push]);

	if (error || scholarshipStudentsError)
		return "An error has occurred: " + error?.message;
	if (isLoading) return <Spinner />;

	return (
		<>
			<section>
				<Breadcrumbs crumbs={crumbItems} />
				<PageTitle
					title={name}
					buttonGroup={
						<>
							<Button
								data-cy="award_scholarship"
								label="Award Scholarship"
								buttonClass="primary"
								onClick={() => setEditOpen(true)}
							/>
						</>
					}
				/>
				<CenteredDialog
					modalId="view_student"
					isOpen={open}
					closeModal={() => setOpen(false)}
					width={1000}
					formTitle=" "
				>
					<StudentScholarshipDetail
						data={editData}
						filter={filter}
						closeModal={() => setOpen(false)}
						allSessions={allSessions}
					/>
				</CenteredDialog>
				<CenteredDialog
					modalId="award_scholarship"
					isOpen={editOpen}
					closeModal={() => setEditOpen(false)}
					width={1000}
					formTitle="Award Scholarship to student"
				>
					<AwardScholarship
						data={{ scholarshipId: id }}
						filter={filter}
						closeModal={() => setEditOpen(false)}
						allSessions={allSessions}
					/>
				</CenteredDialog>
				<div className={ContainerStyles.page_content}>
					<ViewScholarshipDetailsForm
						allSessions={allSessions}
						control={control}
						errors={errors}
						filter={filter}
						setFilter={setFilter}
						handleSubmit={handleSubmit}
						isLoading={isLoadingScholarshipStudents}
					/>
				</div>
				<ViewScholarshipDetailsTable
					data={scholarshipStudents?.data?.items || []}
					setEditOpen={setEditOpen}
					columns={columns}
					loading={isFetchingScholarshipStudents}
				/>
			</section>
		</>
	);
};

export default ViewScholarshipStudents;
