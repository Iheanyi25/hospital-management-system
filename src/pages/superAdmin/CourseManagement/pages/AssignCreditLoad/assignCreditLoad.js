import { CenteredDialog, Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getAllowableUnitsForStudentUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	EditUnitLoad,
	AssignCreditLoadForm,
	AssignCreditLoadTable,
	UploadList
} from "./components";

const AssignCreditLoad = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [uploadOpen, setUploadOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [filter, setFilter] = useState({
		sessionId: "",
		matricNo: "",
		semesterId: ""
	});

	const {
		data: allowableUnitLoads,
		isLoading: isLoadingAllowableUnitLoads,
		error: allowableUnitLoadsError,
		isFetched
	} = useApiGet(
		getAllowableUnitsForStudentUrl({
			semesterId: filter.semesterId,
			userId: filter.matricNo,
			sessionId: filter.sessionId
		}),
		{
			enabled: !!filter.sessionId,
			keepPreviousData: true
		}
	);
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm();

	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	useEffect(() => {
		if (isFetched && allowableUnitLoadsError) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Course Action Failed!",
				body:
					allowableUnitLoadsError?.response?.data?.message ||
					`Course wasn't dropped successfully`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [isFetched, allowableUnitLoadsError]);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="upload_unit_load"
				isOpen={uploadOpen}
				closeModal={() => setUploadOpen(false)}
				width={705}
				formTitle="Edit unit load"
			>
				<UploadList
					currentFilterState={filter}
					getValues={getValues}
					setUploadModal={() => setUploadOpen(false)}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit unit load"
			>
				<EditUnitLoad
					data={editData}
					currentFilterState={{
						semesterId: filter.semesterId,
						userId: filter.matricNo,
						sessionId: filter.sessionId
					}}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={styles.page_content}>
				<div className="w-100">
					<AssignCreditLoadForm
						control={control}
						setValue={setValue}
						errors={errors}
						allSessions={allSessions}
						setUploadOpen={setUploadOpen}
						getValues={getValues}
						setFilter={setFilter}
						handleSubmit={handleSubmit}
						isLoadingUnitLoads={isLoadingAllowableUnitLoads}
					/>
					<AssignCreditLoadTable
						data={allowableUnitLoads?.data || []}
						setEditOpen={setEditOpen}
						setEditData={setEditData}
						loading={isLoadingAllowableUnitLoads}
					/>
				</div>
			</div>
		</div>
	);
};

export default AssignCreditLoad;
