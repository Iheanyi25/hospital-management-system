import { GlobalMenu } from "../../../ui_elements";
import style from "./style.module.css";
import pg_banner from "../../../assets/images/pg_banner.png";
import { ArrowUp } from "../../../assets/svgs";

const date = new Date();

const PostGraduateLandingPage = () => {
	return (
		<>
			<GlobalMenu isPg isLanding={"unAuthenticated"} />
			<div
				className={`${style.post_graduate_banner_container} d-flex align-items-center justify-content-center`}
			>
				<h1 className="text-center">
					Welcome to College of Postgraduate Studies, University of
					Nigeria, Nsukka.
				</h1>
			</div>
			<div
				className={`${style.post_graduate_bottom_container} d-flex justify-content-between align-items-start`}
			>
				<div className={style.post_graduate_bottom_text_container}>
					<h2>About CPGS</h2>
					<p className="mt-3">
						The College of Postgraduate Studies, University of
						Nigeria, Nsukka, (UNN), Bedrock of recurrent culture of
						Academic Excellence, offers Postgraduate programmes in
						Diploma, Masters and Doctorate Degree programmes.
					</p>

					<h2 className="mt-5">Application Exam Information</h2>
					<p className="mt-3">
						<p>Kindly note the following:</p>
						<ul>
							<li>
								The exam will be an online computer based test.
							</li>
							<li>
								Your username/password is your PG application
								number (all in CAPS).
							</li>
							<li>
								You will require stable internet and a
								webcam-enabled laptop.
							</li>
							<li>
								Ensure that you are in a well-lit room to aid
								facial recognition.
							</li>
							<li>
								To access the exam, you be required to fill in
								your email address as it is on your application
								form.
							</li>
							<li>
								The Screening Exams will run from 10am till 4pm
								on a date communicated to the applicants.
							</li>
							<li>
								<span>Click here</span> to access the exam.
							</li>
						</ul>
					</p>
				</div>
				<div className={style.pg_banner_container}>
					<img src={pg_banner} alt="" />
				</div>
			</div>
			<footer
				className={`d-flex align-items-center justify-content-center mt-5 ${style.home_footer}`}
			>
				<p>
					{`Copyright©️ ${date.getFullYear()} All rights reserved by University of
					Nigeria Nsukka. Powered by Tenece`}
				</p>
				<div
					className={`${style.fab} d-flex align-items-center justify-content-center`}
					onClick={() =>
						window.scrollTo({
							top: 0,
							behavior: "smooth"
						})
					}
				>
					<ArrowUp />
				</div>
			</footer>
		</>
	);
};

export default PostGraduateLandingPage;
