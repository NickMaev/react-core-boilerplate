import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";
import { IPersonModel } from "@Models/IPersonModel";
import { PersonStore } from "@Store/PersonStore";
import { ApplicationState, reducers } from "@Store/index";
import { connect } from "react-redux";
import { PagingBar } from "@Components/shared/PagingBar";
import PersonEditor from "@Components/person/PersonEditor";
import Loader from "@Components/shared/Loader";
import bind from 'bind-decorator';
import { ModalComponent } from "@Components/shared/ModalComponent";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { getPromiseFromAction } from "@Utils";

type Props = RouteComponentProps<{}> & typeof PersonStore.actionCreators & PersonStore.IState;

interface IState {
    searchTerm: string;
    pageNum: number;
    limitPerPage: number;
    rowOffset: number;
    modelForEdit: IPersonModel;
}

class ExamplePage extends React.Component<Props, IState> {

    private pagingBar: PagingBar;

    private elModalAdd: ModalComponent;
    private elModalEdit: ModalComponent;
    private elModalDelete: ModalComponent;

    private personEditorAdd: PersonEditor;
    private personEditorEdit: PersonEditor;

    private debouncedSearch: (term: string) => void;

    constructor(props: Props) {
        super(props);

        this.state = {
            searchTerm: "",
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0,
            modelForEdit: {}
        };

        this.debouncedSearch = AwesomeDebouncePromise((term: string) => {
            props.searchRequest(term);
        }, 500);
    }

    componentWillMount() {
        this.props.searchRequest();
    }

    componentWillUnmount() {
        if (this.elModalAdd) {
            this.elModalAdd.hide();
        }
        if (this.elModalEdit) {
            this.elModalEdit.hide();
        }
        if (this.elModalDelete) {
            this.elModalDelete.hide();
        }
    }

    @bind
    onChangePage(pageNum: number): void {
        let rowOffset = Math.ceil((pageNum - 1) * this.state.limitPerPage);
        this.setState({ pageNum, rowOffset });
    }

    @bind
    onClickShowAddModal(e: React.MouseEvent<HTMLButtonElement>) {
        this.elModalAdd.show();
    }

    @bind
    onClickShowEditModal(e: React.MouseEvent<HTMLButtonElement>, modelForEdit: IPersonModel) {
        this.setState({ modelForEdit });
        this.elModalEdit.show();
    }

    @bind
    onClickShowDeleteModal(e: React.MouseEvent<HTMLButtonElement>, modelForEdit: IPersonModel) {
        this.setState({ modelForEdit });
        this.elModalDelete.show();
    }

    @bind
    async onClickPersonEditorAdd__saveBtn(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!this.personEditorAdd.elForm.isValid()) {
            // Form is not valid.
            return;
        }

        var result =
            await getPromiseFromAction(
                this.props.addRequest(this.personEditorAdd.elForm.getData())
            );

        if (!result.hasErrors) {
            this.pagingBar.setLastPage();
            this.elModalAdd.hide();
        }
    }

    @bind
    async onClickPersonEditorEdit__saveBtn(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.personEditorEdit.elForm.isValid()) {
            // Form is not valid.
            return;
        }

        var data = this.personEditorEdit.elForm.getData();

        var result = await getPromiseFromAction(
            this.props.updateRequest(data)
        );

        if (!result.hasErrors) {
            this.elModalEdit.hide();
        }
    }

    @bind
    onClickPersonEditorDelete__saveBtn(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.deleteRequest(this.state.modelForEdit.id);
        this.elModalDelete.hide();
    }

    @bind
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

    @bind
    renderRows(data: IPersonModel[]) {
        return data
            .slice(this.state.rowOffset, this.state.rowOffset + this.state.limitPerPage)
            .map(x => this.renderRow(x));
    }

    @bind
    onChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        var val = e.currentTarget.value;
        this.debouncedSearch(val);
        this.pagingBar.setFirstPage();
    }

    render() {

        return <div>
            <Helmet>
                <title>Example - RCB (TypeScript)</title>
            </Helmet>

            <Loader show={this.props.indicators.operationLoading} />

            <div className="panel panel-default">
                <div className="panel-body row">
                    <div className="col-sm-1">
                        <button className="btn btn-success" onClick={this.onClickShowAddModal}>Add</button>
                    </div>
                    <div className="col-sm-11">
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={""}
                            onChange={this.onChangeSearchInput}
                            placeholder={"Search for people..."}
                        />
                    </div>
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
            <ModalComponent
                ref={x => this.elModalAdd = x}
                buttons={<div>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.onClickPersonEditorAdd__saveBtn}>Save</button>
                </div>}
                title="Add person"
                onHide={() => {
                    if (this.personEditorAdd) {
                        this.personEditorAdd.emptyForm();
                    }
                }}>
                <PersonEditor ref={x => this.personEditorAdd = x} data={{}} />
            </ModalComponent>

            {/* Edit modal */}
            <ModalComponent
                ref={x => this.elModalEdit = x}
                buttons={<div>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.onClickPersonEditorEdit__saveBtn}>Save</button>
                </div>}
                title={`Edit person: ${this.state.modelForEdit.firstName} ${this.state.modelForEdit.lastName}`}
                onHide={() => {
                    if (this.personEditorEdit) {
                        this.setState({ modelForEdit: {} });
                    }
                }}>
                <PersonEditor ref={x => this.personEditorEdit = x} data={this.state.modelForEdit} />
            </ModalComponent>

            {/* Delete modal */}
            <ModalComponent
                ref={x => this.elModalDelete = x}
                buttons={<div>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={this.onClickPersonEditorDelete__saveBtn}>Delete</button>
                </div>}
                title={`Delete person: ${this.state.modelForEdit.firstName} ${this.state.modelForEdit.lastName}`}>
                <p>Do you really want to delete this person?</p>
            </ModalComponent>

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

export default (withRouter(component as any) as any as typeof ExamplePage)