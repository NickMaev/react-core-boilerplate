import * as React from "react";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";

const HomePage = () => {
    return <div>
        <Helmet>
            <title>Home page - RCB.JavaScript</title>
        </Helmet>
        
        <br />

        <img style={{ "margin": "0 auto", "display": "block", "width": "60%" }} src={logo} />

        <p className="text-center" style={{ "fontSize": "3rem" }}>Happy coding!</p>
    </div>;
}

export default HomePage;