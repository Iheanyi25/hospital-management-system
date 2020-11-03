import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminUpdatePatientProfile from "../Pages/Admin/UpdatePatientProfile";
import AdminPreConsultation from "../Pages/Admin/PreConsultation";
import AdminAllDoctors from "../Pages/Admin/AllDoctors";
import AdminAppointments from "../Pages/Admin/Appointments";
import AdminBookAppointment from "../Pages/Admin/BookAppointment";
import AdminDoctorAppointments from "../Pages/Admin/DoctorAppointments";
import AdminBookConsultation from "../Pages/Admin/BookConsultation";
import AdminConsultationQueue from "../Pages/Admin/ConsultationQueue";
import AddPatient from '../Pages/Admin/AddPatient.js';
import AdminDoctorConsultationQueue from "../Pages/Admin/DoctorConsultationQueue";
import { AdminLayout } from '../Components/Layout';
import ManageServiceRequest from '../Pages/Admin/Util_Services/ManageServiceRequest';
import CreateServiceRequest from '../Pages/Admin/Util_Services/CreateServiceRequest';
import AllPatients from '../Pages/Admin/AllPatients';

// service utils
import CreateService from "../Pages/Admin/Util_Services/CreateService";
import ServiceCategory from "../Pages/Admin/Util_Services//ServiceCategory";
import ManageServiceCategory from '../Pages/Admin/Util_Services//ManageServiceCategory';
import ManageServices from '../Pages/Admin/Util_Services//ManageServices';
import EditServiceCategory from '../Pages/Admin/Util_Services//EditServiceCategory';
import EditService from '../Pages/Admin/Util_Services//EditService';

// ward utils
import CreateWard from '../Pages/Admin/Util_Ward/CreateWard';
import EditWard from '../Pages/Admin/Util_Ward/EditWard';
import ManageWards from "../Pages/Admin/Util_Ward/ManageWards";

// health-plan utils
import CreateHealthPlan from "../Pages/Admin/Util_HealtlPlans/CreateHealthPlan";
import EditHealthPlan from "../Pages/Admin/Util_HealtlPlans/EditHealthPlan";
import ManageHealthPlans from "../Pages/Admin/Util_HealtlPlans/ManageHealthPlans";
import SelectHealthPlan from '../Pages/Admin/SelectHealthPlan';

export default function AdminRoutes() {
    return (
        <BrowserRouter basename="admin" >
            <AdminLayout>
                <Switch>

                    <Route exact path="/AdminDashboard" component={AdminDashboard} />
                    <Route exact path="/AdminUpdatePatientProfile/:id" component={AdminUpdatePatientProfile} />
                    <Route exact path="/AdminPreConsultation/:id" component={AdminPreConsultation} />
                    <Route exact path="/AdminAllPatients" component={AllPatients} />
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
                    <Route exact path="/AdminCreateWard" component={CreateWard} />
                    <Route exact path="/AdminEditWard/:id" component={EditWard} />
                    <Route exact path="/AdminManageWards" component={ManageWards} />
                    <Route exact path="/AdminCreateHealthPlan" component={CreateHealthPlan} />
                    <Route exact path="/AdminEditHealthPlan/:id" component={EditHealthPlan} />
                    <Route exact path="/AdminManageHealthPlans" component={ManageHealthPlans} />
                    <Route exact path="/AdminAddPatients" component={AddPatient} />
                    <Route exact path="/AdminSelectHealthPlan" component={SelectHealthPlan} />
                    <Route exact path="/AdminManageServiceRequests" component={ManageServiceRequest} />
                    <Route exact path="/AdminServiceRequests" component={CreateServiceRequest} />

                    <Route exact path="*" render={() => <Redirect to="/AdminDashboard" />} />

                </Switch>
            </AdminLayout>
        </BrowserRouter >
    )
}