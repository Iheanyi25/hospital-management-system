import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthLayout } from "../Components/Layout";
import ViewResetPassword from "../Pages/Components/ViewResetPassword";
import ViewResetPasswordFromMail from "../Pages/Components/ViewResetPasswordFromMail";
import Login from "../Pages/Login/Login";
import { Page404 } from "../Components/Page404/Page404"
import ThirdPartyFundAccount from "../Pages/Components/ThirdPartyFundAccount";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

const AuthRoute = () => {

    return (
        <Router>
            <AuthLayout>
                <Switch>
                    <RouteWithErrorBoundary
                        exact
                        path={"/"}
                        component={Login}
                    />

                    <RouteWithErrorBoundary
                        exact
                        path="/ResetPasswordRedirect"
                        component={ViewResetPassword}
                    />

                    <RouteWithErrorBoundary
                        exact
                        path="/ResetPassword"
                        component={ViewResetPasswordFromMail}
                    />
                    <RouteWithErrorBoundary
                        exact
                        path="/common/ThirdPartyFundAccount/:id"
                        component={ThirdPartyFundAccount}
                    />

                    <RouteWithErrorBoundary
                        exact
                        path="*"
                        component={Page404}
                    />

                    {/* <Route path="*" render={() => <Redirect to="/404" />} /> */}
                </Switch>
            </AuthLayout>
        </Router>
    );
};

export { AuthRoute }