import { useState, useEffect } from "react";
import img from "../../assets/svgs/menu-btn.svg";
import "./buttonDropdown.css";

export const ButtonDropdown = ({ buttonGroup }) => {
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		// handles closing of the drop down
		const handleCloseAction = () => {
			if (toggle) {
				setToggle(false); 
			}
		};
		window.addEventListener("click", handleCloseAction);
		return () => window.removeEventListener("click", handleCloseAction);
	}, [toggle]);

	return (
		<div className="btn_drop_down_container">
			<button onClick={() => setToggle(!toggle)} className="btn_dropdown">
				<img src={img} alt="" />
			</button>

			{toggle && (
				<div className="drop_down_menu">
					{buttonGroup?.map((btn, i) => (
						<p key={i} onClick={btn?.onClick}>
							{btn?.name}
						</p>
					))}
				</div>
			)}
		</div>
	);
};
