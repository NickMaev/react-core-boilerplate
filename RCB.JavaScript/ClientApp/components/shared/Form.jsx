import * as React from "react";
import { NSerializeJson } from "nserializejson";
import { emptyForm } from "@Utils";
import { NValTippy } from "nval-tippy";
import bind from 'bind-decorator';

export class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    validator;
    elForm;

    @bind
    isValid() {
        return this.validator.isValid();
    }
    
    @bind
    emptyForm() {
        emptyForm(this.elForm);
    }
    
    @bind
    getData() {
        return NSerializeJson.serializeForm(this.elForm);
    }

    componentDidMount() {
        this.validator = new NValTippy(this.elForm);
    }

    render() {
        return <form {...this.props} ref={x => this.elForm = x}>{this.props.children}</form>;
    }
}