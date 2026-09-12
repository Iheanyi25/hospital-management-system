import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../../store/constant";
import { useApiPost } from "../../../../api/apiCall";
import { hndNdDetailsFormUrl } from "../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { NDDetailsSchema } from "../hndSchema";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

export const NDDetails = ({ allSessions }) => {
	const putmeStoreData = useSelector((state) => state.putmeData);
	const { personalInfo, ndDetailsInfo } = putmeStoreData;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/hnd_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			schoolAttended: ndDetailsInfo?.schoolAttended,
			yearOfGraduation:
				findValueAndLabel(
					ndDetailsInfo?.yearOfGraduation?.value ||
						ndDetailsInfo?.yearOfGraduation,
					allSessions
				) || null,
			cgpa: ndDetailsInfo?.cgpa,
			courseStudied: ndDetailsInfo?.courseStudied
		},
		resolver: yupResolver(NDDetailsSchema)
	});

	const onSubmit = (ndDetailsInfo) => {
		const requestBody = {
			url: hndNdDetailsFormUrl(),
			data: {
				ApplicantId: personalInfo?.postUtmeApplicantBasicInformationId,
				YearOfGraduationId: ndDetailsInfo?.yearOfGraduation?.value,
				CGPA: ndDetailsInfo?.cgpa,
				CourseStudied: ndDetailsInfo?.courseStudied,
				SchoolAttended: ndDetailsInfo?.schoolAttended
			}
		};
		mutate(requestBody, {
			onSuccess: ({ data }) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "ND-Details saved successfully",
					body: "That would be all!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_PUTME_INFO,
					payload: {
						...putmeStoreData,
						ndDetailsInfo
					}
				});
				replace({
					pathname: "/hnd_application_details",
					state: { fromLogin: true, details: data?.data }
				});
			},
			onError: (error) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: `${error.response.data.message}`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="ND Details"
				endText="Step 4 of 4"
				footerContent={
					<div>
						<Button
							data-cy="back"
							label="Previous"
							buttonClass="secondary"
							type="button"
							disabled={isFormLoading}
							onClick={() =>
								replace({ hash: "#section_c", state })
							}
						/>
						<Button
							data-cy="submit_personal"
							label="Submit"
							buttonClass="primary"
							type="submit"
							disabled={isFormLoading}
							loading={isFormLoading}
						/>
					</div>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="schoolAttended">
								School Attended *
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter school attended"
								className="w-100"
								type="text"
								id="schoolAttended"
								name="schoolAttended"
								register={register}
								error={!!errors.schoolAttended}
								errorText={
									errors.schoolAttended &&
									errors.schoolAttended.message
								}
								required
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="thirdSubject">
								Year of graduation *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="yearOfGraduation"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select year of graduation"
										searchable={true}
										id="yearOfGraduation"
										options={allSessions}
										isError={!!errors.yearOfGraduation}
										errorText={
											errors.yearOfGraduation &&
											errors.yearOfGraduation.message
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
							<label htmlFor="regNo">CGPA *</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter CGPA number"
								className="w-100"
								type="text"
								id="cgpa"
								name="cgpa"
								error={!!errors.cgpa}
								errorText={errors.cgpa && errors.cgpa.message}
								register={register}
								required
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="courseStudied">
								Course Studied *
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter course studied"
								className="w-100"
								type="text"
								id="courseStudied"
								name="courseStudied"
								error={!!errors.courseStudied}
								errorText={
									errors.courseStudied &&
									errors.courseStudied.message
								}
								register={register}
								required
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
