import React from "react";
import { SMSelect } from "../../../../ui_elements";
import { Controller } from "react-hook-form";
import styles from "../style.module.css";

export const NCEQualification = ({
	oLevelGrades,
	allYears,
	oLevelSubjects,
	control,
	errors
}) => {
	return (
		<>
			<div className="container-fluid my-4">
				<p className={styles.welcome_text}>
					i. Details of N.C.E. Qualifications :
				</p>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="d-flex d-flex align-items-center col-lg-3">
						<label htmlFor="educationTheory.grade">
							Education Theory *
						</label>
					</div>
					<div className={`d-flex col-lg-9`}>
						<div className="col-lg-6 pl-0">
							<Controller
								name={`educationTheory.gradeId`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select grade obtained"
										searchable={true}
										id={`educationTheory.grade`}
										options={oLevelGrades}
										error={
											errors?.educationTheory &&
											errors?.educationTheory?.gradeId
										}
										errorText={
											errors?.educationTheory &&
											errors?.educationTheory?.gradeId &&
											errors?.educationTheory?.gradeId
												.message
										}
									/>
								)}
							/>
						</div>
						<div className="col-lg-6 pr-0">
							<Controller
								name={`educationTheory.year`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select year obtained"
										id={`educationTheory.year`}
										options={allYears}
										searchable={true}
										required
										error={
											errors?.educationTheory &&
											errors?.educationTheory?.year
										}
										errorText={
											errors?.educationTheory &&
											errors?.educationTheory?.year &&
											errors?.educationTheory?.year
												.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="d-flex d-flex align-items-center col-lg-3">
						<label htmlFor="educationPractice.grade">
							Education Practice *
						</label>
					</div>
					<div className={`d-flex col-lg-9`}>
						<div className="col-lg-6 pl-0">
							<Controller
								name={`educationPractice.gradeId`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select grade obtained"
										searchable={true}
										id={`educationPractice.grade`}
										options={oLevelGrades}
										error={
											errors?.educationPractice &&
											errors?.educationPractice?.gradeId
										}
										errorText={
											errors?.educationPractice &&
											errors?.educationPractice
												?.gradeId &&
											errors?.educationPractice?.gradeId
												.message
										}
									/>
								)}
							/>
						</div>
						<div className="col-lg-6 pr-0">
							<Controller
								name={`educationPractice.year`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select year obtained"
										id={`educationPractice.year`}
										options={allYears}
										searchable={true}
										required
										error={
											errors?.educationPractice &&
											errors?.educationPractice?.year
										}
										errorText={
											errors?.educationPractice &&
											errors?.educationPractice?.year &&
											errors?.educationPractice?.year
												.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid my-4 mt-5">
				<p className={styles.welcome_text}>
					Add Two Additional Subjects
				</p>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3  d-flex align-items-center">
						<label htmlFor="nCEQualifications.0.subject">
							Subject 1 *
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name={`nCEQualifications.0.subjectId`}
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Select subject"
									searchable={true}
									id={`nCEQualifications.0.subjectId`}
									options={oLevelSubjects}
									error={
										errors?.nCEQualifications &&
										errors?.nCEQualifications[0]?.subjectId
									}
									errorText={
										errors?.nCEQualifications &&
										errors?.nCEQualifications[0]
											?.subjectId &&
										errors?.nCEQualifications[0]?.subjectId
											.message
									}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 mt-4 mb-3">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="nCEQualifications.0.grade">
							Grade Obtained *
						</label>
					</div>
					<div className="col-lg-9 d-flex align-items-center">
						<div className="w-100">
							<Controller
								name={`nCEQualifications.0.gradeId`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select grade obtained"
										searchable={true}
										id={`nCEQualifications.0.grade`}
										options={oLevelGrades}
										error={
											errors?.nCEQualifications &&
											errors?.nCEQualifications[0]
												?.gradeId
										}
										errorText={
											errors?.nCEQualifications &&
											errors?.nCEQualifications[0]
												?.gradeId &&
											errors?.nCEQualifications[0]
												?.gradeId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 mt-4 mb-3">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="nCEQualifications.0.year">
							Year Obtained *
						</label>
					</div>
					<div className="col-lg-9 d-flex align-items-center">
						<div className="w-100">
							<Controller
								name={`nCEQualifications.0.year`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select year"
										searchable={true}
										id={`nCEQualifications.0.year`}
										options={allYears}
										error={
											errors?.nCEQualifications &&
											errors?.nCEQualifications[0]?.year
										}
										errorText={
											errors?.nCEQualifications &&
											errors?.nCEQualifications[0]
												?.year &&
											errors?.nCEQualifications[0]?.year
												.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-5">
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="nCEQualifications.1.subject">
								Subject 2 *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name={`nCEQualifications.1.subjectId`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select subject"
										searchable={true}
										id={`nCEQualifications.1.subject`}
										options={oLevelSubjects}
										error={
											errors?.nCEQualifications &&
											errors?.nCEQualifications[1]
												?.subjectId
										}
										errorText={
											errors?.nCEQualifications &&
											errors?.nCEQualifications[1]
												?.subjectId &&
											errors?.nCEQualifications[1]
												?.subjectId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="nCEQualifications.1.grade">
								Grade Obtained *
							</label>
						</div>
						<div className="col-lg-9 d-flex align-items-center">
							<div className="w-100">
								<Controller
									name={`nCEQualifications.1.gradeId`}
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select grade obtained"
											searchable={true}
											id={`nCEQualifications.1.grade`}
											options={oLevelGrades}
											error={
												errors?.nCEQualifications &&
												errors?.nCEQualifications[1]
													?.gradeId
											}
											errorText={
												errors?.nCEQualifications &&
												errors?.nCEQualifications[1]
													?.gradeId &&
												errors?.nCEQualifications[1]
													?.gradeId.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="nCEQualifications.1.year">
								Year Obtained *
							</label>
						</div>
						<div className="col-lg-9 d-flex align-items-center">
							<div className="w-100">
								<Controller
									name={`nCEQualifications.1.year`}
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select year"
											searchable={true}
											id={`nCEQualifications.1.year`}
											options={allYears}
											error={
												errors?.nCEQualifications &&
												errors?.nCEQualifications[1]
													?.year
											}
											errorText={
												errors?.nCEQualifications &&
												errors?.nCEQualifications[1]
													?.year &&
												errors?.nCEQualifications[1]
													?.year.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
