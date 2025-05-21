import { Info } from "../../assets/svgs";
import close from "../../assets/svgs/whiteCancel.svg";
import "./messageBox.css";

export const MessageBox = ({ title, message, closeMessage, openModal }) => {
	return (
		<div className="messageBox_container d-flex align-items-start">
			<Info />
			<div className="messageBox_text">
				<h5>{title}</h5>
				<p>
					<span>{message}</span>
				</p>
			</div>
			<div className="messageBox_spacer"></div>
			<div className="messageBox_button_container">
				<button onClick={openModal} className="messageBox_button">
					Read more
				</button>
				<button
					onClick={() => closeMessage(false)}
					className="close_btn"
				>
					<img src={close} alt="" />
				</button>
			</div>
		</div>
	);
};
