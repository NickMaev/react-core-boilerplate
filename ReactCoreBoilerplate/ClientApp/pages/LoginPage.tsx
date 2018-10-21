import { ILoginModel } from "@Models/ILoginModel";
import Loader from "@Components/shared/Loader";
import { ApplicationState } from "@Store/index";
import { LoginStore } from "@Store/LoginStore";
import "@Styles/main.scss";
import { NSerializeJson } from "NSerializeJson";
import { NValTippy } from "nval-tippy";
import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import { setTimeout } from "timers";

type Props = RouteComponentProps<{}> & typeof LoginStore.actionCreators & LoginStore.IState;

class LoginPage extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);

        this.onClickSubmitBtn = this.onClickSubmitBtn.bind(this);
    }

    elLoader: Loader;
    elForm: HTMLFormElement;
    nval: NValTippy;

    componentDidMount() {
        
        this.props.init();

        if (this.elForm != null) {
            this.nval = new NValTippy(this.elForm);
        }

        if (this.elLoader) {
            this.elLoader.forceUpdate();
        }
    }

    private async onClickSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (this.nval.isValid()) {
            var model = NSerializeJson.serializeForm(this.elForm) as ILoginModel;
            this.props.loginRequest(model);
        }
    }

    render() {

        if (this.props.indicators.loginSuccess) {
            return <Redirect to="/"/>;
        }

        return <div id="loginPage">

            <Helmet>
                <title>Login page - RCB</title>
            </Helmet>
            
            <Loader ref={x => this.elLoader = x} show={this.props.indicators.operationLoading} />

            <div id="loginContainer">

                <p className="text-center">Type any login and password to enter.</p>

                <form ref={x => this.elForm = x}>
                    <div className="form-group">
                        <label htmlFor="inputLogin">Login</label>
                        <input type="text" name={nameof<ILoginModel>(x=>x.login)} data-value-type="string" className="form-control" id="inputLogin" data-val-required="true" data-msg-required="Login is required." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLogin">Password</label>
                        <input type="password" name={nameof<ILoginModel>(x=>x.password)} data-value-type="string" className="form-control" id="inputPassword" data-val-required="true" data-msg-required="Password is required." />
                    </div>
                    <div className="form-inline">
                        <button className="btn btn-success" onClick={this.onClickSubmitBtn}>Sign in</button>
                    </div>
                </form>
            </div>

        </div>;
    }
}

var component = connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginStore.actionCreators // Selects which action creators are merged into the component's props
)(LoginPage as any);

export default (component as any as typeof LoginPage)