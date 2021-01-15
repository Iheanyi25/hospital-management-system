import React from 'react'
import { ClarkingHistory } from '../../Components/Clarking';

const ClarkingHist = (props) => {

    const { id, firstName, lastName } = props.location.state;

    return (
        <div className="row justify-content-center mt-5 w-75 mx-auto">
            <div className="col-md-12">
                <div className="card border-light">
                    <ClarkingHistory patientDetails={{ id, firstName, lastName }} />
                </div>
            </div>
        </div>
    )
}

export default ClarkingHist;