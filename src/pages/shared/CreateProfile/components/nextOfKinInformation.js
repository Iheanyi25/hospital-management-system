import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextOfKinDetailsSchema } from "../profileSchema";
import { SAVE_STUDENT_DATA } from "../../../../store/constant";

export const NextOfKinInformation = ({ relationships }) => {
	const studentState = useSelector((state) => state.studentData);
	const { NextOfKin } = studentState;
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
			Fullname: NextOfKin?.Fullname,
			Address: NextOfKin?.Address,
			PhoneNo: NextOfKin?.PhoneNo,
			Email: NextOfKin?.Email,
			Relationship: NextOfKin?.Relationship
		},
		resolver: yupResolver(NextOfKinDetailsSchema)
	});
	const onSubmit = (NextOfKin) => {
		dispatch({
			type: SAVE_STUDENT_DATA,
			payload: {
				...studentState,
				NextOfKin,
				isNextOfKinValid: true
			}
		});
		replace({ hash: "#section_d", state });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Next of Kin
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_next_of_kin"
						label="Next"
						buttonClass="primary"
						type="submit"
						// loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="fullname">
								Next of Kin's fullname
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="fullname"
								autoComplete="off"
								placeholder="Enter next of Kin's full name"
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
							<label htmlFor="address">
								Next of Kin's Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="address"
								autoComplete="off"
								placeholder="Enter Next of Kin's address"
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
							<label htmlFor="mobileNo">
								Next of Kin's Mobile No
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="mobileNo"
								className="w-100"
								placeholder="Enter Next of Kin's phone number"
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
							<label htmlFor="email">Next of Kin's Email</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="email"
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
							<label htmlFor="relationship">Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Relationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={relationships}
										searchable={false}
										id="relationship"
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
};
