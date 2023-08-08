import { SCHOOL_DETAILS } from "../../utils/constants";
import "./footer.css";
const { name } = SCHOOL_DETAILS;

export const Footer = () => {
	const date = new Date();
	return (
		<div className="footer_container d-flex align-items-center justify-content-center">
			<p className="text-center">
				{`${name} ©️ ${date.getFullYear()}`}
			</p>
		</div>
	);
};
