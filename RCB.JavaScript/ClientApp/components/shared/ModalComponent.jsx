import * as React from "react";
import { Modal } from "bootstrap3-native";
import bind from 'bind-decorator';

export class ModalComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    modalPlugin;
    elModal;

    @bind
    show() {
        this.modalPlugin.show();
    }

    @bind
    hide() {
        this.modalPlugin.hide();
    }

    componentDidMount() {
        this.modalPlugin = new Modal(this.elModal);
        if (this.props.onShow) {
            this.elModal.addEventListener("show.bs.modal", () => this.props.onShow());
        }
        if (this.props.onHide) {
            this.elModal.addEventListener("hide.bs.modal", () => this.props.onHide());
        }
    }

    componentWillUnmount() {
        this.modalPlugin.hide();
    }

    render() {
        return <div className="modal fade" tabIndex={-1} role="dialog" ref={x => this.elModal = x}>
                   <div className="modal-dialog" role="document">
                       <div className="modal-content">
                           <div className="modal-header">
                               <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               <h4 className="modal-title">{this.props.title}</h4>
                           </div>
                           <div className="modal-body">
                               {this.props.children}
                           </div>
                           <div className="modal-footer">
                            {this.props.buttons}
                           </div>
                       </div>
                   </div>
               </div>;
    }
}