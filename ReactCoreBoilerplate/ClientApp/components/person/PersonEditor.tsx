import { IPersonModel } from "@Models/IPersonModel";
import * as React from "react";
import bind from 'bind-decorator';
import { Form } from "@Components/shared/Form";
import Input from "@Components/shared/Input";

export interface IProps {
    data: IPersonModel;
}

export class PersonEditor extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }

    public elForm: Form;

    @bind
    public emptyForm(): void {
        if (this.elForm) {
            this.elForm.emptyForm();
        }
    }

    componentDidMount() {
    }

    render() {
        return <Form className="form" ref={x => this.elForm = x}>
            <input type="hidden" name="id" defaultValue={(this.props.data.id || 0).toString()} />
            <div className="form-group">
                <label className="control-label required" htmlFor="person__firstName">First name</label>
                <Input
                    type="text"
                    className="form-control"
                    id="person__firstName"
                    name={nameof<IPersonModel>(x => x.firstName)}
                    data-value-type="string"
                    data-val-required="true"
                    data-msg-required="First name is required."
                    value={this.props.data.firstName}
                />
            </div>
            <div className="form-group">
                <label className="control-label required" htmlFor="person__lastName">Last name</label>
                <Input
                    type="text"
                    className="form-control"
                    id="person__lastName"
                    name={nameof<IPersonModel>(x => x.lastName)}
                    data-value-type="string"
                    data-val-required="true"
                    data-msg-required="Last name is required."
                    value={this.props.data.lastName}
                />
            </div>
        </Form>;
    }
}