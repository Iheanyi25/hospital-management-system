import { useLocation, useHistory } from "react-router-dom";
import styles from "./style.module.css";
import {
	Breadcrumbs,
	Button,
	Jumbotron,
	PageTitle,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../ui_elements";
import {
	getDepartmentsUrl,
	bulkUpdateAcceptanceFeesAssignmentUrl,
	getAcceptanceFeesUrl,
	getServicesTypesUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { BulkUpload } from "./components";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./components/uploadSchema";
import { useMemo, useState } from "react";

const AcceptanceFeesBulk = () => {
	const [isDepartmentError, setIsDepartmentError] = useState(null);
	const {
		state: { filter, searchParams }
	} = useLocation();
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();

	const name = "Bulk Assignment";

	const { goBack } = useHistory();

	const crumbItems = [
		{
			name: "Acceptance Fees",
			path: "/fees_assignment/acceptance_fees",
			search: new URLSearchParams(searchParams).toString()
		},
		{
			name,
			path: "/"
		}
	];

	const {
		getValues,
		trigger,
		control,
		handleSubmit,
		setValue,
		formState: { errors, isValid }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});

	const {
		data,
		isLoading: isLoadingDepartments,
		error
	} = useApiGet(getDepartmentsUrl(filter?.studentTypeId, filter.facultyId), {
		refetchOnWindowFocus: false,
		keepPreviousData: true
	});

	const {
		data: serviceTypes,
		isLoading: isLoadingServiceTypes,
		error: serviceTypeError
	} = useApiGet(getServicesTypesUrl());

	const departmentList = formatSelectItems(
		data?.data,
		"department",
		"departmentId"
	);

	const allServiceTypes = useMemo(
		() => formatSelectItems(serviceTypes?.data, "name", "id"),
		[serviceTypes]
	);

	const formattedDepartments = getValues()?.departmentId?.map(
		({ value }) => value
	);
	const onSubmit = async ({ Amount, TeneceCommission, ServiceTypeId }) => {
		await trigger();
		if (!formattedDepartments?.length > 0) {
			setIsDepartmentError(true);
			return;
		}
		if (!isValid) {
			return;
		}
		const requestDet = {
			url: bulkUpdateAcceptanceFeesAssignmentUrl(),
			data: {
				Amount,
				TeneceCommission,
				SessionId: filter?.sessionId,
				StudentTypeId: filter?.studentTypeId,
				DepartmentId: formattedDepartments,
				ServiceTypeId: ServiceTypeId?.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getAcceptanceFeesUrl(filter));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "School fees successfully edited!",
					body: "You successfully edited school fees"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				goBack();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Acceptance fee edit Failed!",
					body:
						response?.data?.message ||
						`Acceptance fee wasn't edited successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	if (isLoadingServiceTypes) return <Spinner />;

	if (serviceTypeError)
		return "An error has occurred: " + serviceTypeError?.message;

	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle title={name} />
			<div className={styles.page_content}>
				<div className="w-100">
					<Jumbotron headerText={`Fees Breakdown`}>
						<div className="p-4">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="departmentId">
										Department
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="departmentId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="departmentId"
												options={departmentList}
												placeholder="Select department"
												loading={isLoadingDepartments}
												onChange={(value) => {
													setValue(
														"departmentId",
														value
													);
													setIsDepartmentError(false);
												}}
												disabled={
													isLoadingDepartments ||
													error
												}
												searchable
												isMulti
												isError={isDepartmentError}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<Tabs id="default">
							<div className="mt-3 border-top pt-3">
								<TabList>
									<Tab>Single upload</Tab>
									<Tab>Bulk upload</Tab>
								</TabList>
							</div>
							<TabPanel>
								<div className="w-100">
									<form>
										<div className="row px-3 border-bottom pb-5">
											<div className="col-md-6 mt-5">
												<div className="row">
													<div className="col-lg-3 d-flex  align-items-center">
														<label
															className="font-weight-bold"
															htmlFor="Amount"
														>
															Amount
														</label>
													</div>
													<div className="col-lg-9">
														<Controller
															name="Amount"
															control={control}
															render={({
																field
															}) => (
																<TextField
																	type="text"
																	placeholder="Enter amount"
																	id="Amount"
																	error={
																		errors.Amount
																	}
																	errorText={
																		errors.Amount &&
																		errors
																			.Amount
																			.message
																	}
																	{...field}
																	required
																/>
															)}
														/>
													</div>
												</div>
											</div>
											<div className="col-md-6 mt-5">
												<div className="row">
													<div className="col-lg-3 d-flex  align-items-center">
														<label
															className="font-weight-bold"
															htmlFor="TeneceCommission"
														>
															Tenece commission
														</label>
													</div>
													<div className="col-lg-9">
														<Controller
															name="TeneceCommission"
															control={control}
															render={({
																field
															}) => (
																<TextField
																	type="text"
																	placeholder="Enter amount"
																	id="TeneceCommission"
																	error={
																		errors.TeneceCommission
																	}
																	errorText={
																		errors.TeneceCommission &&
																		errors
																			.TeneceCommission
																			.message
																	}
																	{...field}
																	required
																/>
															)}
														/>
													</div>
												</div>
											</div>
											<div className="col-md-6 mt-5">
												<div className="row">
													<div className="col-lg-3 d-flex  align-items-center">
														<label
															className="font-weight-bold"
															htmlFor="ServiceTypeId"
														>
															Service Type
														</label>
													</div>
													<div className="col-lg-9">
														<Controller
															name="ServiceTypeId"
															control={control}
															rules={{
																required: true
															}}
															render={({
																field
															}) => (
																<SMSelect
																	{...field}
																	placeholder="Select Service Type"
																	options={
																		allServiceTypes
																	}
																	id="ServiceTypeId"
																	searchable={
																		false
																	}
																	isError={
																		!!errors.ServiceTypeId
																	}
																	errorText={
																		errors.ServiceTypeId &&
																		errors
																			.ServiceTypeId
																			.message
																	}
																/>
															)}
														/>
													</div>
												</div>
											</div>
										</div>
									</form>
									<div className="d-flex align-items-center justify-content-end py-4 px-3">
										<Button
											data-cy="save"
											label="Save "
											buttonClass="primary"
											onClick={handleSubmit(onSubmit)}
											loading={isLoading}
										/>
									</div>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="w-100 pb-3">
									<BulkUpload
										currentFilterState={filter}
										departments={formattedDepartments}
										setIsDepartmentError={
											setIsDepartmentError
										}
									/>
								</div>
							</TabPanel>
						</Tabs>
					</Jumbotron>
				</div>
			</div>
		</div>
	);
};

export default AcceptanceFeesBulk;
