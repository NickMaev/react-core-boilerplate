import * as React from "react";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
    return <div>
        <Helmet>
            <title>Page not found - RCB.TypeScript</title>
        </Helmet>

        <br />

        <p className="text-center" style={{ "fontSize": "3rem" }}>
            404 - Page not found
        </p>
    </div>;
}

export default NotFoundPage;