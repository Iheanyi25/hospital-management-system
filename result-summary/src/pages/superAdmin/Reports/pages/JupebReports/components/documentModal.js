import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { Button } from "../../../../../../ui_elements";
import styles from "../style.module.css";
export const DocumentModal = ({ data }) => {
	return (
		<div className={styles.modal_content}>
			<Tabs id="default">
				<div className="my-2">
					<TabList>
						<Tab>Birth Certificate</Tab>
						<Tab>O-level</Tab>
						<Tab>Signature</Tab>
					</TabList>
				</div>
				<TabPanel>
					<ImagePanel
						image={data?.birthCertificate}
						fullName={data?.fullName}
						label="Download Cerificate"
					/>
				</TabPanel>
				<TabPanel>
					<ImagePanel
						image={data?.olevel}
						fullName={data?.fullName}
						label="Download Result"
					/>
				</TabPanel>
				<TabPanel>
					<ImagePanel
						image={data?.signature}
						fullName={data?.fullName}
						label="Download Signature"
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
};

const ImagePanel = ({ image, fullName, label }) => (
	<div className="w-100">
		<div className="d-flex justify-content-end">
			<a href={image} download={`${fullName} Signature`}>
				<Button
					data-cy="download-image"
					label={label}
					buttonClass="primary"
				/>
			</a>
		</div>
		<div
			className={`d-flex justify-content-center w-100 ${styles.image_container}`}
		>
			<img src={image} alt={`${image} img`} />
		</div>
	</div>
);

