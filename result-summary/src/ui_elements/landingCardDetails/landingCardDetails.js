import React from "react";
import "./landingCardDetails.css";
import { LandingLink } from "../landingLink/landingLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const LandingCardDetails = ({ info }) => {
	const location = useLocation();
	const [activeHash, setActiveHash] = useState(location.hash);
	useEffect(() => {
		setActiveHash(location.hash);
	}, [location.hash]);

	switch (activeHash) {
		case "#undergraduate":
			return (
				<div className="infoDetails">
					<h6>{info[0]?.descriptionTitle}</h6>
					<h5>{info[0]?.descriptionBody}</h5>{" "}
					<ul>
						{info[0]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<h5>
						Application commences on September 1, 2023 and closes on
						September 30, 2023.{" "}
						<a style={{display:"inline"}}
							href="https://smcore.blob.core.windows.net/futo/putme_2023.pdf"
							target="_blank"
							rel="noreferrer"
						>
							More...
						</a>
					</h5>
					{info[0]?.links?.map(
						({ linkTitle, route, isExternal }, index) =>
							!isExternal ? (
								<LandingLink key={index} route={route}>
									{linkTitle}
								</LandingLink>
							) : (
								<a
									href={route}
									target="_blank"
									rel="noreferrer"
								>
									{linkTitle}
								</a>
							)
					)}
				</div>
			);
		case "#jupeb":
			return (
				<div className="infoDetails">
					<h6>{info[1]?.descriptionTitle}</h6>
					<h5>{info[1]?.descriptionBody}</h5>
					<ul>
						{info[1]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					{info[1]?.links?.map(({ linkTitle, route }, index) => (
						<LandingLink key={index} route={route}>
							{linkTitle}
						</LandingLink>
					))}
				</div>
			);
		case "#direct_entry":
			return (
				<div className="infoDetails">
					<h6>{info[2]?.descriptionTitle}</h6>
					<h5>{info[2]?.descriptionBody}</h5>
					<ul>
						{info[2]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					{info[2]?.links?.map(({ linkTitle, route }, index) => (
						<LandingLink key={index} route={route}>
							{linkTitle}
						</LandingLink>
					))}
				</div>
			);
		case "#supplementary":
			return (
				<div className="infoDetails">
					<h6>{info[3]?.descriptionTitle}</h6>
					<h5>{info[3]?.descriptionBody}</h5>
					<ul>
						{info[3]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					{info[3]?.links?.map(({ linkTitle, route }, index) => (
						<LandingLink key={index} route={route}>
							{linkTitle}
						</LandingLink>
					))}
				</div>
			);
		// case "#supplementary_putme":
		//     return (
		//         <div className='infoDetails'>
		//             <h6>{info[4]?.descriptionTitle}</h6>
		//             <h5>{info[4]?.descriptionBody}</h5>
		//             <ul>
		//                 {info[4]?.listItem?.map((item, index) =>
		//                     <li key={index}>
		//                         {item}
		//                     </li>
		//                 )}
		//             </ul>
		//             {
		//                 info[4]?.links?.map(({ linkTitle, route }, index) =>
		//                     <LandingLink
		//                         key={index}
		//                         route={route}
		//                     >
		//                         {linkTitle}
		//                     </LandingLink>
		//                 )
		//             }
		//         </div>
		//     )
		case "#postgraduate":
			return (
				<div className="infoDetails">
					<h6>{info[4]?.descriptionTitle}</h6>
					<h5>{info[4]?.descriptionBody}</h5>
					<ul>
						{info[4]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					{info[4]?.links?.map(({ linkTitle, route }, index) => (
						<LandingLink key={index} route={route}>
							{linkTitle}
						</LandingLink>
					))}
				</div>
			);
		case "#pre_degree":
			return (
				<div className="infoDetails">
					<h6>{info[5]?.descriptionTitle}</h6>
					<h5>{info[5]?.descriptionBody}</h5>
					<ul>
						{info[5]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					{info[5]?.links?.map(({ linkTitle, route }, index) => (
						<LandingLink key={index} route={route}>
							{linkTitle}
						</LandingLink>
					))}
				</div>
			);
		case "#cce":
			return (
				<div className="infoDetails">
					<h6>{info[6]?.descriptionTitle}</h6>
					<h5>{info[6]?.descriptionBody}</h5>
					<ul>
						{info[6]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					{info[6]?.links?.map(({ linkTitle, route }, index) => (
						<LandingLink key={index} route={route}>
							{linkTitle}
						</LandingLink>
					))}
				</div>
			);
		default:
			return (
				<div className="infoDetails">
					<h6>{info[0]?.descriptionTitle}</h6>
					<h5>{info[0]?.descriptionBody}</h5>
					<ul>
						{info[0]?.listItem?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<h5>
						Application commences on September 1, 2023 and closes on
						September 30, 2023.{" "}
						<a style={{display:"inline"}}
							href="https://smcore.blob.core.windows.net/futo/putme_2023.pdf"
							target="_blank"
							rel="noreferrer"
						>
							More...
						</a>
					</h5>
					{info[0]?.links?.map(
						({ linkTitle, route, isExternal }, index) =>
							!isExternal ? (
								<LandingLink key={index} route={route}>
									{linkTitle}
								</LandingLink>
							) : (
								<a
									href={route}
									target="_blank"
									rel="noreferrer"
								>
									{linkTitle}
								</a>
							)
					)}
				</div>
			);
	}
};
