import * as React from "react";
import { Route, Redirect } from "react-router";
import SessionManager from "@Core/session";
import responseContext from "@Core/responseContext";

const AppRoute =
    ({ component: Component, layout: Layout, statusCode: statusCode, path: Path, ...rest }) => {

        var isLoginPath = Path === "/login";

        if (!SessionManager.isAuthenticated && !isLoginPath) {
            return <Redirect to="/login" />;
        }

        if (SessionManager.isAuthenticated && isLoginPath) {
            return <Redirect to="/" />;
        }

        if (statusCode == null) {
            responseContext.statusCode = 200;
        } else {
            responseContext.statusCode = statusCode;
        }

        return <Route {...rest} render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />;
    };

export default AppRoute;