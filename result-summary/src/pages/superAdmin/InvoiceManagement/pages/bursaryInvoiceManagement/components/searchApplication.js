import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, Jumbotron, TextField } from "../../../../../../ui_elements";

import styles from "../style.module.css";

export const schema = yup.object().shape({
	invoiceCode: yup.string().required("please input your invoice code")
});

export const SearchApplication = ({
	setInvoiceCode,
	setMakeRequest,
	isLoading
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const onSubmit = (data) => {
		const { invoiceCode } = data;
		setInvoiceCode(invoiceCode);
		setMakeRequest(true);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.page_content}>
			<Jumbotron
				headerText="Delete Invoice"
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
										htmlFor="invoiceCode"
									>
										Invoice Code
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										placeholder="Input invoice code"
										name="invoiceCode"
										register={register}
										autoComplete="off"
										error={errors.invoiceCode}
										errorText={
											errors.invoiceCode &&
											errors.invoiceCode.message
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
