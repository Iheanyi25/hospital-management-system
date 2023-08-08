import React from "react";
import { Badge } from "../../ui_elements";
import "./style.css";

function UserHeader({ userInfo, headerClass, Buttons }) {
	return (
		<div className={`${headerClass}`}>
			<div className="w-100 d-flex justify-content-between align-items-center">
				<div className="d-flex">
					<h4 className="text-capitalize">{`${userInfo?.first_name} ${userInfo?.last_name}`}</h4>
					<div className="px-3 ml-5">
						<Badge
							item={
								userInfo?.isVerified
									? { title: "Verified", type: "success" }
									: { title: "Unverified", type: "warning" }
							}
						/>
					</div>
				</div>
				<div>{Buttons}</div>
			</div>
		</div>
	);
}

export { UserHeader };
