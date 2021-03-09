import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LabLayout } from "../Components/Layout";
import Dashboard from "../Pages/Lab/Dashboard";
import CreateService from "../Pages/Admin/Util_Services/CreateService";
import ManageServices from "../Pages/Admin/Util_Services//ManageServices";
import EditService from "../Pages/Admin/Util_Services//EditService";
import ServiceCategory from "../Pages/Admin/Util_Services//ServiceCategory";
import ManageServiceCategory from "../Pages/Admin/Util_Services//ManageServiceCategory";
import EditServiceCategory from "../Pages/Admin/Util_Services//EditServiceCategory";
import CreateServiceRequest from "../Pages/Admin/Util_Services/CreateServiceRequest";
import ManageServiceRequest from "../Pages/Admin/Util_Services/ManageServiceRequest";
import ServiceRequestContents from "../Pages/Admin/Util_Services/ServiceRequestContents";
import ServiceRequestResultUpload from "../Pages/Admin/Util_Services/UploadServiceRequestResult";
import ViewLabResults from "../Pages/Admin/Util_Services/ViewLabResults";
import ViewLabProfile from "../Pages/Lab/ViewLabProfile";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
import ManageServiceRequests from "../Components/Admissions/MangeServiceRequests";

export default function LabRoutes() {
  return (
    <BrowserRouter basename="lab">
      <LabLayout>
        <Switch>
          <Route exact path="/LabDashboard" component={Dashboard} />
          <Route exact path="/LabProfile" component={ViewLabProfile} />
          <Route exact path="/LabCreateService" component={CreateService} />
          <Route exact path="/LabManageServices" component={ManageServices} />
          <Route exact path="/LabEditService/:id" component={EditService} />
          <Route exact path="/LabServiceCategory" component={ServiceCategory} />
          <Route
            exact
            path="/LabManageServiceCategory"
            component={ManageServiceCategory}
          />
          <Route
            exact
            path="/LabEditServiceCategory/:id"
            component={EditServiceCategory}
          />
          <Route
            exact
            path="/LabServiceRequests"
            component={CreateServiceRequest}
          />
          <Route
            exact
            path="/LabManageServiceRequests"
            component={ManageServiceRequest}
          />
          <Route
            exact
            path="/LabServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          <Route
            exact
            path="/LabUploadServiceRequestResult/:serviceRequestId"
            component={ServiceRequestResultUpload}
          />
          <Route
            exact
            path="/LabViewLabResults/:id"
            component={ViewLabResults}
          />
          <Route exact path="/ChangePassword" component={ViewChangePassword} />
          <Route
            exact
            path="/LabManageAdmissions"
            component={ManageAdmissions}
          />
          <Route
            exact
            path="/LabManageAdmissionServiceRequest/:id"
            component={ManageServiceRequests}
          />
          <Route
            exact
            path="*"
            render={() => <Redirect to="/LabDashboard" />}
          />
        </Switch>
      </LabLayout>
    </BrowserRouter>
  );
}
