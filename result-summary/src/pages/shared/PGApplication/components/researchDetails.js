import {
	Jumbotron,
	Button,
	TextField,
	CompulsoryIndicator,
	SMSelect
} from "../../../../ui_elements";
import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { researchDetailsSchema } from "../pgSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { useApiPost } from "../../../../api/apiCall";
import { SAVE_PG_INFO } from "../../../../store/constant";
import { submitPGApplicationStepUrl } from "../../../../api/urls";
import { SCHOOL_DETAILS } from "../../../../utils/constants";
const { name } = SCHOOL_DETAILS;
const completionOptions = [
	{
		label: "Yes (With Discharge Certificate)",
		value: "Yes (With Discharge Certificate)"
	},
	{
		label: "No (With Exemption Letter)",
		value: "No (With Exemption Letter)"
	},
	{ label: "No", value: "No" }
];
const enrolledOptions = [
	{
		label: `Yes (Within ${SCHOOL_DETAILS.shortForm})`,
		value: `Yes (Within ${SCHOOL_DETAILS.shortForm})`
	},
	{
		label: "Yes (Other Institution)",
		value: "Yes (Other Institution)"
	},
	{ label: "No", value: "No" }
];
export const ResearchDetails = ({ allYears }) => {
	const pgState = useSelector((state) => state.pgData);
	const { otherDetail, pgApplicationFormId, sessionId, programme } = pgState;
	const [watchData, setWatchData] = useState({
		nysc: "",
		otherPrograms: ""
	});
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPost();
	const isExemptionYearRequired =
		watchData.nysc === completionOptions[0].value ||
		watchData.nysc === completionOptions[1].value;

	const isOtherProgramsRequired =
		watchData?.otherPrograms === enrolledOptions[0].value ||
		watchData?.otherPrograms === enrolledOptions[1].value;
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			dissertationTitle: otherDetail?.dissertationTitle ?? "",
			researchStatement: otherDetail?.researchStatement ?? "",
			nysc: otherDetail?.nysc
				? findValueAndLabel(otherDetail?.nysc, completionOptions)
				: null,
			nyscYear: otherDetail?.nyscYear
				? findValueAndLabel(otherDetail?.nyscYear, allYears)
				: null,
			otherPrograms: otherDetail?.otherPrograms
				? findValueAndLabel(otherDetail?.otherPrograms, enrolledOptions)
				: null,
			otherProgramsType: otherDetail?.otherProgramsType ?? "",
			otherProgramsInstitution:
				otherDetail?.otherProgramsInstitution ?? ""
		},
		resolver: yupResolver(researchDetailsSchema),
		context: {
			isExemptionYearRequired,
			isOtherProgramsRequired
		}
	});
	const formatSubmitData = (values) => {
		const data = {};
		Object.keys(values).map((item) => {
			if (typeof values[item] === "object") {
				return (data[item] = values[item].value);
			} else {
				return (data[item] = values[item]);
			}
		});
		return data;
	};
	const onSubmit = async (values) => {
		const data = {
			pgApplicationFormId,
			sessionId,
			id: otherDetail?.id,
			...formatSubmitData(values)
		};
		const requestBody = {
			url: submitPGApplicationStepUrl(5),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_PG_INFO,
					payload: {
						...pgState,
						otherDetail
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your educational records have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({
					pathname: "/pg_application_details",
					state: { rrr: programme.rrr, fromPGReprintLogin: true }
				});
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: response?.data?.message || "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	useEffect(() => {
		const subscription = watch(({ nysc, otherPrograms }) => {
			setWatchData((state) => ({
				nysc: nysc?.value ?? state.nysc,
				otherPrograms: otherPrograms?.value ?? state.otherPrograms
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	useEffect(() => {
		if (watchData.otherPrograms === enrolledOptions[0].value) {
			setValue("otherProgramsInstitution", name);
		} else if (watchData.otherPrograms === enrolledOptions[2].value) {
			setValue("otherProgramsType", "");
			setValue("otherProgramsInstitution", "");
		} else {
			setValue("otherProgramsInstitution", "");
		}
	}, [watchData.otherPrograms, setValue]);
	useEffect(() => {
		if (watchData.nysc === completionOptions[2].value) {
			setValue("nyscYear", "");
		}
	}, [watchData.nysc, setValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						H: Research Details
						<CompulsoryIndicator />
					</span>
				}
				endText="Step 5 of 5"
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Submit"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="dissertationTitle">
								Title for Dissertation
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="dissertationTitle"
								autoComplete="off"
								placeholder="Enter title"
								className="w-100"
								type="text"
								name="dissertationTitle"
								register={register}
								error={errors.dissertationTitle}
								errorText={
									errors.dissertationTitle &&
									errors.dissertationTitle.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="researchStatement">
								Research statement on the topic you wish to
								study (Not more than 200 words)
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Research statement"
								className="w-100"
								inputType="textarea"
								id="researchStatement"
								name="researchStatement"
								register={register}
								required
								error={errors.researchStatement}
								errorText={
									errors.researchStatement &&
									errors.researchStatement.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>
						I: Other Details
						<CompulsoryIndicator />
					</span>
				</div>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="nysc">Completed NYSC</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="nysc"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose an answer"
										options={completionOptions}
										searchable={false}
										id="nysc"
										{...field}
										isError={!!errors.nysc}
										errorText={
											errors.nysc && errors.nysc.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{isExemptionYearRequired && (
					<div className="container-fluid px-4 mt-4 mb-3">
						<div className="row">
							<div className="col-lg-3 d-flex align-items-center">
								<label htmlFor="nyscYear">
									Completion / Exemption year
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="nyscYear"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											placeholder="Choose a year"
											options={allYears}
											searchable={false}
											id="nyscYear"
											{...field}
											isError={!!errors.nyscYear}
											errorText={
												errors.nyscYear &&
												errors.nyscYear.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="otherPrograms">
								Are You Enrolled in Any Other Program Within or
								Outside the University *
							</label>
						</div>
						<div className="col-lg-9 d-flex align-items-center">
							<div className="w-100">
								<Controller
									name="otherPrograms"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											placeholder="Choose an answer"
											options={enrolledOptions}
											searchable={false}
											id="otherPrograms"
											{...field}
											isError={!!errors.otherPrograms}
											errorText={
												errors.otherPrograms &&
												errors.otherPrograms.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
				{isOtherProgramsRequired && (
					<>
						<div className="container-fluid px-4 mt-4 mb-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="otherProgramsType">
										Type of Other Program
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="otherProgramsType"
										autoComplete="off"
										placeholder="Program type e.g Masters"
										className="w-100"
										type="text"
										name="otherProgramsType"
										register={register}
										required
										error={errors.otherProgramsType}
										errorText={
											errors.otherProgramsType &&
											errors.otherProgramsType.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 mt-4 mb-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="otherProgramsInstitution">
										Other Prgram Institution
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="otherProgramsInstitution"
										autoComplete="off"
										placeholder="Name of Institution"
										className="w-100"
										type="text"
										disabled={
											watchData.otherPrograms ===
											enrolledOptions[0].value
										}
										name="otherProgramsInstitution"
										register={register}
										error={errors.otherProgramsInstitution}
										errorText={
											errors.otherProgramsInstitution &&
											errors.otherProgramsInstitution
												.message
										}
									/>
								</div>
							</div>
						</div>
					</>
				)}
			</Jumbotron>
		</form>
	);
};
