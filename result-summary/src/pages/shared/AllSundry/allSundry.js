import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../api/apiCall";
import {
	getAllSessionsUrl,
	getApplicantInfoForSundryUrl,
	getSetUpCategoriesUrl,
	getSetUpCategoryFeesUrl,
	getSetUpCategoryTypesUrl,
	getDepartmentsUrl,
	getApplicantSundryInvoicesUrl
} from "../../../api/urls";
import { InfiniteProgressBar, Spinner } from "../../../ui_elements";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { SundryDetailsForm, Table, UserDetailsContainer } from "./components";
import ContainerStyles from "../../superAdmin/CourseManagement/pages/AssignCourse/style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { SundryDetailsSchema } from "./schema";
import { PAGESIZE } from "../../../utils/constants";

export const AllSundry = ({ user }) => {
	const [filter, setFilter] = useState({
		setupCategoryId: "",
		setupCategoryTypeId: "",
		subCategoryId: "",
		mobileNumber: ""
	});
	const [watchSetUpCategory, setWatchSetUpCategory] = useState("");
	const [watchSetUpCategoryType, setWatchSetUpCategoryType] = useState("");
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);
	const [newInvoice, setNewInvoice] = useState(false);
	const contractorPaymentSelected = watchSetUpCategory === 3;
	const isUnderGraduateSelected = watchSetUpCategory === 1;
	const {
		control,
		watch,
		handleSubmit,
		register,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			setupCategoryId:
				user === "postgraduate"
					? { value: 1, label: "Student Related Payments" }
					: "",
			setupCategoryTypeId:
				user === "postgraduate"
					? { value: 2, label: "Postgraduate" }
					: ""
		},
		resolver: yupResolver(SundryDetailsSchema),
		context: {
			isContractorPaymentReq: contractorPaymentSelected ? true : false,
			isUnderGraduate: isUnderGraduateSelected ? true : false
		}
	});

	const watchData = watch({
		setupCategoryId: "setupCategoryId",
		setupCategoryTypeId: "setupCategoryTypeId"
	});
	useEffect(() => {
		const subscription = watch(
			({ setupCategoryId, setupCategoryTypeId }) => {
				console.log(setupCategoryId, setupCategoryTypeId);
				setWatchSetUpCategoryType(setupCategoryTypeId?.value);
				setWatchSetUpCategory(setupCategoryId?.value);
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);
	const {
		data: departments,
		// isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(
		getDepartmentsUrl(
			watchSetUpCategory === 1 ? watchSetUpCategoryType : 1
		),
		{
			enabled: !!watchSetUpCategoryType,
			refetchOnWindowFocus: false
		}
	);
	const {
		data: sessions,
		isLoading: isSessionsLoading,
		error: sessionsError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: info,
		isLoading,
		isFetching,
		error
	} = useApiGet(
		getApplicantInfoForSundryUrl({
			mobileNumber: filter.mobileNumber,
			bursaryCategoryTypeId: filter?.setupCategoryTypeId
		}),
		{
			enabled: !!filter.mobileNumber,
			refetchOnWindowFocus: false
		}
	);
	const {
		data: setupCategories,
		isLoading: isSetupCategoriesLoading,
		error: subCategoryError
	} = useApiGet(getSetUpCategoriesUrl());
	const { data: setupCategoryType, isLoading: isLoadingSetupCategoryTypes } =
		useApiGet(
			getSetUpCategoryTypesUrl({
				setupCategoryId: watchData?.setupCategoryId?.value
			}),
			{
				enabled: !!watchData?.setupCategoryId?.value,
				refetchOnWindowFocus: false
			}
		);
	const { data: setupCategoryFees, isLoading: isLoadingSetupCategoryFees } =
		useApiGet(
			getSetUpCategoryFeesUrl({
				setupCategoryTypeId: watchData?.setupCategoryTypeId?.value
			}),
			{
				enabled: !!watchData?.setupCategoryTypeId?.value,
				refetchOnWindowFocus: false
			}
		);
	const {
		data: inoviceData,
		isLoading: isLoadingInvoiceData,
		isFetching: isFetchingInvoiceData,
		error: invoiceError
	} = useApiGet(
		getApplicantSundryInvoicesUrl({
			regNo: filter.mobileNumber,
			subCategoryId: filter?.subCategoryId?.value?.id,
			pageSize,
			pageNumber
		}),
		{
			enabled: !!filter.mobileNumber,
			refetchOnWindowFocus: false
		}
	);

	const allSetupCategories = formatSelectItems(
		setupCategories?.data,
		"name",
		"id"
	);
	const allSetupCategoryTypes = formatSelectItems(
		setupCategoryType?.data,
		"name",
		"id"
	);
	const allSetupCategoryFees = formatSelectItems(
		setupCategoryFees?.data,
		"name",
		["id", "name", "amount"]
	);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	if (isSetupCategoriesLoading || isSessionsLoading)
		return (
			<div style={{ marginTop: "100px" }}>
				<Spinner />
			</div>
		);

	if (
		subCategoryError ||
		departmentError ||
		sessionsError ||
		error ||
		invoiceError
	)
		return "An error has occurred: " + subCategoryError?.message;
	return (
		<section>
			<div className={ContainerStyles.page_content}>
				{(isLoading || isFetching) && (
					<InfiniteProgressBar width="inherit" />
				)}
				<div className="w-100">
					<SundryDetailsForm
						allSetupCategories={allSetupCategories}
						allSetupCategoryTypes={allSetupCategoryTypes}
						setFilter={setFilter}
						setValue={setValue}
						filter={filter}
						isLoadingSetupCategoryTypes={
							isLoadingSetupCategoryTypes
						}
						isUnderGraduateSelected={isUnderGraduateSelected}
						setupCategoryType={setupCategoryType}
						watchInfo={watchData}
						isLoadingSetupCategoryFees={isLoadingSetupCategoryFees}
						allSetupCategoryFees={allSetupCategoryFees}
						setupCategoryFees={setupCategoryFees}
						control={control}
						isLoading={isLoading}
						handleSubmit={handleSubmit}
						register={register}
						errors={errors}
						user={user}
						setNewInvoice={setNewInvoice}
					/>
					{info?.data &&
					!isFetching &&
					!isLoading &&
					(newInvoice || !(inoviceData?.data?.items?.length > 0)) ? (
						<div className="w-100">
							<UserDetailsContainer
								data={info?.data}
								filter={filter}
								watchInfo={watchData}
								isUnderGraduateSelected={
									isUnderGraduateSelected
								}
								contractorPaymentSelected={
									contractorPaymentSelected
								}
								allDepartments={allDepartments}
								allSessions={allSessions}
							/>
						</div>
					) : (
						""
					)}
					{inoviceData?.data?.items?.length > 0 &&
					!isFetchingInvoiceData &&
					!isLoadingInvoiceData &&
					!newInvoice ? (
						<Table
							data={inoviceData?.data?.items || []}
							loading={isFetchingInvoiceData}
							hasPerformedQuery={!!filter.applicationTypeId}
							setPageNumber={setPageNumber}
							paginationProps={inoviceData?.data?.metaData || {}}
							pageNumber={pageNumber}
							pageSize={pageSize}
							setNewInvoice={setNewInvoice}
							filter={filter}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
		</section>
	);
};
