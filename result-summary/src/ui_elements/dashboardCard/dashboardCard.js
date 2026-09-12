import "./dashboardCard.css";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardCard = ({ img, title, value, isFetching }) => {
	return (
		<motion.div
			className="dashboard_card"
			style={{
				filter: isFetching ? "blur(5px)" : "none"
			}}
			animate={{
				transition: {
					type: "spring",
					stiffness: 100
				},
				initial: {
					visibility: "hidden",
					x: -25
				},
				animate: {
					visibility: "visible",
					x: 5
				}
			}}
		>
			<AnimatePresence exitBeforeEnter={true}>
				<img src={img} alt="card" />
				<p className="dahboard_card_title">{title}</p>
				<h3 className="dashboard_card_value">
					<h3 className="dashboard_card_value">{value}</h3>
				</h3>
			</AnimatePresence>
		</motion.div>
	);
};
