import { SCHOOL_DETAILS } from "../../utils/constants";
import "./footer.css";
const { name } = SCHOOL_DETAILS;

export const Footer = () => {
	const date = new Date();
	return (
		<div className="footer_container d-flex flex-column align-items-center justify-content-center">
			<p className="call_centre_number">Need help?  <span>-</span> <span>08139833300</span></p>
			<p className="text-center">
				{`${name} ©️ ${date.getFullYear()}`}
			</p>
		</div>
	);
};
