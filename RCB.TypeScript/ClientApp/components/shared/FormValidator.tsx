import * as React from "react";
import { NValTippy } from "nval-tippy";

export interface IProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    children: any;
}

export default class FormValidator extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }

    private validator: NValTippy;
    private elForm: HTMLFormElement;

    public isValid = (): boolean => {
        return this.validator.isValid();
    }

    componentDidMount() {
        this.validator = new NValTippy(this.elForm);
    }

    render() {
        return <form {...this.props} ref={x => this.elForm = x}>{this.props.children}</form>;
    }
}