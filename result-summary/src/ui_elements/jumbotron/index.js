import React from "react";
import "./jumbotron.css";

function Jumbotron({
	headerText,
	endText,
	headerContainer,
	children,
	footerContent,
	footerStyle,
	borderClasses
}) {
	return (
		<section
			className={`${
				borderClasses ? borderClasses : ""
			} border rounded-lg jumbotron-container`}
		>
			<div className="border-bottom px-4 py-3 jumbotron-header">
				{headerContainer ? (
					headerContainer
				) : (
					<div className="d-flex justify-content-between">
						<h6 className="jumbo-header text-capitalize">
							{headerText}
						</h6>
						{endText && (
							<h6 className="jumbo-header">
								{endText}
							</h6>
						)}
					</div>
				)}
			</div>
			<div className="jumbotron-content">{children}</div>
			{footerContent ? (
				<div
					className={`border-top px-4 py-3 jumbotron-footer ${footerStyle}`}
				>
					{footerContent}
				</div>
			) : (
				""
			)}
		</section>
	);
}

export { Jumbotron };
