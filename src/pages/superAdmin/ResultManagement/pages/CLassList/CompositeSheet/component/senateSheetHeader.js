import styles from "../style.module.css";

export const SenateHeader = () => {
	return (
		<>
			<h2 className="text-center h2">
				FEDERAL UNIVERSITY OF
				<br /> PETROLEUM RESOURCES, EFFURUN
			</h2>
			<div className={styles.senate_sheet_school_logo}>
				<img src={bigLogo} alt="" />
			</div>
			<h3 className="text-center h3">COLLEGE OF SCIENCE</h3>
			<h3 className="text-center h3">
				DEPARTMENT OF MATHEMATICS/COMPUTER SCIENCE
			</h3>
			<h4 className="text-center">(Mathematics Programme)</h4>
			<h1 className="text-center mt-5">SENATE FORMAT</h1>
			<div className={`row ${styles.senate_level_header}`}>
				<h3 className="col-2 m-0 p-0 text-center h3">100 LEVEL</h3>
				<main className="col-10">
					<p className="h3 font-weight-normal">
						1st Semester Results for 2018/2019 Session (Pgs. 1- 4)
					</p>
					<p className="h3 font-weight-normal">
						2nd Semester Results for 2018/2019 Session (Pgs. 5- 8)
					</p>
				</main>
			</div>

			<div className={`row ${styles.senate_level_header}`}>
				<h3 className="col-2 m-0 p-0 text-center h3">200 LEVEL</h3>
				<main className="col-10">
					<p className="h3 font-weight-normal">
						1st Semester Results for 2018/2019 Session (Pgs. 1- 4)
					</p>
					<p className="h3 font-weight-normal">
						2nd Semester Results for 2018/2019 Session (Pgs. 5- 8)
					</p>
				</main>
			</div>

			<div className={`row ${styles.senate_level_header}`}>
				<h3 className="col-2 m-0 p-0 text-center h3">300 LEVEL</h3>
				<main className="col-10">
					<p className="h3 font-weight-normal">
						1st Semester Results for 2018/2019 Session (Pgs. 1- 4)
					</p>
					<p className="h3 font-weight-normal">
						2nd Semester Results for 2018/2019 Session (Pgs. 5- 8)
					</p>
				</main>
			</div>

			<div className={`row ${styles.senate_level_header}`}>
				<h3 className="col-2 m-0 p-0 text-center h3">400 LEVEL</h3>
				<main className="col-10">
					<p className="h3 font-weight-normal">
						1st Semester Results for 2018/2019 Session (Pgs. 1- 4)
					</p>
					<p className="h3 font-weight-normal">
						2nd Semester Results for 2018/2019 Session (Pgs. 5- 8)
					</p>
				</main>
			</div>

			<h2 className="text-center mt-5 h2">
				RECOMPUTATION FOR 2ND SEMESTER OF 2017/2018 (Pgs.31-32)
			</h2>
		</>
	);
};