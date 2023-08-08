import React from "react";
import { ErrorPageIcon } from "../../assets/svgs";
import { Button } from "../button/Button";
import "./errorPage.css";

export const ErrorPage = () => {
	return (
		<div className="container ">
			<div className="row d-flex justify-content-center align-items-center vh-100">
				<div className="col-sm-7">
					<div className="text-box">
						<h1 className="mb-3 error_page_title">
							Something went wrong
						</h1>
						<div className="description mb-4">
							<p className="mb-3 lh-2 error_page_text">
								Sorry about the inconvenience you can contact
								our support, the page you are looking for does
								not exist or has been removed.
							</p>
						</div>
						<Button label="Contact support" buttonClass="primary" />
					</div>
				</div>
				<div className="col-sm-3 text-center">
					<ErrorPageIcon className="error_img_size " />
				</div>
			</div>
		</div>
	);
};
