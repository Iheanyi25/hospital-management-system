import { useState } from "react";
import Modal from "react-modal";
import RatingStars from "./components/ratingStars";
import close from "../../assets/svgs/cancel.svg";
import logo from "../../assets/images/sideLogo.png";
import styles from "./style.module.css";
import { Button } from "..";
import { useApiPost } from "../../api/apiCall";
import { createRatingUrl } from "../../api/urls";
import { DISPLAY_CSAT_MODAL, SCHOOL_DETAILS } from "../../utils/constants";
import { useCookies } from "react-cookie";

const initialState = { rating: 0, comment: "" };
const FeedbackModal = ({ isOpen, onClose }) => {
	const setCookie = useCookies([DISPLAY_CSAT_MODAL])[1];
	const [formData, setFormData] = useState(initialState);

	const { mutate: createRating, isLoading } = useApiPost();

	const handleClose = () => {
		setFormData(initialState);
		onClose();
	};

	const handleChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const requestDet = {
			url: createRatingUrl(),
			data: formData
		};
		createRating(requestDet, {
			onSuccess: () => {
				setCookie(DISPLAY_CSAT_MODAL, JSON.stringify(false));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Thank You!",
					body: "Your input helps us improve and serve you better!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Rating Action Failed!",
					body: response?.data?.message || `Coudn't submit rating!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={handleClose}
			className={styles.modal_wrapper}
			overlayClassName="myoverlay"
			closeTimeoutMS={500}
		>
			<div style={{ width: "840px" }} className="modal_body">
				<div className={styles.modal_header}>
					<div className={styles.img_container}>
						<img
							src={logo}
							alt={SCHOOL_DETAILS.nameWithoutCampus + " logo"}
						/>
					</div>
					<button
						onClick={handleClose}
						className="btn btn-sm border-0 bg-transparent"
						aria-label="Close"
					>
						<img src={close} alt="" />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className={styles.rating_modal_body}>
						<h2 className={styles.rating_title}>
							Rate your experience in the last 3 months
						</h2>
						<p className={styles.rating_subtitle}>
							How would you rate your experience?
						</p>

						<RatingStars
							onChange={handleChange}
							rating={formData?.rating}
						/>

						<div className="d-flex flex-column mt-4">
							<label
								htmlFor="comment"
								className={styles.rating_label}
							>
								Tell us more about your experience{" "}
								<span className="text-muted">(optional)</span>
							</label>
							<textarea
								id="comment"
								className={styles.rating_textarea}
								rows={4}
								value={formData?.comment}
								onChange={(e) =>
									handleChange("comment", e.target.value)
								}
								placeholder="Share your thoughts here..."
							/>
						</div>
					</div>

					<div className="modal-footer d-flex justify-content-end p-3 border-top">
						<Button
							data-cy="submit_rating"
							label="Submit"
							buttonClass="primary"
							type="submit"
							loading={isLoading}
							disabled={!formData?.rating}
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default FeedbackModal;
