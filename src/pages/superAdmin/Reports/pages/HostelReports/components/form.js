import { Controller } from "react-hook-form";
import styles from "../style.module.css";
import {
	Button,
	Jumbotron,
	TextField,
	OptionalIndicator,
	AsyncMultiSelect
} from "../../../../../../ui_elements";
import { formatInputDate } from "../../../../../../utils/formatDate";
import { RedCancel } from "../../../../../../assets/svgs";
import { useRef } from "react";
import { getSearchRequest } from "../../../../../../api/apiCall";
import { getAllHostelsUrl } from "../../../../../../api/urls";

export const Form = ({
	control,
	errors,
	allDepartments,
	register,
	setFilter,
	handleSubmit,
	facultyState,
	setValue,
	isDepartmentLoading,
	dateFrom,
	isLoadingReports
}) => {
	const ref = useRef();
	function formatHostel({ hostels, value, hostelName }) {
		return hostels?.length > 0
			? hostels.map((course) => {
					return {
						value: course[value],
						label: `${course[hostelName]}`
					};
			  })
			: [];
	}
	const apiOptions = async (query) => {
		const data = await getSearchRequest({
			queryKey: getAllHostelsUrl({ searchTerm: query })
		});
		return formatHostel({
			hostels: data.data.items,
			hostelName: "name",
			value: "id"
		});
	};
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			hostelId: formData?.hostelId?.value,
			hostelName: formData?.hostelId?.label,
			dateFrom: formData?.dateFrom,
			dateTo: formData?.dateTo
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Reports"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_sundry_reports"
						type="submit"
						buttonClass="primary"
						label="View Reports"
						loading={isLoadingReports}
						disabled={isDepartmentLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="sessionId"
									>
										Hostel
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="hostelId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<AsyncMultiSelect
												placeholder="Search by hostel name"
												id="hostelId"
												apiOptions={apiOptions}
												isMulti={false}
												isClearable
												defaultOptions
												{...field}
												onChange={(data) =>
													setValue("hostelId", data)
												}
												ref={ref}
												isError={!!errors.hostelId}
												required
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() => {
											ref?.current?.clearValue();
											setValue("sessionId", null);
										}}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="dateFrom"
									>
										Date{" "}
										<OptionalIndicator text="(Begin - End)" />
									</label>
								</div>
								<div className="col-lg-4 mb-3 mb-lg-0">
									<TextField
										type="date"
										name="dateFrom"
										register={register}
										id="dateFrom"
										required
										error={errors.dateFrom}
										max={formatInputDate(new Date())}
									/>
								</div>

								<div className="col-lg-4">
									<TextField
										type="date"
										name="dateTo"
										register={register}
										id="dateTo"
										required
										disabled={!dateFrom}
										min={dateFrom}
										max={formatInputDate(new Date())}
										error={errors.dateTo}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() => {
											setValue("dateFrom", null);
											setValue("dateTo", null);
										}}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
