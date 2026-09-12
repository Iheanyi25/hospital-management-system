import personIcon from "../../assets/svgs/person-circle.svg";
import time from "../../assets/svgs/time.svg";
import { Button } from "../button/Button";
import { useEffect, useState } from "react";
import "./banner.css";

export const Banner = ({
	impersonator = "Obito",
	impersonated = "Madara",
	date = "October 18, 2023",
	onEndSessionClick
}) => {
	return (
		<div className="timer_banner_container d-flex align-items-center justify-content-between">
			<div className="timer_banner_left d-flex align-items-center">
				<img src={personIcon} alt="" />
				<p className="ml-3">{`You are ${impersonator} currently impersonating ${impersonated}`}</p>
			</div>

			<div className="timer_banner_right d-flex align-items-center flex-wrap">
				<p>Session ends in</p>
				<Timer date={date} onEndSessionClick={onEndSessionClick} />
				<Button
					buttonClass={"timer_banner_btn"}
					label="End Session"
					onClick={onEndSessionClick}
				/>
			</div>
		</div>
	);
};

const Timer = ({ date, onEndSessionClick }) => {
	// const [days, setDays] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");

	// const [ended, setEnded] = useState(false);

	let interval;

	const startTimer = () => {
		const countDownDate = new Date(date).getTime();

		interval = setInterval(() => {
			const now = new Date().getTime();

			const distance = countDownDate - now;

			// const days = Math.floor(distance / (24 * 60 * 60 * 1000));
			const hours = Math.floor(
				(distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(distance % (60 * 60 * 1000)) / (1000 * 60)
			);
			const seconds = Math.floor((distance % (60 * 1000)) / 1000);

			if (distance < 0) {
				// stop timer
				
				clearInterval(interval.current);

				// setEnded(false);
			} else {
				//update the timer

				// setDays(days);
				setHours(hours);
				setMinutes(minutes);
				setSeconds(seconds);
			}
		});
	};

	useEffect(() => {
		startTimer();
	});

	useEffect(() => {
		if (!!hours && !!minutes && !!seconds) onEndSessionClick();
	}, [hours, minutes, seconds, onEndSessionClick]);

	return (
		<div className="timer_container d-flex align-item-center">
			<img src={time} alt="" />
			<p className="ml-2">
				{hours || "00"}h:{minutes || "00"}m:{seconds || "00"}s
			</p>
		</div>
	);
};
