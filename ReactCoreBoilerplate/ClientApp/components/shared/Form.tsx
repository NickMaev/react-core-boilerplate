import * as React from "react";
import { NSerializeJson } from "nserializejson";
import { emptyForm } from "@Utils";
import { NValTippy } from "nval-tippy";
import bind from 'bind-decorator';

export interface IProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    children: any;
}

export class Form extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }

    public validator: NValTippy;
    protected elForm: HTMLFormElement;

    @bind
    public isValid(): boolean {
        return this.validator.isValid();
    }
    
    @bind
    public emptyForm(): void {
        emptyForm(this.elForm);
    }
    
    @bind
    public getData<T>(): T {
        return NSerializeJson.serializeForm(this.elForm) as any as T;
    }

    componentDidMount() {
        this.validator = new NValTippy(this.elForm);
    }

    render() {
        return <form {...this.props} ref={x => this.elForm = x}>{this.props.children}</form>;
    }
}