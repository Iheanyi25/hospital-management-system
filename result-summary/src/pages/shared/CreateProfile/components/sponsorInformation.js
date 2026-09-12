import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { SAVE_STUDENT_DATA } from "../../../../store/constant";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { SponsorDetailsSchema } from "../profileSchema";
import { memo } from "react";

export const SponsorInformation = memo(({ allSponsorRelationships }) => {
	const studentState = useSelector((state) => state.studentData);
	const { Sponsor } = studentState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();
	const {
		register,
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			Fullname: Sponsor?.Fullname,
			Address: Sponsor?.Address,
			PhoneNo: Sponsor?.PhoneNo,
			Email: Sponsor?.Email,
			Relationship: Sponsor?.Relationship
		},
		resolver: yupResolver(SponsorDetailsSchema)
	});
	const onSubmit = (Sponsor) => {
		dispatch({
			type: SAVE_STUDENT_DATA,
			payload: {
				...studentState,
				Sponsor,
				isSponsorValid: true
			}
		});
		replace({ hash: "#section_c", state });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Your sponsor
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_spons"
						label="Next"
						buttonClass="primary"
						type="submit"
						// loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sponsor_name">
								Sponsor's Fullname
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="sponsor_name"
								autoComplete="off"
								placeholder="Enter sponsor's full name"
								className="w-100"
								type="text"
								name="Fullname"
								register={register}
								error={errors.Fullname}
								errorText={
									errors.Fullname && errors.Fullname.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="sponsor_address">
								Sponsor's Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="sponsor_address"
								autoComplete="off"
								placeholder="Enter sponsor's address"
								className="w-100"
								inputType="textarea"
								name="Address"
								register={register}
								error={errors.Address}
								errorText={
									errors.Address && errors.Address.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sponsor_number">
								Sponsor's Mobile No
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="sponsor_number"
								className="w-100"
								placeholder="Enter sponsor's phone number"
								type="text"
								name="PhoneNo"
								register={register}
								error={errors.PhoneNo}
								errorText={
									errors.PhoneNo && errors.PhoneNo.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sponsor_email">
								Sponsor's Email
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="sponsor_email"
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								name="Email"
								register={register}
								error={errors.Email}
								errorText={errors.Email && errors.Email.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="Relationship">Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Relationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={allSponsorRelationships}
										searchable={false}
										id="Relationship"
										{...field}
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
			</Jumbotron>
		</form>
	);
});
