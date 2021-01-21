import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../Components/Layout";
import ViewResetPassword from "../Pages/Components/ViewResetPassword";
import ViewResetPasswordFromMail from "../Pages/Components/ViewResetPasswordFromMail";
import Login from "../Pages/Login/Login";
import { Page404 } from "../Components/Page404/Page404"
import ThirdPartyFundAccount from "../Pages/Components/ThirdPartyFundAccount";


const AuthRoute = () => {

    return (
        <Router>
            <AuthLayout>
                <Switch>
                    <Route
                        exact
                        path={"/"}
                        component={Login}
                    />

                    <Route
                        exact
                        path="/ResetPasswordRedirect"
                        component={ViewResetPassword}
                    />

                    <Route
                        exact
                        path="/ResetPassword"
                        component={ViewResetPasswordFromMail}
                    />
                    <Route
                        exact
                        path="/ThirdPartyFundAccount"
                        component={ThirdPartyFundAccount}
                    />

                    <Route
                        exact
                        path="/404"
                        component={Page404}
                    />

                    <Route path="*" render={() => <Redirect to="/" />} />
                </Switch>
            </AuthLayout>
        </Router>
    );
};

export { AuthRoute }