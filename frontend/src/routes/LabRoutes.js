import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
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
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

export default function LabRoutes() {
  return (
    <BrowserRouter basename="lab">
      <LabLayout>
        <Switch>
          <RouteWithErrorBoundary exact path="/LabDashboard" component={Dashboard} />
          <RouteWithErrorBoundary exact path="/LabProfile" component={ViewLabProfile} />
          <RouteWithErrorBoundary exact path="/LabCreateService" component={CreateService} />
          <RouteWithErrorBoundary exact path="/LabManageServices" component={ManageServices} />
          <RouteWithErrorBoundary exact path="/LabEditService/:id" component={EditService} />
          <RouteWithErrorBoundary exact path="/LabServiceCategory" component={ServiceCategory} />
          <RouteWithErrorBoundary
            exact
            path="/LabManageServiceCategory"
            component={ManageServiceCategory}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabEditServiceCategory/:id"
            component={EditServiceCategory}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabServiceRequests"
            component={CreateServiceRequest}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabManageServiceRequests"
            component={ManageServiceRequest}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabUploadServiceRequestResult/:serviceRequestId"
            component={ServiceRequestResultUpload}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabViewLabResults/:id"
            component={ViewLabResults}
          />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          <RouteWithErrorBoundary
            exact
            path="/LabManageAdmissions"
            component={ManageAdmissions}
          />
          <RouteWithErrorBoundary
            exact
            path="/LabManageAdmissionServiceRequest/:id"
            component={ManageServiceRequests}
          />
          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/LabDashboard" />}
          />
        </Switch>
      </LabLayout>
    </BrowserRouter>
  );
}
