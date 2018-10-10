import { IPersonModel } from "@Models/IPersonModel";
import * as React from "react";
import { NValTippy } from "nval-tippy";
import { NSerializeJson } from "NSerializeJson";
import { isObjectEmpty } from "@Utils";

export interface IProps {
    data: IPersonModel;
}

export class PersonEditor extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }

    private nvalTippy: NValTippy;

    private elForm: HTMLFormElement;

    componentDidMount() {
        this.nvalTippy = new NValTippy(this.elForm);
    }

    public isValid(): boolean {
        return this.nvalTippy.isValid();
    }

    public getData(): IPersonModel {
        return NSerializeJson.serializeForm(this.elForm) as IPersonModel;
    }

    render() {
        return <form className="form" ref={x => this.elForm = x}>
            <input type="hidden" name="id" defaultValue={(this.props.data.id || 0).toString()} />
            <div className="form-group">
                <label className="control-label required" htmlFor="person__firstName">First name</label>
                <input
                    type="text"
                    className="form-control"
                    id="person__firstName"
                    name={nameof<IPersonModel>(x => x.firstName)}
                    data-value-type="string"
                    data-val-required="true"
                    data-msg-required="First name is required."
                    defaultValue={this.props.data.firstName}
                />
            </div>
            <div className="form-group">
                <label className="control-label required" htmlFor="person__lastName">Last name</label>
                <input
                    type="text"
                    className="form-control"
                    id="person__lastName"
                    name={nameof<IPersonModel>(x => x.lastName)}
                    data-value-type="string"
                    data-val-required="true"
                    data-msg-required="Last name is required."
                    defaultValue={this.props.data.lastName}
                />
            </div>
        </form>;
    }
}