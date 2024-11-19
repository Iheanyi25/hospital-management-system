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
import { SAVE_SUPPLEMENTARY_INFO } from "../../../../store/constant";
import { ProgrammeDetailsSchema } from "../supplementarySchema";
import { useApiPost } from "../../../../api/apiCall";
import { supplementaryPersonalDetailsFormUrl } from "../../../../api/urlCategories/SupplementaryApplication";
export const ProgrammeDetails = ({ allDepartments }) => {
	const supplementaryStoreData = useSelector(
		(state) => state.supplementaryData
	);

	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/supplementary_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			faculty: supplementaryStoreData?.programmeInfo?.faculty,
			department: supplementaryStoreData?.programmeInfo?.department,
			option: supplementaryStoreData?.programmeInfo?.option,
			regNo: supplementaryStoreData?.programmeInfo?.regNo,
			utmeScore: supplementaryStoreData?.programmeInfo?.utmeScore,
			courseShoppingInto:
				supplementaryStoreData?.programmeInfo?.courseShoppingInto
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: supplementaryPersonalDetailsFormUrl(),
			data: {
				JambNumber: supplementaryStoreData?.programmeInfo?.regNo,
				RRR: supplementaryStoreData?.programmeInfo?.rrr,
				DepartmentId: programmeInfo?.courseShoppingInto.value,
				DepartmentOptionId: programmeInfo?.option?.value,
				FacultyId: supplementaryStoreData?.programmeInfo?.faculty?.value
			}
		};
		mutate(requestBody, {
			onSuccess: ({ data }) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Details saved successfully",
					body: "Your programme details has been successfully saved"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_SUPPLEMENTARY_INFO,
					payload: {
						...supplementaryStoreData,
						programmeInfo
					}
				});
				replace({
					pathname: "/supplementary_application_details",
					state: { fromLogin: true, details: data?.data }
				});
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>JAMB &amp; Programme Details</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Submit"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
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

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="courseShoppingIntoId">
								Course Shopping Into
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="courseShoppingInto"
								control={control}
								rules={{ required: true }}
								render={({ field: { value, onChange } }) => (
									<SMSelect
										value={value}
										onChange={onChange}
										placeholder="Select a course"
										searchable={true}
										disabled={false}
										id="courseShoppingId"
										options={allDepartments}
										isError={!!errors?.courseShoppingInto}
										errorText={
											errors?.courseShoppingInto &&
											errors?.courseShoppingInto.message
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
