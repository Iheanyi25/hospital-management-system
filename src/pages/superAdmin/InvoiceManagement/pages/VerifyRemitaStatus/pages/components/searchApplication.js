import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, Jumbotron, TextField } from "../../../../../../../ui_elements";
import styles from "../style.module.css";

export const schema = yup.object().shape({
	rrr: yup
		.string()
		.matches(/^\d+$/, "RRR must contain only numbers")
		.required("Please input your RRR")
});

export const SearchApplication = ({ setMakeRequest, isLoading, setRrr }) => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = (data) => {
		const { rrr } = data;

		setRrr(rrr);
		setMakeRequest(true);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.page_content}>
			<Jumbotron
				headerText="Verify Remita Status"
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
					<div className="row">
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
										placeholder="Enter Reference Number"
										name="rrr"
										register={register}
										type="text"
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
