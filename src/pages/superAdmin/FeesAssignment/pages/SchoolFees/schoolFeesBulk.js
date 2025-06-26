import { useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./style.module.css";
import {
	Breadcrumbs,
	Button,
	Jumbotron,
	PageTitle,
	SMSelect,
	TextField
} from "../../../../../ui_elements";
import { Bin } from "../../../../../assets/svgs";
import {
	getDepartmentsUrl,
	bulkUpdateSchoolFeesAssignmentUrl,
	getSchoolFeesAssignmentsUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { BulkUpload } from "./components";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { useQueryClient } from "react-query";
import numberFormatter from "../../../../../utils/numberFormatter";

const SchoolFeesBulk = () => {
	const {
		state: { filter, searchParams }
	} = useLocation();
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();

	const [breakdowns, setBreakdowns] = useState([0, 1]);
	const constants = useMemo(() => ["amount", "id", "description"], []);
	const name = "Bulk Assignment";

	const { goBack } = useHistory();

	const crumbItems = [
		{
			name: "School Fees",
			path: "/fees_assignment/school_fees",
			search: new URLSearchParams(searchParams).toString()
		},
		{
			name,
			path: "/"
		}
	];

	const {
		register,
		setValue,
		getValues,
		watch,
		trigger,
		clearErrors,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			amount: [],
			description: [],
			id: [],
			departmentId: []
		}
	});

	const watchData = watch();

	const {
		data,
		isLoading: isLoadingDepartments,
		error
	} = useApiGet(getDepartmentsUrl(filter?.StudentTypeId, filter?.FacultyId), {
		refetchOnWindowFocus: false,
		keepPreviousData: true
	});
	const departmentList = formatSelectItems(
		data?.data,
		"department",
		"departmentId"
	);
	const formattedDepartments = getValues()?.departmentId.map(
		({ value }) => value
	);
	const onSubmit = async () => {
		await trigger();
		if (Object.keys(errors)?.length >= 1) {
			return;
		}
		const hasSchoolProgrammeId = filter?.SchoolProgrammeId
			? { SchoolProgrammeId: filter?.SchoolProgrammeId }
			: {};
		const hasModeOfStudyId = filter?.ModeOfStudyId
			? { ModeOfStudyId: filter?.ModeOfStudyId }
			: {};
		const hasProgrammeTypeId = filter?.ProgrammeTypeId
			? { ProgrammeTypeId: filter?.ProgrammeTypeId }
			: {};
		const requestDet = {
			url: bulkUpdateSchoolFeesAssignmentUrl(),
			data: {
				TeneceCommission: getValues()?.["amount"]?.[0] || 0,
				portalCharge: getValues()?.["amount"]?.[1] || 0,
				// HubblyCommission: getValues()?.["amount"]?.[2] || 0,
				// SeamfixCommission: getValues()?.["amount"]?.[3] || 0,
				SessionId: filter?.SessionId,
				StudentTypeId: filter?.StudentTypeId,
				DepartmentId: formattedDepartments,
				PaymentChannelId: filter.PaymentChannelId,
				LevelId: filter?.Level,
				PaymentTypeId: filter.PaymentType,
				StudentModeId: filter.StudentModeId,
				...hasSchoolProgrammeId,
				...hasModeOfStudyId,
				...hasProgrammeTypeId,
				// IsStaff: filter?.IsStaff,
				CategoryId: filter?.CategoryId,
				ServiceTypeId: filter.ServiceTypeId,
				FeeBreakdown: Object.values(getValues()?.["amount"])
					?.slice(1)
					?.map((_, index) => ({
						amount: Object.values(getValues()?.["amount"])[
							index + 1
						],
						id: Object.values(getValues()?.["id"])[index + 1],
						description: Object.values(
							getValues()?.["description"]
						)[index + 1]
					}))
					?.filter((item) => item?.amount !== undefined)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getSchoolFeesAssignmentsUrl(filter)
				);
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
					title: "School fees edit Failed!",
					body:
						response?.data?.message ||
						`School fees wasn't edited successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const handleAddMore = () => {
		setBreakdowns((breakdowns) => [
			...breakdowns,
			breakdowns[breakdowns?.length - 1] + 1
		]);
	};

	const handleRemove = (removeItem) => {
		const filteredBreakdown = breakdowns.filter(
			(item) => item !== removeItem
		);
		setBreakdowns(filteredBreakdown);
		constants.map((constant) => {
			setValue(`${constant}.${removeItem}`, undefined);
			clearErrors();
			return null;
		});
	};

	useEffect(() => {
		setValue(`description.${0}`, "Tenece Commission");
		setValue(`amount.${0}`, 0);
		setValue(`amount.${1}`, 0);
		setValue(`description.${1}`, "Portal Charge");
		// setValue(`amount.${2}`, 0);
		// setValue(`description.${2}`, "Hubbly Commission");
		// setValue(`amount.${3}`, 0);
		// setValue(`description.${3}`, "Seamfix Commission");
	}, [setValue]);

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
												disabled={
													isLoadingDepartments ||
													error
												}
												searchable
												isMulti
												isError={!!errors.departmentId}
												errorText={
													errors.departmentId &&
													errors.departmentId.message
												}
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
									<div className="p-4 d-flex justify-content-between align-items-center">
										<p>
											Fill in the fee breakdown for the
											department below.
										</p>
										<p className="text-bold">
											Total:{" "}
											{watchData?.amount?.length >= 5
												? numberFormatter(
														watchData?.amount
															?.slice(4)
															.reduce(
																(
																	previousValue,
																	currentValue
																) => {
																	return (
																		Number(
																			previousValue ||
																				0
																		) +
																		Number(
																			currentValue ||
																				0
																		)
																	);
																}
															)
												  )
												: ""}
										</p>
									</div>
									<form>
										{breakdowns.map((item, index) => (
											<div
												key={index}
												className={`row p-4 border-top position-relative align-items-center gap-3 gap-md-0 ${
													index ===
													breakdowns.length - 1
														? "border-bottom"
														: ""
												}`}
											>
												<div className="col-md-6 d-flex align-items-center gap-2 gap-md-0">
													<label
														htmlFor={`description.${item}`}
													>
														Description
													</label>
													<TextField
														className="offset-md-3 col-md-7"
														placeholder="Description"
														id={`description.${item}`}
														name={`description.${item}`}
														onBlur={() =>
															trigger(
																`description.${item}`
															)
														}
														register={() =>
															register(
																`description.${item}`,
																{
																	required: true
																}
															)
														}
														error={
															errors
																?.description?.[
																index
															]
														}
														disabled={index < 2}
													/>
												</div>
												<div className="col-md-5 d-flex align-items-center gap-2 gap-md-0">
													<label
														htmlFor={`amount.${item}`}
													>
														Amount
													</label>
													<TextField
														className="offset-md-3 col-md-8 col-xl-4"
														placeholder="Amount"
														id={`amount.${item}`}
														name={`amount.${item}`}
														onBlur={() =>
															trigger(
																`amount.${item}`
															)
														}
														register={() =>
															register(
																`amount.${item}`,
																{
																	required: true
																}
															)
														}
														min={0}
														type="text"
														error={
															errors?.amount?.[
																index
															]
														}
													/>
												</div>
												{index > 3 ? (
													<div className="col-md-1">
														<button
															className={
																styles.bin
															}
															type="button"
															onClick={() => {
																handleRemove(
																	item
																);
															}}
														>
															<Bin />
														</button>
													</div>
												) : (
													""
												)}
											</div>
										))}
									</form>
									<div className="d-flex align-items-center justify-content-between py-4 px-3">
										<button
											className={styles["add_another"]}
											onClick={handleAddMore}
										>
											Add Fees Breakdown
										</button>
										<Button
											data-cy="save"
											label="Save "
											buttonClass="primary"
											onClick={onSubmit}
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

export default SchoolFeesBulk;
