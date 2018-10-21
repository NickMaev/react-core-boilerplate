import * as React from "react";

/**
 * This component contains helpful method which
 * allows you to make "force update" of the stuck elements.
 */
export default abstract class AppComponent<TProps = {}, TState = {}> extends React.Component<TProps, TState> {
    
    /**
     * Place it into the "key" attribute of an element.
     */
    protected renderKey = 0;

    constructor(props) {
        super(props);

        this.forceUpdate = this.forceUpdate.bind(this);
    }

    /**
     * Call this if component state is stuck.
     * But you should set the renderKey to the element's attribute.
     */
    public forceUpdate() {
        this.renderKey = Math.random();
    }
}