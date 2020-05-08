import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";

type Props = RouteComponentProps<{}>;

const HomePage: React.FC<Props> = () => {
    return <div>
        <Helmet>
            <title>Home page - RCB.TypeScript</title>
        </Helmet>

        <br />

        <img style={{ "margin": "0 auto", "display": "block", "width": "60%" }} src={logo} />

        <p className="text-center" style={{ "fontSize": "3rem" }}>Happy coding!</p>
    </div>;
}

export default HomePage;