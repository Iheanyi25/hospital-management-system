import React from "react";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Checkbox,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_APPLICATION_DATA } from "../../../../store/constant";
import { StaffDetailsSchema } from "../staffRequestSchema";
import { useApiPost } from "../../../../api/apiCall";
import { staffRequestStaffDetailsFormUrl } from "../../../../api/urls";

const DECLARATION_STYLE = Object.freeze({
	backgroundColor: "#deebff",
	padding: "10px 0px"
});

export const StaffDetails = ({
	allDepartments,
	allRelationships,
	fromDirectEntryState
}) => {
	const [declaration, setDeclaration] = React.useState(false);
	const { basicInformationResponse } = useSelector(
		(state) => state.staffRequestData
	);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/staff_request_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {},
		resolver: yupResolver(StaffDetailsSchema)
	});

	const onSubmit = ({
		Fullname,
		NumberOfYearsServed,
		EntryDate,
		Relationship,
		Department,
		StaffNumber
	}) => {
		const requestBody = {
			url: staffRequestStaffDetailsFormUrl(),
			data: {
				Fullname,
				JambNumber: basicInformationResponse?.JambNumber,
				Department,
				EntryDate,
				RelationshipId: Relationship.value,
				NumberOfYearsServed,
				StaffNumber
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application form completed",
					body: "That would be all!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: CLEAR_APPLICATION_DATA
				});
				replace({
					pathname: "/staff_request_application/preview",
					state: { details: basicInformationResponse?.JambNumber }
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
				headerText={
					<span>Staff Details (To be completed by staff)</span>
				}
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
							<label htmlFor="Fullname">
								Staff Name <CompulsoryIndicator />
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter full name"
								className="w-100"
								type="text"
								id="Fullname"
								name="Fullname"
								register={register}
								required
								error={errors.Fullname}
								errorText={
									errors.Fullname && errors.Fullname.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="Department">
								Department <CompulsoryIndicator />
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter a Department"
								className="w-100"
								type="text"
								id="Department"
								name="Department"
								register={register}
								required
								error={errors.Department}
								errorText={
									errors.Department &&
									errors.Department.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="EntryDate">
								Date of First Appointment to UNN{" "}
								<CompulsoryIndicator />
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								name="EntryDate"
								register={register}
								id="EntryDate"
								required
								error={errors.EntryDate}
								errorText={
									errors.EntryDate && errors.EntryDate.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="Relationship">
								Relationship to Candidate{" "}
								<CompulsoryIndicator />
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Relationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose relationship"
										options={allRelationships}
										searchable={false}
										id="Relationship"
										isError={!!errors.Relationship}
										errorText={
											errors.Relationship &&
											errors.Relationship.message
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
							<label htmlFor="NumberOfYearsServed">
								No of Years Served <CompulsoryIndicator />
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter number of years served"
								className="w-100"
								type="text"
								id="NumberOfYearsServed"
								name="NumberOfYearsServed"
								register={register}
								required
								error={errors.NumberOfYearsServed}
								errorText={
									errors.NumberOfYearsServed &&
									errors.NumberOfYearsServed.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="StaffNumber">
								Staff File No <CompulsoryIndicator />
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter staff file no"
								className="w-100"
								type="text"
								id="StaffNumber"
								name="StaffNumber"
								register={register}
								required
								error={errors.StaffNumber}
								errorText={
									errors.StaffNumber &&
									errors.StaffNumber.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="mt-5 mb-3 px-4">
					<h3 className="mb-3">Declaration</h3>
					<div style={DECLARATION_STYLE}>
						<Checkbox
							id="declaration"
							label="I certify that the information given in this form is, to the best of my knowledge and belief, correct and complete"
							labelClassName="ml-4"
							checked={declaration}
							value={declaration}
							onSelect={() => setDeclaration(!declaration)}
							required
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
