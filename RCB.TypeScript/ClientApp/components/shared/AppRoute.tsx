import * as React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import SessionManager from "@Core/session";
import responseContext from "@Core/responseContext";

export interface IProps extends RouteProps {
    layout: React.ComponentClass<any>;
    statusCode?: number;
}

const AppRoute: React.FC<IProps> =
    ({ component: Component, layout: Layout, statusCode: statusCode, path: Path, ...rest }: IProps) => {

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