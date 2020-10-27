import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminUpdatePatientProfile from "../Pages/Admin/UpdatePatientProfile";
import AdminPreConsultation from "../Pages/Admin/PreConsultation";
import AdminAllPatients from "../Pages/Admin/AllPatients";
import AdminAllDoctors from "../Pages/Admin/AllDoctors";
import AdminAppointments from "../Pages/Admin/Appointments";
import AdminBookAppointment from "../Pages/Admin/BookAppointment";
import AdminDoctorAppointments from "../Pages/Admin/DoctorAppointments";
import AdminBookConsultation from "../Pages/Admin/BookConsultation";
import AdminConsultationQueue from "../Pages/Admin/ConsultationQueue";
import AdminDoctorConsultationQueue from "../Pages/Admin/DoctorConsultationQueue";
import CreateService from "../Pages/Admin/Util_Services/CreateService";
import ServiceCategory from "../Pages/Admin/Util_Services//ServiceCategory";
import { AdminLayout } from '../Components/Layout';
import ManageServiceCategory from '../Pages/Admin/Util_Services//ManageServiceCategory';
import ManageServices from '../Pages/Admin/Util_Services//ManageServices';
import EditServiceCategory from '../Pages/Admin/Util_Services//EditServiceCategory';
import EditService from '../Pages/Admin/Util_Services//EditService';

export default function AdminRoutes() {
    return (
        <BrowserRouter basename="admin" >
            <AdminLayout>
                <Switch>

                    <Route exact path="/AdminDashboard" component={AdminDashboard} />
                    <Route exact path="/AdminUpdatePatientProfile/:id" component={AdminUpdatePatientProfile} />
                    <Route exact path="/AdminPreConsultation/:id" component={AdminPreConsultation} />
                    <Route exact path="/AdminAllPatients" component={AdminAllPatients} />
                    <Route exact path="/AdminAllDoctors" component={AdminAllDoctors} />
                    <Route exact path="/AdminBookAppointment/:doctorId" component={AdminBookAppointment} />
                    <Route exact path="/AdminAppointments" component={AdminAppointments} />
                    <Route exact path="/AdminDoctorAppointments/:doctorId" component={AdminDoctorAppointments} />
                    <Route exact path="/AdminBookConsultation/:doctorId" component={AdminBookConsultation} />
                    <Route exact path="/AdminConsultationQueue" component={AdminConsultationQueue} />
                    <Route exact path="/AdminDoctorConsultationQueue/:doctorId" component={AdminDoctorConsultationQueue} />
                    <Route exact path="/AdminCreateService" component={CreateService} />
                    <Route exact path="/AdminEditService/:id" component={EditService} />
                    <Route exact path="/AdminManageServices" component={ManageServices} />
                    <Route exact path="/AdminServiceCategory" component={ServiceCategory} />
                    <Route exact path="/AdminEditServiceCategory/:id" component={EditServiceCategory} />
                    <Route exact path="/AdminManageServiceCategory" component={ManageServiceCategory} />


                    <Route exact path="*" render={() => <Redirect to="/AdminDashboard" />} />

                </Switch>
            </AdminLayout>
        </BrowserRouter >
    )
}