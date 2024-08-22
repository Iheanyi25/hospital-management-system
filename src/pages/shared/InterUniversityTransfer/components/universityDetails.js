import { useHistory } from "react-router";
import { Jumbotron, Button, TextField } from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_UNI_TRANSFER_INFO } from "../../../../store/constant";
import { updateUniversityDetailSchema } from "../uniTransferSchema";
import { useLocation } from "react-router-dom";

export const UniversityDetails = () => {
	const uniTransferState = useSelector((state) => state.uniTransferData);
	const { programmeInfo } = uniTransferState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		defaultValues: {
			presentCourseOfStudy: programmeInfo?.presentCourseOfStudy,
			presentDepartment: programmeInfo?.presentDepartment,
			presentFaculty: programmeInfo?.presentFaculty,
			presentUniversity: programmeInfo?.presentUniversity
		},
		resolver: yupResolver(updateUniversityDetailSchema)
	});

	const onSubmit = async (values) => {
		const payload = {
			presentUniversity: values?.presentUniversity,
			presentFaculty: values?.presentFaculty,
			presentDepartment: values?.presentDepartment,
			presentCourseOfStudy: values?.presentCourseOfStudy
		};
		dispatch({
			type: SAVE_UNI_TRANSFER_INFO,
			payload: {
				...uniTransferState,
				programmeInfo: { ...uniTransferState.programmeInfo, ...payload }
			}
		});
		replace({ hash: "#section_c", state });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Candidate’s University Details</span>}
				footerContent={
					<Button
						data-cy="submit_uni_details"
						label="Next"
						buttonClass="primary"
						type="submit"
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="presentUniversity">
								Present University
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter present university"
								type="text"
								id="presentUniversity"
								name="presentUniversity"
								register={register}
								required
								error={errors.presentUniversity}
								errorText={
									errors.presentUniversity &&
									errors.presentUniversity.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="presentFaculty">Faculty</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter present faculty"
								type="text"
								id="presentFaculty"
								name="presentFaculty"
								register={register}
								required
								error={errors.presentFaculty}
								errorText={
									errors.presentFaculty &&
									errors.presentFaculty.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="presentDepartment">
								Department
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter present department"
								type="text"
								id="presentDepartment"
								name="presentDepartment"
								register={register}
								required
								error={errors.presentDepartment}
								errorText={
									errors.presentDepartment &&
									errors.presentDepartment.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="presentCourseOfStudy">
								Course of Study
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter present course of study"
								type="text"
								id="presentCourseOfStudy"
								name="presentCourseOfStudy"
								register={register}
								required
								error={errors.presentCourseOfStudy}
								errorText={
									errors.presentCourseOfStudy &&
									errors.presentCourseOfStudy.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
