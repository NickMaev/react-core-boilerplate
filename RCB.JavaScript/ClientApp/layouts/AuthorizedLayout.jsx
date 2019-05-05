import TopMenu from "@Components/shared/TopMenu";
import * as React from "react";
import "@Styles/authorizedLayout.scss";
import { ToastContainer } from "react-toastify";
import Footer from "@Components/shared/Footer";

export default class AuthorizedLayout extends React.Component {
    render() {

        return <div id="authorizedLayout" className="layout">
            <TopMenu />
            <div className="container container-content">
                {this.props.children}
            </div>
            <ToastContainer />
            <Footer />
        </div>;
    }
}