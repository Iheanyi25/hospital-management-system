import { useHistory } from "react-router";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { InstitutionAttendedSchema } from "../jupebApplicationSchema";
import { useLocation } from "react-router-dom";
import { useApiPut } from "../../../../api/apiCall";
import { JUPEP_APPLICATIONS } from "../../../../store/constant";
import { addAndUpdateInstitutionUrl } from "../../../../api/urls";
import { useEffect, useState } from "react";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

export const EducationalHistory = ({ years }) => {
	const jupebData = useSelector((state) => state.jupebData);

	const { institutionAttended, Id } = useSelector((state) => state.jupebData);
	const [filteredYear, setFilteredYear] = useState([]);

	const { mutate, isLoading: isFormLoading } = useApiPut();

	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			NameOfInstitution:
				institutionAttended?.nameOfInstitution ||
				institutionAttended?.NameOfInstitution,
			DateFrom: findValueAndLabel(
				institutionAttended?.dateFrom ||
					institutionAttended?.DateFrom?.value,
				years
			),
			DateTo: findValueAndLabel(
				institutionAttended?.dateTo ||
					institutionAttended?.DateTo?.value,
				years
			),
			Certificate:
				institutionAttended?.certificate ||
				institutionAttended?.Certificate
		},
		resolver: yupResolver(InstitutionAttendedSchema)
	});

	const onSubmit = (institutionAttended) => {
		const requestBody = {
			url: addAndUpdateInstitutionUrl(Id),
			data: {
				NameOfInstitution: institutionAttended?.NameOfInstitution,
				DateFrom: institutionAttended?.DateFrom?.value,
				DateTo: institutionAttended?.DateTo?.value,
				Certificate: institutionAttended?.Certificate
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
					type: JUPEP_APPLICATIONS,
					payload: {
						...jupebData,
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
	};

	const beginDate = watch(`DateFrom`);

	useEffect(() => {
		const reducedYears = years.filter(function (value) {
			return value.value >= beginDate?.value;
		});

		setFilteredYear(reducedYears);
	}, [beginDate, years]);
	const onCountryChange = (value) => {
		setValue("DateFrom", value);
		setValue("DateTo", value);
		clearErrors("DateFrom");
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Educational History</span>}
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
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="certificateTypeId">School</label>
						</div>
						<div className="col-lg-9">
							<TextField
								placeholder="Enter institution Location"
								id={`NameOfInstitution`}
								name={`NameOfInstitution`}
								register={register}
								required
								error={errors?.NameOfInstitution}
								errorText={
									errors?.NameOfInstitution &&
									errors?.NameOfInstitution.message
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
							<Controller
								name={`DateFrom`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select start year"
										id={`DateFrom`}
										searchable={true}
										onChange={onCountryChange}
										options={years}
										isError={errors?.DateFrom}
										errorText={
											errors?.DateFrom &&
											errors?.DateFrom.message
										}
									/>
								)}
							/>
						</div>
						-
						<div className="col-lg-3">
							<Controller
								name={`DateTo`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select end year"
										searchable={true}
										options={filteredYear}
										isError={errors?.DateTo}
										errorText={
											errors?.DateTo &&
											errors?.DateTo.message
										}
										id={`DateTo`}
										disabled={!beginDate}
									/>
								)}
							/>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="certificateTypeId">
								Qualification
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								placeholder="Enter certificate obtained"
								id={`Certificate`}
								name={`Certificate`}
								register={register}
								required
								error={errors?.Certificate}
								errorText={
									errors?.Certificate &&
									errors?.Certificate.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
