import { useEffect } from "react";
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
import { SAVE_PUTME_INFO } from "../../../../store/constant";
import { ProgrammeDetailsSchema } from "../putmeSchema";
import { useApiPost } from "../../../../api/apiCall";
import { putmeProgrammeDetailsFormUrl } from "../../../../api/urls";

export const ProgrammeDetails = ({ allDepartments, allDepartmentOptions }) => {
	const putmeStoreData = useSelector((state) => state.putmeData);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/putme_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			faculty: putmeStoreData?.programmeInfo?.faculty,
			department: putmeStoreData?.programmeInfo?.department,
			option: putmeStoreData?.programmeInfo?.option,
			altDepartment: putmeStoreData?.programmeInfo?.altDepartment,
			regNo: putmeStoreData?.programmeInfo?.regNo,
			firstSubject: putmeStoreData?.programmeInfo?.firstSubject,
			secondSubject: putmeStoreData?.programmeInfo?.secondSubject,
			thirdSubject: putmeStoreData?.programmeInfo?.thirdSubject,
			fourthSubject: putmeStoreData?.programmeInfo?.fourthSubject,
			utmeScore: putmeStoreData?.programmeInfo?.utmeScore,
			utmeResultSlip: putmeStoreData?.programmeInfo?.utmeResultSlip
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: putmeProgrammeDetailsFormUrl(),
			data: {
				JambNumber: programmeInfo?.regNo,
				AltDepartmentId: programmeInfo?.altDepartment.value,
				DepartmentOptionId: programmeInfo?.option?.value
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
					type: SAVE_PUTME_INFO,
					payload: {
						...putmeStoreData,
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
							<label htmlFor="facultyId">Faculty</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="faculty"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a faculty"
										searchable={true}
										id="facultyId"
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
							<label htmlFor="departmentId">Department</label>
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
										id="departmentId"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{allDepartmentOptions?.length > 0 ? (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="departmentId">Option</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="option"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="choose option"
											searchable={true}
											id="optionId"
											options={allDepartmentOptions}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				) : (
					""
				)}
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="altDepartmentId">
								Alternative Department
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="altDepartment"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select an alternative department"
										searchable={false}
										options={allDepartments}
										isError={errors?.altDepartment}
										errorText={
											errors?.altDepartment &&
											errors?.altDepartment?.message
										}
										id="altDepartmentId"
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
							<label htmlFor="firstSubjectId">1st Subject</label>
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
										id="firstSubjectId"
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
							<label htmlFor="secondSubjectId">2nd Subject</label>
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
										id="secondSubjectId"
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
							<label htmlFor="thirdSubjectId">3rd Subject</label>
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
										id="thirdSubjectId"
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
							<label htmlFor="fourthSubjectId">4th Subject</label>
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
										id="fourthSubjectId"
										disabled
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
								id="utmeScoreId"
								name="utmeScore"
								register={register}
								required
								disabled
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
