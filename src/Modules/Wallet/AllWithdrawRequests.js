import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import * as _ from "lodash";
import SweetAlert from 'sweetalert-react';
import Rodal from 'rodal';
import {Loader} from 'react-loaders';

import {
    Button,
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, FormGroup, ModalBody, ModalFooter, ModalHeader,
    Row,
    UncontrolledButtonDropdown
} from 'reactstrap';

import ReactTable from "react-table";
import PageTitle from '../../Layout/AppMain/PageTitle';
import {MESSAGES} from "../../constants/messages";
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {inCurrency} from "../../utils/helper/helperFunctions";


class WithdrawRequests extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: 1,
            perPage: 10,
            isLoading: false,
            isUpdating: false,
            selectedIds: [],
            showQuickEditBox: false,
            showDeleteConfirmationBox: false,
            showDeleteCompletionBox: false,
            reactTableState: {},
            quickEdit: {
                status: 0
            }
        };

        this.getActionsHeader = this.getActionsHeader.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleIndividualSelect = this.handleIndividualSelect.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showDeleteConfirmationBox = this.showDeleteConfirmationBox.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.showQuickEditBox = this.showQuickEditBox.bind(this);
        this.cancelQuickEdit = this.cancelQuickEdit.bind(this);
        this.handleQuickEdit = this.handleQuickEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelectAll() {
        const totalIds = _.map(this.state.data, 'id');
        const selectedIds = this.state.selectedIds;

        if (totalIds.length === selectedIds.length) {
            this.setState({selectedIds: []});
        } else {
            this.setState({selectedIds: totalIds});
        }
    }

    handleIndividualSelect(id) {
        let selectedIds = [...this.state.selectedIds];
        let index = selectedIds.indexOf(id);

        if (index !== -1) {
            selectedIds.splice(index, 1);
        } else {
            selectedIds.push(id);
        }

        this.setState({selectedIds: selectedIds});
    }

    handleChange(e) {
        this.setState({
            quickEdit: {
                [e.target.name]: e.target.value
            }
        });
    }

    getActionsHeader = () => {
        const dropDown = (
            <UncontrolledButtonDropdown>
                <DropdownToggle caret
                                className="btn-icon btn-icon-only btn btn-link"
                                color="link">
                </DropdownToggle>
                <DropdownMenu
                    className="rm-pointers dropdown-menu-hover-link">
                    <DropdownItem onClick={() => this.showQuickEditBox()}>
                        <i className="dropdown-icon lnr-inbox"> </i>
                        <span>Quick Edit</span>
                    </DropdownItem>
                    <DropdownItem onClick={() => this.showDeleteConfirmationBox()}>
                        <i className="dropdown-icon lnr-file-empty"> </i>
                        <span>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        );
        return <div> Actions {dropDown} </div>;
    };

    async fetchData(state, instance = null) {
        let query = "";
        this.setState({reactTableState: state});

        //If fetchData is already running, return
        if (this.state.isLoading) {
            return;
        }

        // Go to page
        if (state.page) {
            query += "&page=" + (state.page + 1);
        }

        // Sorting
        if (state.sorted.length > 0) {
            query += "&orderBy=" + state.sorted[0].id;
            query += "&ascending=" + (state.sorted[0].desc ? "false" : "true");
        }

        // Limit
        if (state.pageSize) {
            query += "&limit=" + state.pageSize;
        }

        // if filter is on and doesn't have at least 2 characters, abort
        if (state.filtered.length > 0 && state.filtered[0].value.length < 2) {
            return;
        }

        // filter only after having at least 2 characters
        if (state.filtered.length > 0 && state.filtered[0].value.length > 1) {
            query += "&" + state.filtered[0].id + "=" + state.filtered[0].value
        }

        // Start loading indicator and call api
        this.setState({isLoading: true});

        await this.props.makeRequest(request.Wallet.withdrawRequests, query, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.setState({
                        data: responseData.data,
                        pages: responseData.meta.last_page,
                        isLoading: false,
                        selectedIds: []
                    });
                } else {
                    this.setState({
                        data: [],
                        pages: 0,
                        isLoading: false,
                        selectedIds: []
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    showDeleteConfirmationBox(id = null) {
        if (id) {
            this.setState({selectedIds: [id]});
        }
        this.setState({showDeleteConfirmationBox: true });
    }

    showQuickEditBox(id = null) {
        if (id) {
            this.setState({selectedIds: [id]});
        }
        this.setState({showQuickEditBox: true});
    }

    cancelQuickEdit() {
        this.setState({showQuickEditBox: false});
    }

    async handleQuickEdit() {
        const data = {
            withdraw_request_ids: this.state.selectedIds,
            status: this.state.quickEdit.status
        };

        this.setState({isUpdating: true});

        await this.props.makeRequest(request.Wallet.updateMultipleWithdrawRequest, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.setState({isUpdating: false});
                this.fetchData(this.state.reactTableState);
                this.setState({showQuickEditBox: false});
            },
            (errorData) => {
                this.setState({isUpdating: false});
                this.setState({showQuickEditBox: false});
            }
        );

    }

    async handleDelete() {
        this.setState({isLoading: true});
        this.setState({showDeleteConfirmationBox: false });

        const data = {
            user_ids: this.state.selectedIds
        };

        await this.props.makeRequest(request.Users.deleteMultiple, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.setState({isLoading: false});
                this.fetchData(this.state.reactTableState);
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {data, pages, perPage, isLoading, isUpdating, quickEdit} = this.state;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="All Withdraw Requests"
                            subheading="View and update all withdraw requests"
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <ReactTable
                                        data={data}
                                        columns={[
                                            {
                                                columns: [
                                                    {
                                                        Header: <input type="checkbox"
                                                                       checked={this.state.selectedIds.length > 0}
                                                                       onChange={this.handleSelectAll}/>,
                                                        Cell: props => (
                                                            <div>
                                                                <input type="checkbox"
                                                                       checked={this.state.selectedIds.includes(props.original.id)}
                                                                       onChange={() => this.handleIndividualSelect(props.original.id)}/>
                                                            </div>
                                                        ),
                                                        filterable: false,
                                                        width: 40,
                                                        sortable: false,
                                                    },
                                                ]
                                            },
                                            {
                                                columns: [
                                                    {
                                                        Header: 'Name',
                                                        accessor: 'full_name',
                                                        Cell: props => (
                                                            <div>
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-heading">
                                                                            {props.value}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: 'Amount',
                                                        accessor: 'amount',
                                                        Cell: props => (
                                                            <div>
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-heading">
                                                                            { inCurrency(props.value) }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ),
                                                        filterable: false
                                                    },
                                                    {
                                                        Header: 'Status',
                                                        accessor: 'status'
                                                    },
                                                    {
                                                        Header: 'Created On',
                                                        accessor: 'created_at',
                                                        filterable: false
                                                    },
                                                    {
                                                        Header: 'Updated On',
                                                        accessor: 'updated_at',
                                                        filterable: false
                                                    }
                                                ]
                                            },
                                            {
                                                columns: [
                                                    {
                                                        Header: this.getActionsHeader,
                                                        accessor: 'actions',
                                                        Cell: props => (
                                                            <div className="d-block w-100 text-center">
                                                                <UncontrolledButtonDropdown>
                                                                    <DropdownToggle caret
                                                                                    className="btn-icon btn-icon-only btn btn-link"
                                                                                    color="link">
                                                                        <i className="lnr-menu-circle btn-icon-wrapper"/>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu
                                                                        className="rm-pointers dropdown-menu-hover-link">
                                                                        <DropdownItem onClick={() => this.showQuickEditBox(props.original.id)}>
                                                                            <i className="dropdown-icon lnr-inbox"> </i>
                                                                            <span>Quick Edit</span>
                                                                        </DropdownItem>
                                                                        <DropdownItem onClick={() => this.showDeleteConfirmationBox(props.original.id)}>
                                                                            <i className="dropdown-icon lnr-file-empty"> </i>
                                                                            <span>Delete</span>
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledButtonDropdown>
                                                            </div>
                                                        ),
                                                        filterable: false,
                                                        sortable: false
                                                    }
                                                ]
                                            }
                                        ]}
                                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                        pages={pages} // Display the total number of pages
                                        loading={isLoading} // Display the loading overlay when we need it
                                        onFetchData={this.fetchData} // Request new data when things change
                                        defaultPageSize={perPage}
                                        filterable={true}
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <SweetAlert
                        title="Are you sure?"
                        confirmButtonColor=""
                        show={this.state.showDeleteConfirmationBox}
                        text="You will not be able to recover these data!"
                        type="success"
                        showCancelButton
                        onConfirm={this.handleDelete}
                        onCancel={() => this.setState({showDeleteConfirmationBox: false})}/>

                    <SweetAlert
                        title="Deleted"
                        confirmButtonColor=""
                        show={this.state.showDeleteCompletionBox}
                        text="Your imaginary file has been deleted."
                        type="success"
                        onConfirm={() => this.setState({showDeleteConfirmationBox: false, showDeleteCompletionBox: false})}/>

                    <SweetAlert
                        title="Deleted"
                        confirmButtonColor=""
                        show={this.state.showEmptySelect}
                        text="Your imaginary file has been deleted."
                        type="error"
                        onConfirm={() => this.setState({showDeleteConfirmationBox: false, showDeleteCompletionBox: false})}/>

                    <Rodal visible={this.state.showQuickEditBox}
                           onClose={this.cancelQuickEdit}
                           animation={"fade"}
                           showMask={true}
                    >
                        <ModalHeader>Quick Edit</ModalHeader>
                        <ModalBody>
                            <AvForm onSubmit={this.handleLogin}>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField type="select" name="status" label="Status"
                                                         onChange={this.handleChange}
                                                         value={quickEdit.status}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="failed">Failed</option>
                                                </AvField>
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </AvForm>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={this.cancelQuickEdit}>Cancel</Button>
                            <Button color="primary" onClick={this.handleQuickEdit}>
                                { isUpdating ?
                                    <Loader type="ball-beat" style={{transform: 'scale(0.3)'}} color="white"/>
                                    :
                                    "Quick Update"
                                }
                            </Button>
                        </ModalFooter>
                    </Rodal>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

WithdrawRequests.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(WithdrawRequests));