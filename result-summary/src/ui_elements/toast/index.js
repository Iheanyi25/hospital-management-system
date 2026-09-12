import cancel from "../../assets/svgs/cancel.svg";
import approved from "../../assets/svgs/approved.svg";

import "./style.css";

const Toast = ({ message, setToast }) => {
	return (
		<div className="toast_container">
			<img src={approved} alt={""} />
			<main className="toast_text_container">
				<p className="toast_container_header">{message?.header}</p>
				<p className="toast_container_description">{message?.message}</p>
			</main>
			<div className="toast_spacer"></div>
			<img onClick={() => setToast(null)} src={cancel} alt={""} />
		</div>
	);
};

export { Toast };
