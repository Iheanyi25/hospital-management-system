import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Spinner } from "../../../../../../ui_elements";

export const PaymentReportsChart = ({ reports, loading, outputTitle }) => {
	const [chartData, setChartData] = useState({});
	const chart = useCallback(() => {
		if (reports?.length > 0) {
			const labels = [];
			const data = [];
			reports.forEach((key) => {
				labels.push(key.group);
				data.push(key.numberOfStudents);
			});
			setChartData({
				labels,
				datasets: [
					{
						label: "Number of Students",
						axis: "y",
						data,
						backgroundColor: "#0263FF",
						borderColor: "#0263FF",
						borderWidth: 1
					}
				]
			});
		}
	}, [reports]);
	useEffect(() => {
		chart();
	}, [reports, chart]);
	return (
		<div className="mb-5">
			{loading && <Spinner />}
			{reports?.length <= 0 && !loading && (
				<div className="d-flex justify-content-center">
					<h5>No Information to display chart</h5>
				</div>
			)}
			{reports?.length > 0 && !loading && (
				<>
					<h5>{outputTitle}</h5>
					<Bar
						data={chartData}
						options={{
							responsive: true,
							indexAxis: "y",
							title: { text: "THICCNESS SCALE", display: true },
							plugins: {
								legend: {
									labels: {
										font: {
											size: 14,
											family: "CircularStd"
										}
									}
								}
							},
							scales: {
								yAxes: [
									{
										gridLines: {
											display: false
										},
										ticks: {
											beginAtZero: true
										}
									}
								]
							}
						}}
					/>
				</>
			)}
		</div>
	);
};
