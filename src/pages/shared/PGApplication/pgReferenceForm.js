import { Controller, useForm } from "react-hook-form";
import queryString from "query-string";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiGet, useApiPost } from "../../../api/apiCall";
import {
	getRefereeInfoUrl,
	getRefereeRatingOptionsUrl,
	submitRefereeReviewUrl
} from "../../../api/urls";
import {
	Button,
	Jumbotron,
	PageTitle,
	RadioButtons,
	SMSelect,
	Spinner,
	TextField,
	ValidationText
} from "../../../ui_elements";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import styles from "./style.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SCHOOL_DETAILS } from "../../../utils/constants";

const referenceFormSchema = yup.object().shape({
	knownCandidate: yup.string().required("An answer is required"),
	intellectualCapacity: yup.mixed().required("A selection is required"),
	persistenceCapacity: yup.mixed().required("A selection is required"),
	imaginativeCapacity: yup.mixed().required("A selection is required"),
	productiveCapacity: yup.mixed().required("A selection is required"),
	qualityOfPreviousWork: yup.mixed().required("A selection is required"),
	readWriteExpression: yup.mixed().required("A selection is required"),
	personality: yup.string().required("An answer is required"),
	acceptGraduate: yup.string().required("An answer is required"),
	overallPremise: yup.mixed().required("A selection is required"),
	otherInformation: yup.string().required("An answer is required"),
	objection: yup.string().required("An answer is required")
});
const PGReferenceForm = () => {
	const { push } = useHistory();
	const { mutate, isLoading: isPosting } = useApiPost();
	const parsed = queryString.parse(window.location.search);
	if (!parsed?.passcode) push("/pg_login");
	const {
		handleSubmit,
		register,
		control,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			acceptGraduate: "Yes"
		},
		resolver: yupResolver(referenceFormSchema)
	});
	const { data, isLoading, error } = useApiGet(
		getRefereeInfoUrl(parsed?.passcode),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: stauses,
		isLoading: isLoadingStatuses,
		error: isStatusesError
	} = useApiGet(getRefereeRatingOptionsUrl(), {
		refetchOnWindowFocus: false
	});
	const info = data?.data;
	const formatSubmitData = (values) => {
		const data = {};
		Object.keys(values).map((item) => {
			if (typeof values[item] === "object") {
				return (data[item] = values[item].value);
			} else if (item === "acceptGraduate") {
				return (data[item] = values[item] === "Yes" ? true : false);
			} else {
				return (data[item] = values[item]);
			}
		});
		return data;
	};
	const onSubmit = (values) => {
		const data = {
			pgApplicationFormId: info?.pgApplicationFormId,
			email: info?.refereeEmail,
			passCode: parsed?.passcode,
			...formatSubmitData(values)
		};
		const requestBody = {
			url: submitRefereeReviewUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Review successfully updated!",
					body: `You have sucessfully reviewed ${info?.applicantSurname} ${info?.applicantFirstname} ${info?.applicantMiddlename}`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push("/");
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed to review candidate!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						`check your details `
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const acceptData = watch("acceptGraduate");
	const allStatuses = formatSelectItems(stauses?.data, "rating", "id");
	if (isLoading || isLoadingStatuses) return <Spinner />;
	if (error || isStatusesError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className="d-flex justify-content-center mb-5">
				<PageTitle title="Post Graduate Application Form" />
			</div>
			<div className="row mx-5 d-flex justify-content-center">
				<div className="col-12 col-md-10">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Jumbotron
							headerText="REFEREE'S CONFIDENTIAL REPORT ON A CANDIDATE FOR
							ADMISSION TO HIGHER DEGREE STUDIES"
							footerContent={
								<Button
									data-cy="submit_form"
									label="Submit"
									buttonClass="primary"
									type="submit"
									loading={isPosting || isSubmitting}
								/>
							}
							footerStyle="d-flex justify-content-end"
						>
							<div className="container-fluid my-4">
								<p className={styles.welcome_text}>
									{`The candidate whose name is given below
									wishes to undertake a postgraduate degree
									studies in ${SCHOOL_DETAILS.name}. Your comments (which will be
									treated in strict confidence) on the
									candidate's suitability for the studies
									would be appreciated.`}
								</p>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_heading}>
									(As completed by the Candidate)
								</p>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="full_name">
											1. Full Name
										</label>
									</div>
									<div className="col-lg-9">
										<div className="row" id="full_name">
											<div className="col-4">
												<TextField
													autoComplete="off"
													placeholder="First Name"
													className="w-100 pr-2"
													name="firstname"
													value={
														info?.applicantFirstname
													}
													disabled
												/>
											</div>
											<div className="col-4">
												<TextField
													autoComplete="off"
													placeholder="Middle Name"
													className="w-100 px-2"
													name="middlename"
													value={
														info?.applicantMiddlename
													}
													disabled
												/>
											</div>
											<div className="col-4">
												<TextField
													autoComplete="off"
													placeholder="Last Name"
													className="w-100"
													name="surname"
													value={
														info?.applicantSurname
													}
													disabled
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-3">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="dept">
											2. Programme and Department
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter programme"
											className="w-100"
											type="text"
											id="dept"
											value={info?.applicantProgrammeDept}
											disabled
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_heading}>
									(To be completed by Referee)
								</p>
							</div>
							<div className="container-fluid px-4 my-3">
								<div className="row">
									<div className="col-lg-3">
										<label htmlFor="knownCandidate">
											3. How long, and what capacity have
											you known the candidate?
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter comment"
											className="w-100"
											inputType="textarea"
											id="knownCandidate"
											name="knownCandidate"
											register={register}
											required
											error={errors?.knownCandidate}
											errorText={
												errors?.knownCandidate &&
												errors.knownCandidate.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_text}>
									4. Please, evaluate the candidate in terms
									of the qualities below in comparison with
									other students. (Please, select as
									apapropriate):
								</p>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label htmlFor="intellectualCapacity">
											Intellectual Capacity
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="intellectualCapacity"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="intellectualCapacity"
													placeholder="Please select"
													name="intellectualCapacity"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.intellectualCapacity
													}
													errorText={
														errors?.intellectualCapacity &&
														errors
															.intellectualCapacity
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row d-flex align-items-center">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="persistenceCapacity">
											Capacity for persistent and
											independent academic Study
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="persistenceCapacity"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="persistenceCapacity"
													placeholder="Please select"
													name="persistenceCapacity"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.persistenceCapacity
													}
													errorText={
														errors?.persistenceCapacity &&
														errors
															.persistenceCapacity
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row d-flex align-items-center">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="imaginativeCapacity">
											Ability for imaginative thought
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="imaginativeCapacity"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="imaginativeCapacity"
													placeholder="Please select"
													name="imaginativeCapacity"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.imaginativeCapacity
													}
													errorText={
														errors?.imaginativeCapacity &&
														errors
															.imaginativeCapacity
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row d-flex align-items-center">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="productiveCapacity">
											Promise of productive scholarship
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="productiveCapacity"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="productiveCapacity"
													placeholder="Please select"
													name="productiveCapacity"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.productiveCapacity
													}
													errorText={
														errors?.productiveCapacity &&
														errors
															.productiveCapacity
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row d-flex align-items-center">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="qualityOfPreviousWork">
											Quality of previous work (if any)
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="qualityOfPreviousWork"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="qualityOfPreviousWork"
													placeholder="Please select"
													name="qualityOfPreviousWork"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.qualityOfPreviousWork
													}
													errorText={
														errors?.qualityOfPreviousWork &&
														errors
															.qualityOfPreviousWork
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row d-flex align-items-center">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="readWriteExpression">
											Ability for oral and written
											expression in English
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="readWriteExpression"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="readWriteExpression"
													placeholder="Please select"
													name="readWriteExpression"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.readWriteExpression
													}
													errorText={
														errors?.readWriteExpression &&
														errors
															.readWriteExpression
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_text}>
									5. Please comment on the personality with
									particular reference to his/her moral
									character, emotional and physical stability?
									*
								</p>
							</div>
							<div className="container-fluid px-4 my-3">
								<div className="row">
									<div className="col-lg-3">
										<label htmlFor="personality">
											Comments
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter comment"
											className="w-100"
											inputType="textarea"
											id="personality"
											name="personality"
											register={register}
											required
											error={errors?.personality}
											errorText={
												errors?.personality &&
												errors.personality.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_text}>
									6. Should situation arise, would you be able
									to accept the candidate as a research
									student?
								</p>
							</div>
							<div className="container-fluid px-4 my-3">
								<div className="row">
									<div className="col-lg-3">
										<label>Answer</label>
									</div>
									<div
										className="col-lg-9 d-flex"
										name="acceptGraduate"
									>
										<div className="mr-4">
											<RadioButtons
												label="Yes"
												value="Yes"
												name="acceptGraduate"
												register={register}
												checked={acceptData === "Yes"}
											/>
										</div>
										<RadioButtons
											label="No"
											value="No"
											name="acceptGraduate"
											register={register}
											checked={acceptData === "No"}
										/>
										<div>
											{errors.acceptGraduate &&
												errors.acceptGraduate
													.message && (
													<ValidationText
														status={"error"}
														message={
															errors
																.acceptGraduate
																.message
														}
													/>
												)}
										</div>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row d-flex align-items-center">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="overallPremise">
											7. Applicant’s Overall Performance
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="overallPremise"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="overallPremise"
													placeholder="Please select"
													name="overallPremise"
													options={allStatuses}
													searchable={false}
													isError={
														!!errors?.overallPremise
													}
													errorText={
														errors?.overallPremise &&
														errors.overallPremise
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_text}>
									8. Any other relevant information which
									would help in determining the applicant's
									suitability.
								</p>
							</div>
							<div className="container-fluid px-4 my-3">
								<div className="row">
									<div className="col-lg-3">
										<label htmlFor="otherInformation">
											Comments
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter comment"
											className="w-100"
											inputType="textarea"
											id="otherInformation"
											name="otherInformation"
											register={register}
											required
											error={errors?.otherInformation}
											errorText={
												errors?.otherInformation &&
												errors.otherInformation.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid my-4">
								<p className={styles.welcome_text}>
									9. Have you any objection to the contents of
									this evaluation being disclosed to any award
									giving body if the need arises?
								</p>
							</div>
							<div className="container-fluid px-4 my-3">
								<div className="row">
									<div className="col-lg-3">
										<label htmlFor="objection">
											Comments
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter comment"
											className="w-100"
											inputType="textarea"
											id="objection"
											name="objection"
											register={register}
											required
											error={errors?.objection}
											errorText={
												errors?.objection &&
												errors.objection.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
								Referee’s Details
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor={`name`}>{`Name`}</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter name"
											className="w-100"
											type="text"
											id={`name`}
											required
											value={info?.refereeFullName}
											disabled
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor={`email.`}>Email</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter email"
											className="w-100"
											type="text"
											id={`email.`}
											value={info?.refereeEmail}
											disabled
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor={`rank`}>
											Job position
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter position"
											className="w-100"
											type="text"
											id={`rank.`}
											value={info?.refereeRank}
											error={errors?.rank}
											errorText={
												errors?.rank &&
												errors.rank.message
											}
											disabled
										/>
									</div>
								</div>
							</div>
							<div className="container-fluid px-4 my-4">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor={`organization`}>
											Organization
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											autoComplete="off"
											placeholder="Enter organization"
											className="w-100"
											type="text"
											id={`organization`}
											value={info?.refereeOrganisation}
											disabled
										/>
									</div>
								</div>
							</div>
						</Jumbotron>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PGReferenceForm;