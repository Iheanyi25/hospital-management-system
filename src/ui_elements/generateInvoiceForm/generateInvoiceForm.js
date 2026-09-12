import React from "react";
import "./generateInvoiceForm.css";
import { Jumbotron, TextField, Button } from "../../ui_elements";

export const GenerateInvoiceForm = ({ details, onClick, loading }) => {
	return (
		<div>
			<Jumbotron
				headerText="Generate Invoice"
				footerContent={
					<Button
						data-cy="gen_invoice"
						label="Generate"
						buttonClass="primary"
						type="button"
						onClick={onClick}
						loading={loading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<form>
					{details?.map((detail, index) => (
						<div className="container-fluid px-4 my-4" key={index}>
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label className="text-bold">
										{detail.title}
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										className="w-100"
										placeholder="Enter value"
										type="text"
										value={detail.value}
										disabled
									/>
								</div>
							</div>
						</div>
					))}
				</form>
			</Jumbotron>
		</div>
	);
};
