import * as React from "react";
import AppComponent from "@Components/shared/AppComponent";
import bind from 'bind-decorator';

export class MultiSelect extends AppComponent {
    constructor(props) {
        super(props);
    }

    elSelect;
    
    @bind
    getValues() {
        return Array.apply(null, this.elSelect.options).filter(x => x.selected).map(x => x.value);
    }

    render() {
        return <select ref={x => this.elSelect = x} key={this.renderKey} {...this.props} multiple={true}>{this.props.children}</select>;
    }
}