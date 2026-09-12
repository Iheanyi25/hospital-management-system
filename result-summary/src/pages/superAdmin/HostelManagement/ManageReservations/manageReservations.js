import * as yup from "yup";
import { Controller } from "react-hook-form";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { getSearchRequest, useApiPut } from "../../../../api/apiCall";
import {
	deactiveHostelReservationUrl,
	getAllHostelsUrl
} from "../../../../api/urls";
import {
	AsyncMultiSelect,
	Button,
	Jumbotron,
	PageTitle
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";

const Schema = yup.object().shape({
	hostelId: yup.mixed().required("please select a hostel")
});

const ManageRservations = () => {
	const { mutate, isLoading } = useApiPut();

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(Schema)
	});

	const onSubmit = (value) => {
		const requestDet = {
			url: deactiveHostelReservationUrl(),
			data: {
				HostelId: value.hostelId.value
			}
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Reservations Cleared!"
					// body:
					// 	data?.data?.data || "You successfully reserved cleared!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Reservations Clearing Failed!"
					// body: response?.data?.message || `Bedspace wasn't assigned!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PageTitle title="Manage Hostel Reservations" />

			<div className="mt-5">
				<Jumbotron
					headerText={"Delete Hostel Reservations"}
					footerContent={
						<div className="d-flex align-items-center justify-content-end">
							<Button
								onSubmit={onSubmit}
								loading={isLoading}
								label="Submit"
								type="submit"
							/>
						</div>
					}
				>
					<div className="p-5">
						<div className="col-md-6 p">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="studentType"
									>
										Hostel
									</label>
								</div>
								<div className=" col-lg-9">
									<Controller
										name="hostelId"
										control={control}
										rules={{
											required: true
										}}
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
							</div>
						</div>
					</div>
				</Jumbotron>
			</div>
		</form>
	);
};

export default ManageRservations;
