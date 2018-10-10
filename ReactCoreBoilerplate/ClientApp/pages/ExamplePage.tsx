import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps } from "react-router";
import { IPersonModel } from "@Models/IPersonModel";
import { PersonStore } from "@Store/PersonStore";
import { ApplicationState } from "@Store/index";
import { connect } from "react-redux";
import { PagingBar } from "@Components/shared/PagingBar";
import { PersonEditor } from "@Components/person/PersonEditor";
import { Modal } from "bootstrap3-native";

type Props = RouteComponentProps<{}> & typeof PersonStore.actionCreators & PersonStore.IState;

interface IState {
    pageNum: number;
    limitPerPage: number;
    rowOffset: number;
    modelForEdit: IPersonModel;
}

class ExamplePage extends React.Component<Props, IState> {

    private pagingBar: PagingBar;

    private elModalAdd: HTMLDivElement;
    private elModalEdit: HTMLDivElement;
    private elModalDelete: HTMLDivElement;

    private modalAdd: any;
    private modalEdit: any;
    private modalDelete: any;

    private personEditorAdd: PersonEditor;
    private personEditorEdit: PersonEditor;

    constructor(props: Props) {
        super(props);

        this.state = {
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0,
            modelForEdit: {}
        };

        this.onChangePage = this.onChangePage.bind(this);

        this.renderRow = this.renderRow.bind(this);
        this.renderRows = this.renderRows.bind(this);

        this.onClickShowAddModal = this.onClickShowAddModal.bind(this);
        this.onClickShowEditModal = this.onClickShowEditModal.bind(this);
        this.onClickShowDeleteModal = this.onClickShowDeleteModal.bind(this);

        this.onClickPersonEditorAdd__saveBtn = this.onClickPersonEditorAdd__saveBtn.bind(this);
        this.onClickPersonEditorEdit__saveBtn = this.onClickPersonEditorEdit__saveBtn.bind(this);
        this.onClickPersonEditorDelete__saveBtn = this.onClickPersonEditorDelete__saveBtn.bind(this);
    }

    componentWillMount() {
        this.props.getAllRequest();
    }

    componentDidMount() {
        var self = this;

        self.modalAdd = new Modal(self.elModalAdd);
        self.modalEdit = new Modal(self.elModalEdit);
        self.modalDelete = new Modal(self.elModalDelete);
    }

    componentWillUnmount() {
        if (this.modalAdd != null) {
            this.modalAdd.hide();
        }
        if (this.modalEdit != null) {
            this.modalEdit.hide();
        }
        if (this.modalDelete != null) {
            this.modalDelete.hide();
        }
    }

    onChangePage(pageNum: number): void {
        let rowOffset = Math.ceil((pageNum - 1) * this.state.limitPerPage);
        this.setState({ pageNum, rowOffset });
    }

    onClickShowAddModal(e: React.MouseEvent<HTMLButtonElement>) {
        this.modalAdd.show();
    }

    onClickShowEditModal(e: React.MouseEvent<HTMLButtonElement>, modelForEdit: IPersonModel) {
        this.setState({ modelForEdit });
        this.modalEdit.show();
    }

    onClickShowDeleteModal(e: React.MouseEvent<HTMLButtonElement>, modelForEdit: IPersonModel) {
        this.setState({ modelForEdit });
        this.modalDelete.show();
    }

    onClickPersonEditorAdd__saveBtn(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (!this.personEditorAdd.isValid()) {
            return;
        }
        this.props.addRequest(this.personEditorAdd.getData());
        this.pagingBar.setLastPage();
        this.modalAdd.hide();
    }

    onClickPersonEditorEdit__saveBtn(e: React.MouseEvent<HTMLButtonElement>): void {
        if (!this.personEditorEdit.isValid()) {
            return;
        }
        this.props.updateRequest(this.personEditorEdit.getData());
        this.modalEdit.hide();
    }

    onClickPersonEditorDelete__saveBtn(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.deleteRequest(this.state.modelForEdit.id);
        this.modalDelete.hide();
    }

    renderRow(person: IPersonModel) {
        return <tr key={person.id}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>
                <button className="btn btn-info" onClick={x => this.onClickShowEditModal(x, person)}>Edit</button>&nbsp;
                <button className="btn btn-danger" onClick={x => this.onClickShowDeleteModal(x, person)}>Delete</button>
            </td>
        </tr>;
    }

    renderRows(data: IPersonModel[]) {
        return data
            .slice(this.state.rowOffset, this.state.rowOffset + this.state.limitPerPage)
            .map(x => this.renderRow(x));
    }

    render() {

        return <div>
            <Helmet>
                <title>Example - RCB</title>
            </Helmet>

            <div className="panel panel-default">
                <div className="panel-body">
                    <button className="btn btn-success" onClick={this.onClickShowAddModal}>Add</button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>First name</th><th>Last name</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows(this.props.people)}
                </tbody>
            </table>

            {/* Add modal */}
            <div className="modal fade" role="dialog" ref={x => this.elModalAdd = x}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Add person</h4>
                        </div>
                        <div className="modal-body">
                            <PersonEditor ref={x => this.personEditorAdd = x} data={{}} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.onClickPersonEditorAdd__saveBtn}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update modal */}
            <div className="modal fade" role="dialog" ref={x => this.elModalEdit = x}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Edit person: {this.state.modelForEdit.firstName} {this.state.modelForEdit.lastName}</h4>
                        </div>
                        <div className="modal-body">
                            <PersonEditor ref={x => this.personEditorEdit = x} data={this.state.modelForEdit} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.onClickPersonEditorEdit__saveBtn}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete modal */}
            <div className="modal fade" role="dialog" ref={x => this.elModalDelete = x}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Delete person: {this.state.modelForEdit.firstName} {this.state.modelForEdit.lastName}</h4>
                        </div>
                        <div className="modal-body">
                            <p>Do you really want to delete this person?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={this.onClickPersonEditorDelete__saveBtn}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <PagingBar
                ref={x => this.pagingBar = x}
                totalResults={this.props.people.length}
                limitPerPage={this.state.limitPerPage}
                currentPage={this.state.pageNum}
                onChangePage={this.onChangePage}
            />
        </div>;
    }
}

var component = connect(
    (state: ApplicationState) => state.person, // Selects which state properties are merged into the component's props.
    PersonStore.actionCreators // Selects which action creators are merged into the component's props.
)(ExamplePage as any);

export default (component as any as typeof ExamplePage)