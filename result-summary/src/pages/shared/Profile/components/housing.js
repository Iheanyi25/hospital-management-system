import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApiEdit } from "../../../../api/apiCall";
import { getUserProfileUrl, updateStaffProfileUrl } from "../../../../api/urls";
import {
	Jumbotron,
	SMSelect,
	TextField,
	Button
} from "../../../../ui_elements";
import { formatDateFromAPI } from "../../../../utils/formatDate";
import { trimItem } from "../../../../utils/trimItem";
import { housingDetailsSchema } from "./schema";

export const Housing = ({ data, allAccomodations, allCampusUrl }) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();
	const [onCampus, setOnCampus] = useState("");

	const {
		watch,
		register,
		setValue,
		clearErrors,
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			WorkOnCampusId: {
				value: data.workOnCampusId,
				label: data.workOnCampus
			},
			AccomodationTypeId: {
				value: data.accommodationTypeId,
				label: data.accommodationType
			},
			CampusLocationId: {
				value: data.campusLocationId,
				label: data.campusLocation
			},
			Address: data.address,
			LandlordName: data.landlordName,
			HouseType: data.houseType,
			HouseNumber: data.houseNumber,
			BoysQuaterNumber: data.boysQuatersNumber,
			DateOccupied:
				data?.dateOccupied && formatDateFromAPI(data?.dateOccupied)
		},
		resolver: yupResolver(housingDetailsSchema),
		context: {
			offCampus: onCampus === "off",
			onCampus: onCampus === "on"
		}
	});

	const watchData = watch({
		AccomodationTypeId: "AccomodationTypeId"
	});

	useEffect(() => {
		watchData?.AccomodationTypeId?.value === 1
			? setOnCampus("off")
			: watchData?.AccomodationTypeId?.value === 2
			? setOnCampus("on")
			: setOnCampus("");
	}, [watchData?.AccomodationTypeId?.value]);

	const onCurrentAccomodationChange = (value) => {
		setValue("AccomodationTypeId", value);
		setValue("CampusLocationId", null);
		setValue("Address", null);
		setValue("LandlordName", null);
		setValue("HouseType", null);
		setValue("HouseNumber", null);
		setValue("BoysQuaterNumber", null);
		setValue("DateOccupied", null);
		clearErrors("AccomodationTypeId");
	};

	const onSubmit = (values) => {
		const requestData = [];
		const {
			WorkOnCampusId,
			AccomodationTypeId,
			Address,
			LandlordName,
			CampusLocationId,
			HouseType,
			HouseNumber,
			BoysQuaterNumber,
			DateOccupied,
			...editedValues
		} = values;
		const newObj = {
			...editedValues,
			WorkOnCampusId: WorkOnCampusId.value,
			AccommodationTypeId: AccomodationTypeId.value,
			...(watchData?.AccomodationTypeId?.value === 1 && {
				CampusLocationId: CampusLocationId.value,
				Address,
				LandlordName
			}),
			...(watchData?.AccomodationTypeId?.value === 2 && {
				HouseType,
				HouseNumber,
				BoysQuatersNumber: BoysQuaterNumber,
				DateOccupied
			})
		};
		Object.keys(newObj).map((item) =>
			requestData.push({
				op: "replace",
				path: `/${item}`,
				value: trimItem(newObj[item])
			})
		);
		const requestBody = {
			url: updateStaffProfileUrl(),
			data: requestData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getUserProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_g");
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
				headerText={"Housing Details"}
				footerStyle="d-flex justify-content-end"
				footerContent={
					<>
						<Button
							data-cy="submit_housing_details"
							label="Next"
							buttonClass="primary"
							type="submit"
							loading={isLoading}
						/>
					</>
				}
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="WorkOnCampusId">
								Do you work officially on campus between
								4pm-6pm? *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="WorkOnCampusId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="WorkOnCampusId"
										placeholder="Choose an option"
										name="WorkOnCampusId"
										options={[
											{
												value: "1",
												label: "Yes"
											},
											{ value: "2", label: "No" }
										]}
										searchable={false}
										isError={!!errors.WorkOnCampusId}
										errorText={
											errors.WorkOnCampusId &&
											errors.WorkOnCampusId.message
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
							<label htmlFor="AccomodationTypeId">
								Current Accommodation Type *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="AccomodationTypeId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="AccomodationTypeId"
										placeholder="Choose an option"
										name="AccomodationTypeId"
										options={allAccomodations}
										searchable={false}
										onChange={onCurrentAccomodationChange}
										isError={!!errors.AccomodationTypeId}
										errorText={
											errors.AccomodationTypeId &&
											errors.AccomodationTypeId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{onCampus === "off" && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="CampusLocationId">
										Location *
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="CampusLocationId"
										control={control}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="CampusLocationId"
												placeholder="Choose an option"
												name="CampusLocationId"
												options={allCampusUrl}
												searchable={false}
												isError={
													!!errors.CampusLocationId
												}
												errorText={
													errors.CampusLocationId &&
													errors.CampusLocationId
														.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="PensionNumber">
										Address *
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										id="Address"
										className="w-100"
										placeholder="Enter your Address"
										type="text"
										name="Address"
										register={register}
										error={errors.Address}
										errorText={
											errors.Address &&
											errors.Address.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="LandlordName">
										Name of Landlord
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										id="LandlordName"
										className="w-100"
										placeholder="Enter your landlord name"
										type="text"
										name="LandlordName"
										register={register}
										error={errors.LandlordName}
										errorText={
											errors.LandlordName &&
											errors.LandlordName.message
										}
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{onCampus === "on" && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="HouseType">
										House Type *
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="HouseType"
										className="w-100"
										placeholder="e.g 3 Bedroom bungalow with a study"
										type="text"
										name="HouseType"
										register={register}
										error={errors.HouseType}
										errorText={
											errors.HouseType &&
											errors.HouseType.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="HouseNumber">
										House Number *
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										id="HouseNumber"
										className="w-100"
										placeholder="Enter your house number"
										type="text"
										name="HouseNumber"
										register={register}
										error={errors.HouseNumber}
										errorText={
											errors.HouseNumber &&
											errors.HouseNumber.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="BoysQuaterNumber">
										Number of Boys Quarters
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										id="BoysQuaterNumber"
										className="w-100"
										placeholder="Enter number of boys quaters"
										type="text"
										name="BoysQuaterNumber"
										register={register}
										error={errors.BoysQuaterNumber}
										errorText={
											errors.BoysQuaterNumber &&
											errors.BoysQuaterNumber.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="DateOccupied">
										Date moved into
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										id="DateOccupied"
										className="w-100"
										placeholder="Enter Date moved into"
										type="date"
										name="DateOccupied"
										register={register}
										error={errors.DateOccupied}
										errorText={
											errors.DateOccupied &&
											errors.DateOccupied.message
										}
									/>
								</div>
							</div>
						</div>
					</>
				)}
			</Jumbotron>
		</form>
	);
};
