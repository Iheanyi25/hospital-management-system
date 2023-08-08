import React from "react";
import { Controller } from "react-hook-form";
import { Button, SMSelect, Jumbotron } from "../../../../../../ui_elements";

export const Form = ({
	control,
	errors,
	allRoles,
	setFilter,
	handleSubmit,
	isLoadingUserList
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			roleName: formData.roleName.value
		}));
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Users"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_records"
						type="submit"
						buttonClass="primary"
						label="View records"
						loading={isLoadingUserList}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="roleName"
									>
										Roles
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="roleName"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="roleName"
												placeholder="Select a role"
												options={[...allRoles]}
												searchable={true}
												disabled={!allRoles}
												isError={!!errors.roleName}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
