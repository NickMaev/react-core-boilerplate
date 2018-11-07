import * as React from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
interface IState {
    value?: string;
}

export default class Input extends React.Component<Props, IState> {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || "" as string });
    }

    render() {
        return <input {...this.props} value={this.state.value} onChange={e => this.setState({value: e.target.value})} />;
    }
}