import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import { birthdayImage } from "../../assets/images/cdnLinks";
import "./happyBirthday.css";

export const HappyBirthday = () => {
	const [width, setWidth] = useState(null);
	const [height, setHeight] = useState(null);
	const confettiRef = useRef(null);
	const [renderImage, setImage] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		setHeight(confettiRef.current.clientHeight);
		setWidth(confettiRef.current.clientWidth);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setImage(true);
		}, 2000);
	}, []);

	return (
		<>
			{show && (
				<div
					onClick={() => setShow(false)}
					className="confetti_container"
					ref={confettiRef}
				>
					<Confetti
						numberOfPieces={400}
						width={width}
						height={height}
					/>
					{renderImage && (
						<img
							className="birthday_text"
							src={birthdayImage}
							alt="happy birthday"
						/>
					)}
				</div>
			)}
		</>
	);
};
