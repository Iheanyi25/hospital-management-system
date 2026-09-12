import React from 'react'
import { useParams } from 'react-router-dom'
import PatientHealthHistoryContainer from '../Components/PatientHistory/PatientHealthHistoryContainer'


export default function ViewPatientHealthHistory() {
    const {id } = useParams()
    console.log(id)
    return <PatientHealthHistoryContainer patientId={id}/>
}
