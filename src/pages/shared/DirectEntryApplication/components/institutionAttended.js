import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
	Jumbotron,
	Button,
	TextField,
	BlueContainer,
	Checkbox,
	SecondaryLink
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DIRECT_ENTRY } from "../../../../store/constant";
import { InstitutionAttendedSchema } from "../directEntrySchema";
import styles from "../style.module.css";
import {
	formatDateFromAPI,
	formatInputDate
} from "../../../../utils/formatDate";
import { useApiPut } from "../../../../api/apiCall";
import { directEntryInstitutionAttendedUrl } from "../../../../api/urls";
import { useLocation } from "react-router-dom";

export const InstitutionAttended = () => {
	const { institutionAttended, Id } = useSelector(
		(state) => state.directEntryData
	);
	const [ticked, setTicked] = useState(false);

	const directEntryData = useSelector((state) => state.directEntryData);

	const { mutate, isLoading: isFormLoading } = useApiPut();

	const [certificateList, setCertificateList] = useState([0]);

	const { replace } = useHistory();
	const { state } = useLocation();

	useEffect(() => {
		if (institutionAttended?.institutionAttended?.length > 0) {
			setCertificateList(institutionAttended?.institutionAttended);
		} else {
			setCertificateList([0]);
		}
	}, [institutionAttended]);

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			institutionAttended: institutionAttended.institutionAttended?.map(
				(institution) => ({
					institution: institution?.institution,
					fieldOfStudy: institution?.fieldOfStudy,
					dateFrom: formatDateFromAPI(institution?.dateFrom),
					dateTo: formatDateFromAPI(institution?.dateTo),
					certificate: institution?.certificate
				})
			)
		},
		resolver: yupResolver(InstitutionAttendedSchema)
	});

	const handleAddAnother = () => {
		setCertificateList([...certificateList, 0]);
	};

	const handleRemoveItem = (targetElement) => {
		setValue("institutionAttended", [
			...getValues()?.institutionAttended?.filter(
				(_, index) => index !== targetElement
			)
		]);
		setCertificateList(
			certificateList.filter((_, index) => index !== targetElement)
		);
	};

	const onSubmit = (institutionAttended) => {
		if (ticked) {
			const requestBody = {
				url: directEntryInstitutionAttendedUrl(),
				data: {
					directEntryApplicationFormId: Id,
					institutionAttended:
						institutionAttended?.institutionAttended.map(
							(institution) => ({
								Institution:
									institution?.institution,
								FieldOfStudy: institution?.fieldOfStudy,
								DateFrom: institution?.dateFrom,
								DateTo: institution?.dateTo,
								Certificate: institution?.certificate
							})
						)
				}
			};
			mutate(requestBody, {
				onSuccess: (data) => {
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Successfully updated institution attended",
						body: "You can now proceed to next step"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
					dispatch({
						type: DIRECT_ENTRY,
						payload: {
							...directEntryData,
							institutionAttended
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
		} else {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "Tick the checkbox to continue"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	};

	useEffect(() => {
		if (
			errors?.institutionAttended?.message ===
			"institutions attended are required"
		) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "Please submit at least one institution attended"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [errors]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Institution Attended</span>}
				endText="Step 2 of 3"
				footerContent={
					<Button
						data-cy="sumit_profile"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<p className={`${styles.note_text} mt-5 px-4`}>
					Please List all Post Primary Institutions Attended: *
				</p>
				{certificateList.map((_, index) => {
					const beginDate = watch(
						`institutionAttended.${index}.dateFrom`
					);
					return (
						<div
							className="container-fluid px-4 my-3 mb-5 border-bottom py-3 pb-5"
							key={index}
						>
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="certificateTypeId">
										Name and Location 1
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										placeholder="Enter institution and Location"
										id={`institutionAttended.${index}.institution`}
										name={`institutionAttended.${index}.institution`}
										register={register}
										required
										error={
											errors?.institutionAttended?.[index]
												?.institution
										}
										errorText={
											errors?.institutionAttended?.[index]
												?.institution &&
											errors?.institutionAttended?.[index]
												?.institution.message
										}
									/>
								</div>
							</div>

							<div className="row mt-5 d-flex align-items-center">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor={``}>Field of Study</label>
								</div>
								<div className="col-lg-9">
									<TextField
										autoComplete="off"
										placeholder="Enter field of study"
										className="w-100"
										type="text"
										id={`institutionAttended.${index}.fieldOfStudy`}
										name={`institutionAttended.${index}.fieldOfStudy`}
										register={register}
										required
										error={
											errors?.institutionAttended &&
											errors?.institutionAttended[index]
												?.fieldOfStudy
										}
										errorText={
											errors?.institutionAttended &&
											errors?.institutionAttended[index]
												?.fieldOfStudy &&
											errors?.institutionAttended[index]
												?.fieldOfStudy.message
										}
									/>
								</div>
							</div>

							<div className="row mt-5 d-flex align-items-center">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="certificateTypeId">
										Date Attended
									</label>
								</div>
								<div className="col-lg-3">
									<TextField
										type="date"
										id={`institutionAttended.${index}.dateFrom`}
										name={`institutionAttended.${index}.dateFrom`}
										register={register}
										required
										max={formatInputDate(new Date())}
										error={
											errors?.institutionAttended?.[index]
												?.dateFrom
										}
										errorText={
											errors?.institutionAttended?.[index]
												?.dateFrom &&
											errors?.institutionAttended?.[index]
												?.dateFrom.message
										}
									/>
								</div>
								-
								<div className="col-lg-3">
									<TextField
										type="date"
										id={`institutionAttended.${index}.dateTo`}
										name={`institutionAttended.${index}.dateTo`}
										register={register}
										required
										disabled={!beginDate}
										min={beginDate}
										max={formatInputDate(
											new Date("DateFrom")
										)}
										error={
											errors?.institutionAttended?.[index]
												?.dateTo
										}
										errorText={
											errors?.institutionAttended?.[index]
												?.dateTo &&
											errors?.institutionAttended?.[index]
												?.dateTo.message
										}
									/>
								</div>
							</div>
							<div className="row mt-5">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="certificateTypeId">
										Certificate Obtained
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										placeholder="Enter certificate obtained"
										id={`institutionAttended.${index}.certificate`}
										name={`institutionAttended.${index}.certificate`}
										register={register}
										required
										error={
											errors?.institutionAttended?.[index]
												?.certificate
										}
										errorText={
											errors?.institutionAttended?.[index]
												?.certificate &&
											errors?.institutionAttended?.[index]
												?.certificate.message
										}
									/>
								</div>
							</div>
							<div className="container-fluid px-4">
								<div className="d-flex justify-content-end mt-5">
									{index > 0 && (
										<SecondaryLink
											type="button"
											label="Delete"
											linkType="danger-link"
											onClick={() =>
												handleRemoveItem(index)
											}
										/>
									)}
								</div>
							</div>
						</div>
					);
				})}
				<div className="px-4 pb-3 text-right">
					<button
						className="clickable"
						type="button"
						onClick={handleAddAnother}
					>
						<span className="text-primary">
							+ Add another certificate
						</span>
					</button>
				</div>
				<div className="p-4">
					<h5>Declaration</h5>
					<BlueContainer>
						<div className="d-flex gap-3">
							<div>
								<Checkbox
									label=""
									id="Declaration"
									onSelect={() => setTicked(!ticked)}
									checked={ticked}
								/>
							</div>
							<p>
								I certify that all the information given in this
								form is to the best of my knowledge and belief,
								correct. Any false or incomplete information
								given in this form will automatically disqualify
								me from being considered for admission to, or
								continuing with any Course of Study in the
								University. I shall accept as final the decision
								of the Board with regret to my Course(s) of
								study and placement in the University.
							</p>
						</div>
					</BlueContainer>
				</div>
			</Jumbotron>
		</form>
	);
};
