import * as React from "react";
import { NValTippy } from "nval-tippy";

export default class FormValidator extends React.Component {
    constructor(props) {
        super(props);
    }

    validator;
    elForm;

    isValid = () => {
        return this.validator.isValid();
    }

    componentDidMount() {
        this.validator = new NValTippy(this.elForm);
    }

    render() {
        return <form {...this.props} ref={x => this.elForm = x}>{this.props.children}</form>;
    }
}