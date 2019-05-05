import { IPersonModel } from "@Models/IPersonModel";
import * as React from "react";
import bind from 'bind-decorator';
import { Form } from "@Components/shared/Form";
import { Formik } from 'formik';

export interface IProps {
    data: IPersonModel;
}

export default class PersonEditor extends React.Component<IProps, {}> {
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

        return <Formik
            enableReinitialize={true}
            initialValues={{
                firstName: this.props.data.firstName || '',
                lastName: this.props.data.lastName || ''
            }}
            onSubmit={(values, { setSubmitting }) => {
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                    <Form className="form" ref={x => this.elForm = x}>
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
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </Form>)}
        </Formik>;
    }
}