import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	PageTitle,
	Button,
	Jumbotron,
	SMSelect,
	Spinner
} from "../../../../../ui_elements";
import { SEMESTERS } from "../../../../../utils/constants";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import styles from "./style.module.css";
import { getAllSessionsUrl } from "../../../../../api/urls";

const FilterRecords = () => {
	const history = useHistory();
	const { data: sessions, isLoading } = useApiGet(getAllSessionsUrl());
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting }
	} = useForm();
	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	const onSubmit = (data) => {
		history.push({
			pathname: "/records/view",
			state: data
		});
	};

	return (
		<section>
			<div className="row">
				<div className="col-12 col-md-1"></div>
				<div className="col-12 col-md-10">
					<header className="mt-2">
						<PageTitle title="Results and Class List" />
					</header>
					<main className={styles.page_content}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Jumbotron
								headerText="Filter to view records"
								footerContent={
									<Button
										data-cy="submit"
										type="submit"
										buttonClass="primary"
										label="Submit"
										loading={isSubmitting}
									/>
								}
								footerStyle="d-flex justify-content-end"
							>
								<section className="p-4">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												className="font-weight-bold"
												htmlFor="session"
											>
												Academic Session
											</label>
										</div>

										<div className="col-lg-9">
											{isLoading ? (
												<Spinner />
											) : (
												<Controller
													name="session"
													control={control}
													rules={{ required: true }}
													render={({ field }) => (
														<SMSelect
															{...field}
															id="session"
															options={
																allSessions
															}
															placeholder="Select Academic Session"
															searchable={false}
															isError={
																!!errors.session
															}
														/>
													)}
												/>
											)}
										</div>
									</div>
									<div className="row mt-5">
										<div className="col-lg-3  d-flex align-items-center">
											<label
												className="font-weight-bold"
												htmlFor="semester"
											>
												Semester
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="semester"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="semester"
														placeholder="Select Semester"
														options={SEMESTERS}
														searchable={false}
														isError={
															!!errors.semester
														}
													/>
												)}
											/>
										</div>
									</div>
								</section>
							</Jumbotron>
						</form>
					</main>
				</div>
			</div>
		</section>
	);
};

export default FilterRecords;
