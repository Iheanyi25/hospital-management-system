import { useHistory } from "react-router";
import { Jumbotron, Button, SMSelect, Spinner } from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ProgrammeDetailsSchema } from "../centerOfSafetyApplicationSchema";
import { useLocation } from "react-router-dom";
import { useApiPut, useApiGet } from "../../../../api/apiCall";
import { CSPG_APPLICATIONS } from "../../../../store/constant";
import {
	CSNDAddOrDropProgramme,
	CSPGAddOrDropProgramme,
	getAllSessionsUrl,
	getDepartmentsUrl,
	getSchoolProgrammesUrl,
	getStudentModesUrl
} from "../../../../api/urls";
import { useMemo } from "react";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

export const ProgrammeDetails = () => {
	const CSPGData = useSelector((state) => state.CSPGData);

	const { programme, studentTypeId } = useSelector((state) => state.CSPGData);

	const { mutate, isLoading: isFormLoading } = useApiPut();

	const { data: mode, isLoading: isModeLoading } = useApiGet(
		getStudentModesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: session, isLoading: isLoadingSession } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: award, isLoading: isLoadingAwards } = useApiGet(
		getSchoolProgrammesUrl({ studentTypeId: studentTypeId?.value }),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: courses, isLoading: isCoursesLoading } = useApiGet(
		getDepartmentsUrl(studentTypeId?.value),
		{
			refetchOnWindowFocus: false
		}
	);

	const allMode = useMemo(
		() => formatSelectItems(mode?.data, "name", "id"),
		[mode?.data]
	);

	const allAward = useMemo(
		() => formatSelectItems(award?.data, "name", "id"),
		[award?.data]
	);

	const allCourse = useMemo(
		() => formatSelectItems(courses?.data, "department", "departmentId"),
		[courses?.data]
	);

	const allSessions = useMemo(
		() => formatSelectItems(session?.data, "session", "id"),
		[session?.data]
	);

	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	const {
		handleSubmit,
		// watch,
		control,
		// setValue,
		// clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			RegNo: programme?.regNumber,
			Mode: programme?.modeOfStudyId,
			Award: programme?.CSEAwardId,
			Course: programme?.CSECourseId,
			Session: programme?.sessionId
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const onSubmit = (programmeDet) => {
		const requestBody = {
			url:
				CSPGData?.studentTypeId?.label === "CSEPG"
					? CSPGAddOrDropProgramme()
					: CSNDAddOrDropProgramme(),
			data: {
				cseProgrammeId: programme.id || 0,
				applicationFormId: CSPGData?.id,
				modeOfStudyId: programmeDet?.Mode?.value,
				schoolProgrammeId: programmeDet?.Award?.value,
				departmentId: programmeDet?.Course?.value,
				sessionId: programmeDet?.Session?.value
			}
		};

		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully updated programme details.",
					body: "You can now proceed to next step."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: CSPG_APPLICATIONS,
					payload: {
						...CSPGData,
						programme: {
							id: data?.data?.data,
							modeOfStudyId: programmeDet?.Mode,
							CSEAwardId: programmeDet?.Award,
							CSECourseId: programmeDet?.Course,
							duration: programmeDet?.Duration,
							sessionId: programmeDet?.Session
						}
					}
				});
				replace({ hash: "#section_c", state });
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	if ((isModeLoading, isCoursesLoading, isLoadingSession, isLoadingAwards))
		return <Spinner />;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Programme</span>}
				footerContent={
					<>
						<Button
							label="Previous"
							buttonClass="standard"
							onClick={() =>
								replace({ hash: "#section_a", state })
							}
						/>
						<Button
							data-cy="sumit_profile"
							label="Next"
							buttonClass="primary"
							type="submit"
							loading={isFormLoading}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-3 mb-5 py-3">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="lga">Mode</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="Mode"
								name="Mode"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose Mode"
										searchable={true}
										id="Mode"
										name={"Mode"}
										options={allMode}
										isError={!!errors.Mode}
										errorText={
											errors.Mode && errors.Mode.message
										}
									/>
								)}
							/>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="lga">Award</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="Award"
								name="Award"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose Award"
										searchable={true}
										id="Award"
										name={"Award"}
										options={allAward}
										isError={!!errors.Award}
										errorText={
											errors.Award && errors.Award.message
										}
									/>
								)}
							/>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="lga">Course</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="Course"
								name="Course"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose Course"
										searchable={true}
										id="Course"
										name={"Course"}
										options={allCourse}
										isError={!!errors.Course}
										errorText={
											errors.Course &&
											errors.Course.message
										}
									/>
								)}
							/>
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="lga">Session</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="Session"
								name="Session"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose Session"
										searchable={true}
										id="Session"
										name={"Session"}
										options={allSessions}
										isError={!!errors.Session}
										errorText={
											errors.Session &&
											errors.Session.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
