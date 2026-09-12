import styles from "./referralCard.module.css"


export const ReferralCard = ({ step, instruction, detail }) => {
    return (
        <div className={`${styles.container} mb-3`}>
            <div>
                {step}
            </div>
            <h6>{instruction}</h6>
            <p>{detail}</p>
        </div>
    )
}
