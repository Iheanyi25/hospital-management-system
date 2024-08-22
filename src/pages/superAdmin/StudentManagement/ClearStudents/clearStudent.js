import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
	PageTitle,
	Breadcrumbs,
	TMTable,
	UserCard,
	Badge,
	Checkbox,
	Jumbotron,
	Button,
	SMSelect,
	Spinner,
	ConfirmationModal
} from "../../../../ui_elements";
import styles from "./style.module.css";
import { Controller, useForm } from "react-hook-form";
import {
	getDepartmentOptionUrl,
	getDepartmentsUrl,
	updateClearanceStatusUrl
} from "../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../api/apiCall";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
// import { useCookies } from "react-cookie";
// import { STUDENT_TYPE_HOLDER } from "../../../../utils/constants";

const data = [
	{ item: "Qualifying Result (WAEC/NECO/ND)" },
	{ item: "Baptismal Card / Age Declaration / Birth Certificate" },
	{ item: "JAMB Result Slip" },
	{ item: "Post - UTME Slip" },
	{ item: "Admission Notification Slip" },
	{ item: "Acceptance Form" },
	{ item: "School Fees Receipt" },
	{ item: "LGA Identification" },
	{ item: "Student Profile Update" },
	{ item: "Attestation" }
];
const ClearStudent = () => {
	const { goBack } = useHistory();
	const { state } = useLocation();
	const [items, setItems] = useState(state?.data.isCleared ? data : []);
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState({});
	const [departmentIdState, setDepartmentId] = useState("");
	const { mutate, isLoading: isPosting } = useApiPut();
	// const [cookies] = useCookies([STUDENT_TYPE_HOLDER]);
	// const { [STUDENT_TYPE_HOLDER]: studentTypeId } = cookies;
	const studentTypeId = 1;
	const isCleared = state?.data.isCleared;
	if (!state) goBack();
	const updateItems = useCallback(
		(data) => {
			if (
				items.find((item) => {
					return item.item === data.item;
				})
			)
				setItems((prev) => prev.filter((item) => item !== data));
			else setItems((prev) => [...prev, data]);
		},
		[items]
	);

	const updateAllChecks = useCallback(
		(itemsArray) => {
			if (itemsArray?.every((element) => items?.includes(element))) {
				setItems([]);
			} else {
				setItems(itemsArray);
			}
		},
		[items]
	);

	const handleRollback = () => {
		const requestDet = {
			url: updateClearanceStatusUrl(),
			data: {
				admissionListId: state?.data?.admissionListId,
				departmentId: isCleared
					? ""
					: values?.departmentId?.value ?? "",
				departmentOptionId: isCleared
					? ""
					: values?.departmentOptionId?.value ?? ""
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				setItems([]);
				goBack();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Student Action Success!",
					body: `Student ${
						isCleared ? "uncleared" : "cleared"
					} successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setOpen(false);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Student Action Success!",
					body:
						response?.data?.message ||
						`Student wasn't ${
							isCleared ? "uncleared" : "cleared"
						} successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const {
		data: departments,
		isLoading: isLoadingDepartments,
		error
	} = useApiGet(getDepartmentsUrl(studentTypeId), {
		refetchOnWindowFocus: false
	});
	const { data: departmentOption, isLoading: isLoadingDepartmentOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentIdState,
				studentTypeId
			}),
			{
				enabled: !!departmentIdState,
				refetchOnWindowFocus: false
			}
		);
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();
	const allDepartmentOptions = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption?.data]
	);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	useEffect(() => {
		const subscription = watch(({ departmentId }) => {
			setDepartmentId(departmentId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const columns = useMemo(
		() => [
			{
				Header: (
					<>
						<Checkbox
							label={""}
							labelClassName="ml-3"
							id={"check_all"}
							checked={data?.every((element) =>
								items?.includes(element)
							)}
							disabled={isCleared}
							onSelect={() => updateAllChecks(data)}
						/>
					</>
				),
				accessor: "itemCheck",
				Cell: ({ cell: { row } }) => {
					return (
						<Checkbox
							label={""}
							id={row.id}
							checked={items.find(
								(item) => row.original.item === item.item
							)}
							disabled={isCleared}
							onSelect={(e) => {
								updateItems(row.original);
							}}
						/>
					);
				}
			},
			{
				Header: "Items",
				accessor: "item"
			}
		],
		[items, isCleared, updateItems, updateAllChecks]
	);
	const handleValues = (values) => {
		setOpen(true);
		setValues(values);
	};
	const canProceed = items.length === data.length;
	if (isLoadingDepartments) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={state?.crumbs ?? []} />
			<ConfirmationModal
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleClick={handleRollback}
				formTitle={isCleared ? "Unclear Student" : "Clear Student"}
				message={`You are about to ${isCleared ? "unclear" : "clear"} ${
					state?.data?.lastname
				} ${state?.data?.firstname} with  Matric No ${
					state?.data?.regNumber
				}?`}
				isLoading={isPosting}
				isDeleteModal={isCleared}
				buttonLabel={isCleared ? "Yes, Unclear" : "Yes, Clear"}
			/>
			<div className="mb-5">
				<PageTitle
					title={`${state?.data?.lastname} ${state?.data?.firstname} ${state?.data?.middlename}`}
				/>
				<div className="d-flex">
					<div className="mr-2">
						<Badge
							item={{
								title: state?.data?.hasPaidAcceptance
									? "Paid"
									: "Not Paid",
								type: state?.data?.hasPaidAcceptance
									? "success"
									: "fail"
							}}
						/>
					</div>
					<Badge
						item={{
							title: state?.data.isCleared
								? "Cleared"
								: "Not cleared",
							type: state?.data.isCleared ? "success" : "fail"
						}}
					/>
				</div>
			</div>

			<div className={styles.content}>
				<div className="mb-4">
					<UserCard
						data={{
							fullName: `${state?.data?.lastname} ${state?.data?.firstname} ${state?.data?.middlename}`,
							matricNumber: state?.data?.regNumber,
							department: state?.data?.department,
							passport: state?.data?.photo
						}}
					/>
				</div>
				<TMTable
					columns={columns}
					data={data}
					title={`Document Checklist`}
					noBottomSpace={true}
				/>
				<form onSubmit={handleSubmit(handleValues)}>
					<Jumbotron
						borderClasses="border-top-0"
						footerContent={
							<>
								<Button
									data-cy="view_dean_records"
									buttonClass="standard"
									label="Back"
								/>
								<Button
									data-cy="view_dean_records"
									type="submit"
									buttonClass={
										isCleared ? "danger" : "primary"
									}
									label={
										isCleared
											? "Unclear Student"
											: "Clear Student"
									}
									disabled={!canProceed}
								/>
							</>
						}
						footerStyle="d-flex justify-content-end"
					>
						<section className="p-4">
							<div className="row">
								<div className="col-md-12">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												className="font-weight-bold"
												htmlFor="departmentId"
											>
												Alternative Department
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="departmentId"
												control={control}
												defaultValue={
													state?.data?.altDepartmentId
														? findValueAndLabel(
																state?.data
																	?.altDepartmentId,
																allDepartments
														  )
														: null
												}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="departmentId"
														options={allDepartments}
														disabled={
															!canProceed ||
															isCleared
														}
														placeholder="Select alternative department"
														searchable={false}
														isError={
															!!errors.departmentId
														}
													/>
												)}
											/>
										</div>
									</div>
								</div>
							</div>
							{isLoadingDepartmentOptions ? (
								<div className="mb-4">
									<Spinner />
								</div>
							) : (
								allDepartmentOptions?.length > 0 && (
									<div className="row mt-4">
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-3  d-flex align-items-center">
													<label
														className="font-weight-bold"
														htmlFor="departmentOptionId"
													>
														Course Combination
													</label>
												</div>
												<div className="col-lg-9">
													<Controller
														name="departmentOptionId"
														control={control}
														defaultValue={
															state?.data
																?.altDepartmentOptionId
																? findValueAndLabel(
																		state
																			?.data
																			?.altDepartmentOptionId,
																		allDepartments
																  )
																: null
														}
														render={({ field }) => (
															<SMSelect
																{...field}
																id="departmentOptionId"
																options={
																	allDepartmentOptions
																}
																disabled={
																	!canProceed ||
																	isCleared
																}
																placeholder="Select course combination"
																searchable={
																	false
																}
																isError={
																	!!errors.departmentOptionId
																}
															/>
														)}
													/>
												</div>
											</div>
										</div>
									</div>
								)
							)}
						</section>
					</Jumbotron>
				</form>
			</div>
		</div>
	);
};

export default ClearStudent;
