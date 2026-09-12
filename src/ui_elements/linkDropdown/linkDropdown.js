import { useHistory } from "react-router-dom";
import chevron_down from "../../assets/svgs/chevron-down.svg";
import "./linkDropdown.css";

export const LinkDropdown = ({ buttonGroup, linkName, className }) => {
	const { push } = useHistory();

	return (
		<div className={`dropdown btn_group_dropdown_container ${className}`}>
			<button
				class="border-0 d-flex align-items-center btn_dropdown"
				type="button"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<p className="global-landing-page-links m-0">{linkName}</p>
				<img src={chevron_down} alt="" />
			</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				{buttonGroup?.map((btn, i) => (
					<p
						className="text-left hover_state"
						role={"button"}
						key={i}
						onClick={() => push(btn?.link)}
					>
						{btn?.name}
					</p>
				))}
			</div>
		</div>
	);
};
