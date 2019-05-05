import * as React from "react";
import bind from 'bind-decorator';

/**
 * This component contains helpful method which
 * allows you to make "force update" of the stuck elements.
 */
export default class AppComponent extends React.Component {
    
    /**
     * Place it into the "key" attribute of an element.
     */
    renderKey = 0;

    constructor(props) {
        super(props);
    }

    /**
     * Call this if component state is stuck.
     * But you should set the renderKey to the element's attribute.
     */
    @bind
    forceUpdate() {
        this.renderKey = Math.random();
    }
}