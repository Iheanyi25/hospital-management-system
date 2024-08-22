import { useEffect, useMemo } from "react";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { SUPPLEMENTARY_PUTME } from "../../../../store/constant";
import { ProgrammeDetailsSchema } from "../supplementaryPutmeSchema";
import { useApiPost } from "../../../../api/apiCall";
import { supplementaryPutmeProgrammeDetailsFormUrl } from "../../../../api/urls";

export const ProgrammeDetails = ({ allDepartments, allJambSubjects }) => {
	const supplementaryPutmeStoreData = useSelector(
		(state) => state.supplementaryPutmeData
	);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/supplementary_putme_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const firstSubjectData = useMemo(
		() => ({ label: "ENGLISH LANGUAGE", value: 0 }),
		[]
	);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			department: supplementaryPutmeStoreData?.programmeInfo?.department,
			regNo: supplementaryPutmeStoreData?.programmeInfo?.regNo,
			firstSubject: firstSubjectData,
			secondSubject:
				supplementaryPutmeStoreData?.programmeInfo?.secondSubject,
			thirdSubject:
				supplementaryPutmeStoreData?.programmeInfo?.thirdSubject,
			fourthSubject:
				supplementaryPutmeStoreData?.programmeInfo?.fourthSubject,
			utmeScore: supplementaryPutmeStoreData?.programmeInfo?.utmeScore
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: supplementaryPutmeProgrammeDetailsFormUrl(),
			data: {
				ApplicantId: supplementaryPutmeStoreData?.Id,
				DepartmentId: programmeInfo?.department?.value,
				SecondSubjectId: programmeInfo?.secondSubject?.value,
				ThirdSubjectId: programmeInfo?.thirdSubject?.value,
				FourthSubjectId: programmeInfo?.fourthSubject?.value,
				UtmeScore: programmeInfo?.utmeScore
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Details saved successfully",
					body: "Your programme details has been successfully saved"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SUPPLEMENTARY_PUTME,
					payload: {
						...supplementaryPutmeStoreData,
						programmeInfo
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

	useEffect(() => {
		if (errors?.utmeResultSlip) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have to upload your UTME slip!"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [errors]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>JAMB &amp; Programme Details</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="department">Department</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="department"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a department"
										searchable={true}
										id="department"
										options={allDepartments}
										isError={!!errors.department}
										errorText={
											errors.department &&
											errors.department.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="regNo">Reg No</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter registration number"
								className="w-100"
								type="text"
								id="regNo"
								name="regNo"
								register={register}
								required
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>JAMB Subject Details</span>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="firstSubject">1st Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="firstSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a 1st subject"
										searchable={true}
										id="firstSubject"
										options={firstSubjectData}
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="secondSubject">2nd Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="secondSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a second subject"
										searchable={true}
										id="secondSubject"
										options={allJambSubjects}
										isError={!!errors.secondSubject}
										errorText={
											errors.secondSubject &&
											errors.secondSubject.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="thirdSubject">3rd Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="thirdSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a third subject"
										searchable={true}
										id="thirdSubject"
										options={allJambSubjects}
										isError={!!errors.thirdSubject}
										errorText={
											errors.thirdSubject &&
											errors.thirdSubject.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="fourthSubject">4th Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="fourthSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a fourth subject"
										searchable={true}
										id="fourthSubject"
										options={allJambSubjects}
										isError={!!errors.fourthSubject}
										errorText={
											errors.fourthSubject &&
											errors.fourthSubject.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="utmeScoreId">UTME Score</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter utme score"
								className="w-100"
								type="text"
								id="utmeScore"
								name="utmeScore"
								register={register}
								error={errors.utmeScore}
								errorText={
									errors.utmeScore && errors.utmeScore.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
