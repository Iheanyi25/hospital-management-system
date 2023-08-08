import { useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./style.module.css";
import {
	Breadcrumbs,
	Button,
	Jumbotron,
	PageTitle,
	Spinner,
	TextField
} from "../../../../../ui_elements";
import { Bin } from "../../../../../assets/svgs";
import {
	getSchoolFeesAssignmentBreakdownUrl,
	updateSchoolFeesAssignmentBreakdownUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FEES_ASSIGNMENT } from "../../../../../store/constant";

const SchoolFeesEdit = () => {
	const {
		state: { id, name, departmentId, filter, searchParams }
	} = useLocation();
	const { push } = useHistory();
	const dispatch = useDispatch();
	const updatedFeesAssignmentId = useSelector(
		(state) => state.feesAssignment
	);

	const {
		data: breakdown,
		isLoading: isBreakdownLoading,
		error: errorBreakdown
	} = useApiGet(getSchoolFeesAssignmentBreakdownUrl(id), {
		enabled: !!id || id === 0,
		refetchOnWindowFocus: false
	});
	const { mutate, isLoading } = useApiPut();

	const [breakdowns, setBreakdowns] = useState([0]);
	const constants = useMemo(() => ["amount", "id", "description"], []);

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
		formState: { errors }
	} = useForm({
		defaultValues: {
			amount: [],
			description: [],
			id: []
		}
	});

	const watchData = watch();

	const onSubmit = async () => {
		await trigger();
		if (Object.keys(errors)?.length >= 1) {
			return;
		}
		const requestDet = {
			url: updateSchoolFeesAssignmentBreakdownUrl(
				updatedFeesAssignmentId || id
			),
			data: {
				TeneceCommission: getValues()?.["amount"]?.[0] || 0,
				SessionId: filter?.SessionId,
				StudentTypeId: filter?.StudentTypeId,
				SchoolProgrammeId: filter?.SchoolProgrammeId,
				DepartmentId: breakdown?.data?.departmentId || departmentId,
				LevelId: filter?.Level,
				PaymentTypeId:
					breakdown?.data?.paymentTypeId || filter.PaymentType,
				StudentModeId:
					breakdown?.data?.studentModeId || filter.StudentModeId,
				StudentModeOfEntryId:
					breakdown?.data?.studentModeOfEntryId ||
					filter.StudentModeOfEntryId,
				ServiceTypeId:
					breakdown?.data?.serviceTypeId || filter.ServiceTypeId,
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
			onSuccess: (data) => {
				dispatch({
					type: FEES_ASSIGNMENT,
					payload: data?.data?.data
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "School fees successfully edited!",
					body: "You successfully edited school fees"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
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
		if (id === null) return push("/fees_assignment/school_fees");
	}, [id, push]);

	useEffect(() => {
		setValue(`amount.${0}`, breakdown?.data?.teneceCommission || 0);
		setValue(`description.${0}`, "Tenece Commission");

		if (breakdown?.data && breakdown?.data?.breakdown.length > 0) {
			breakdown?.data?.breakdown?.map((_, index) => {
				constants.map((constant) => {
					setValue(
						`${constant}.${index + 1}`,
						breakdown?.data?.breakdown?.[index]?.[constant]
					);
					return null;
				});
				setBreakdowns((breakdowns) => [
					...breakdowns,
					breakdowns[breakdowns?.length - 1] + 1
				]);
				return null;
			});
		}
	}, [breakdown, setValue, constants]);

	if (isBreakdownLoading) return <Spinner />;

	if (errorBreakdown)
		return (
			"An error has occurred: " + errorBreakdown?.response?.data?.message
		);

	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle title={name} />
			<div className={styles.page_content}>
				<div className="w-100">
					<Jumbotron
						headerText={`Fees Breakdown for ${name ? name : ""}`}
						endText={`Total: ${
							watchData?.amount?.length >= 1
								? watchData?.amount?.reduce(
										(previousValue, currentValue) => {
											return (
												Number(previousValue || 0) +
												Number(currentValue || 0)
											);
										}
								  )
								: ""
						}`}
						footerContent={
							<>
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
							</>
						}
						footerStyle="d-flex align-items-center justify-content-between"
					>
						<div className="p-4">
							<p>
								Fill in the fee breakdown for the department
								below.
							</p>
						</div>
						<form>
							{breakdowns.map((item, index) => (
								<div
									key={index}
									className="row p-4 border-top position-relative align-items-center gap-3 gap-md-0"
								>
									<div className="col-md-6 d-flex align-items-center gap-2 gap-md-0">
										<label htmlFor={`description.${item}`}>
											Description
										</label>
										<TextField
											className="offset-md-3 col-md-7"
											placeholder="Description"
											id={`description.${item}`}
											name={`description.${item}`}
											onBlur={() =>
												trigger(`description.${item}`)
											}
											register={() =>
												register(
													`description.${item}`,
													{ required: true }
												)
											}
											error={errors?.description?.[index]}
											disabled={item === 0}
										/>
									</div>
									<div className="col-md-5 d-flex align-items-center gap-2 gap-md-0">
										<label htmlFor={`amount.${item}`}>
											Amount
										</label>
										<TextField
											className="offset-md-3 col-md-8 col-xl-4"
											placeholder="Amount"
											id={`amount.${item}`}
											name={`amount.${item}`}
											onBlur={() =>
												trigger(`amount.${item}`)
											}
											register={() =>
												register(`amount.${item}`, {
													required: true
												})
											}
											min={0}
											type="number"
											error={errors?.amount?.[index]}
										/>
									</div>
									{index !== 0 ? (
										<div className="col-md-1">
											<button
												className={styles.bin}
												type="button"
												onClick={() => {
													handleRemove(item);
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
					</Jumbotron>
				</div>
			</div>
		</div>
	);
};

export default SchoolFeesEdit;
