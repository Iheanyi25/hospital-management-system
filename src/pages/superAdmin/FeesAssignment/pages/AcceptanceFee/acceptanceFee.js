import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getStudentTypesUrl,
	getAcceptanceFeesUrl,
	getServicesTypesUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import { Spinner, CenteredDialog, Button } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	EditAcceptanceFee,
	ViewAcceptanceFeeForm,
	AcceptanceFeeTable
} from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";

const AcceptanceFeeAssignment = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [filter, setFilter] = useState({
		session: "",
		studentTypeId: "",
	});
	const [editData, setEditData] = useState({});
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		data: feesToAssign,
		isLoading: isLoadingFeesToAssign,
		isFetching: isFetchingFeesToAssign,
		error: feesToAssignError
	} = useApiGet(
		getAcceptanceFeesUrl({
			sessionId: filter.session,
			studentTypeId: filter.studentTypeId,
		}),
		{
			enabled: !!filter.session,
			keepPreviousData: true
		}
	);

	const {
		data: serviceTypes,
		isLoading: isLoadingServicesTypes,
		error: servicesTypesError
	} = useApiGet(getServicesTypesUrl());

	const {
		data: studentTypes,
		isLoading: isLoadingStudentTypes,
		error: studentTypeError
	} = useApiGet(getStudentTypesUrl());
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allServiceTypes = formatSelectItems(serviceTypes?.data, "name", "id");

	const columns = useMemo(
		() => [
			{
				Header: "Amount",
				accessor: "amount"
			},
			{
				Header: "Tenece Commission",
				accessor: "teneceCommission"
			},
			{
				Header: "Service Type",
				accessor: "serviceType"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="Edit"
							buttonClass="standard"
							data-cy="acceptance_fee_edit_button"
							onClick={() => {
								setEditData({
									id: row.original.id,
									Amount: row.original.amount,
									TeneceCommission:
										row.original.teneceCommission,
									studentTypeId: row.original.studentTypeId,
									sessionId: row.original.sessionId,
									serviceTypeId: row.original.serviceTypeId,
									serviceType: row.original.serviceType
								});
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[setEditOpen]
	);

	if (error || feesToAssignError || studentTypeError || servicesTypesError)
		return "An error has occurred: " + error?.message;
	if (isLoading || isLoadingStudentTypes || isLoadingServicesTypes)
		return <Spinner />;

	return (
		<section>
			<CenteredDialog
				modalId="edit_acceptance_fees"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit acceptance fees"
			>
				<EditAcceptanceFee
					data={editData}
					filter={filter}
					closeModal={() => setEditOpen(false)}
					allServiceTypes={allServiceTypes}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<ViewAcceptanceFeeForm
					allSessions={allSessions}
					allStudentTypes={allStudentTypes}
					control={control}
					errors={errors}
					filter={filter}
					setFilter={setFilter}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingFeesToAssign}
				/>
			</div>
			<AcceptanceFeeTable
				data={feesToAssign?.data ? [feesToAssign?.data] : []}
				setEditOpen={setEditOpen}
				columns={columns}
				loading={isFetchingFeesToAssign}
			/>
		</section>
	);
};

export default AcceptanceFeeAssignment;
