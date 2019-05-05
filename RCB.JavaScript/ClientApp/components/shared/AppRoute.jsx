import { Route, Redirect } from "react-router";
import * as React from "react";
import Globals from "@Globals";

const AppRoute = ({ component: Component, layout: Layout, path: Path, ...rest }) => {
    
    var isLoginPath = Path === "/login";
    if (!Globals.isAuthenticated && !isLoginPath) {
        return <Redirect to="/login" />;
    }
    if (Globals.isAuthenticated && isLoginPath) {
        return <Redirect to="/" />;
    }

    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />;
}

export default AppRoute;