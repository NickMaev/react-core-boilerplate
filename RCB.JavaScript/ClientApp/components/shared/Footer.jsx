import * as React from "react";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <footer className="footer text-center">
            <p>View on <a href="https://github.com/NickMaev/react-core-boilerplate">GitHub</a></p>
            <p>Copyright (c) 2019 Nikolay Maev</p>
            <p><a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a></p>
        </footer>;
    }
}