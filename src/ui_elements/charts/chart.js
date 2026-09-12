import { Bar, Doughnut } from "react-chartjs-2";

export const Chart = ({ type, backgrounds, stepSize, chartData, aspectRatio }) => {
	const labels = chartData?.map((data) => Object.values(data)?.[0]);

	const values = chartData?.map((data) => Object.values(data)?.[1]);

	const info = {
		labels: labels,
		datasets: [
			{
				// label: "Applications",
				data: values,
				backgroundColor: backgrounds,
				borderWidth: 1
			}
		]
	};
	const options = {
        aspectRatio: aspectRatio,
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					borderDash: [4, 4]
				},
				ticks: {
					stepSize: stepSize
				}
			},
			x: {
				grid: {
					borderDash: [4, 4]
				}
			}
		},

		plugins: {
			legend: {
				display: false
			}
		}
	};

	const doughnutOptions = {
		responsive: true,
		scales: {
			y: {
				display: false
			},
			x: {
				display: false
			}
		},

		plugins: {
			legend: {
				display: false
			}
		}
	};

	if (type === "doughnut") {
		return <Doughnut data={info} options={doughnutOptions} />;
	} else {
		return <Bar data={info} options={options} />;
	}
};
