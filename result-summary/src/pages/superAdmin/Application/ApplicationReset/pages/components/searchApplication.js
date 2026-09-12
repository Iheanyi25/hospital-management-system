import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
	SMSelect,
	Button,
	Jumbotron,
	TextField
} from "../../../../../../ui_elements";

import styles from "../style.module.css";

export const schema = yup.object().shape({
	applicationTypeId: yup.mixed().required("please select application type"),
	rrr: yup.string().required("please input your Reference Number")
});

export const SearchApplication = ({
	setRrr,
	setApplicationTypeId,
	setMakeRequest,
	setEmptyState,
	isLoading,
	applicationTypes
}) => {
	const {
		handleSubmit,
		setValue,
		control,
		register,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const onSubmit = (data) => {
		const { rrr, applicationTypeId } = data;
		setRrr(rrr);
		setApplicationTypeId(applicationTypeId?.value);
		setMakeRequest(true);
		setEmptyState(false);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.page_content}>
			<Jumbotron
				headerText="Reset Application"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="fetch_details"
						type="submit"
						buttonClass="primary"
						label="Submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row gy-3">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="applicationTypeId"
									>
										Application Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="applicationTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												placeholder="Select Application Type"
												id="applicationTypeId"
												options={applicationTypes}
												onChange={(data) =>
													setValue(
														"applicationTypeId",
														data?.length > 0
															? data
															: null
													)
												}
												{...field}
												isError={
													!!errors.applicationTypeId
												}
												errorText={
													errors.applicationTypeId &&
													errors.applicationTypeId
														.message
												}
												required
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className=" col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="rrr"
									>
										Reference Number
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										placeholder="Input Reference Number"
										name="rrr"
										register={register}
										autoComplete="off"
										error={errors.rrr}
										errorText={
											errors.rrr && errors.rrr.message
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
