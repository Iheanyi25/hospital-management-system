import { useForm } from "react-hook-form";
import { Jumbotron, Button, TextField } from "../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { InvoiceNumberSchema } from "./schema";
import ContainerStyles from "../../../../superAdmin/CourseManagement/pages/AssignCourse/style.module.css";
import { useApiPost } from "../../../../../api/apiCall";
import { sendSundryInvoiceReceiptMailUrl } from "../../../../../api/urls";

const SundryPaymentHistory = () => {
	const { mutate, isLoading } = useApiPost();

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			invoiceNumber: ""
		},
		resolver: yupResolver(InvoiceNumberSchema)
	});

	const onSubmit = (formData) => {
		const requestDet = {
			url: sendSundryInvoiceReceiptMailUrl({
				invoiceNumber: formData?.invoiceNumber
			})
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice successfully generated!",
					body: `Your payment receipt for ${formData?.invoiceNumber} has been sent to your email`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setValue("invoiceNumber", "");
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice generation failed!",
					body:
						response?.data?.message ||
						`Something went wrong while generating invoice.`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<div className={ContainerStyles.page_content}>
			<div className="w-100">
				<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
					<Jumbotron
						headerText="Payment History"
						footerContent={
							<Button
								data-cy="fetch_details"
								type="submit"
								buttonClass="primary"
								label="Send Payment Receipt"
								loading={isLoading}
							/>
						}
						footerStyle="d-flex justify-content-end"
					>
						<section className="p-4">
							<div className="row">
								<div className="col-md-12">
									<div
										className={`row align-items-center
								`}
									>
										<div className="col-lg-3 align-items-center">
											<label htmlFor="invoiceNumber">
												Reference Number
											</label>
										</div>
										<div className="d-flex col-lg-9">
											<TextField
												className="w-100"
												placeholder={
													"Enter Reference Number"
												}
												name="invoiceNumber"
												type="text"
												register={register}
												required
												error={errors.invoiceNumber}
												errorText={
													errors.invoiceNumber &&
													errors.invoiceNumber.message
												}
												id="invoiceNumber"
											/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</Jumbotron>
				</form>
			</div>
		</div>
	);
};

export default SundryPaymentHistory;
