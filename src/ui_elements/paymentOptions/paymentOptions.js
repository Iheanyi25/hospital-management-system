import paymentImg from "../../assets/svgs/payment.svg";
import "./paymentOptions.css";

export const PaymentOptions = () => {
	return (
		<div
			className={`d-flex justify-content-center mt-2 invoice_form_img_container`}
		>
			<img src={paymentImg} alt="Payment" />
		</div>
	);
};
