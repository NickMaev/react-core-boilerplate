import * as React from "react";
import AppComponent from "@Components/shared/AppComponent";
import bind from 'bind-decorator';

export interface IProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {

}

export class MultiSelect extends AppComponent<IProps, {}> {
    constructor(props) {
        super(props);
    }

    protected elSelect: HTMLSelectElement;
    
    @bind
    getValues(): string[] {
        return Array.apply(null, this.elSelect.options).filter(x => x.selected).map(x => x.value);
    }

    render() {
        return <select ref={x => this.elSelect = x} key={this.renderKey} {...this.props} multiple={true}>{this.props.children}</select>;
    }
}