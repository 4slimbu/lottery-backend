import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import * as _ from "lodash";

import {
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledButtonDropdown
} from 'reactstrap';

import ReactTable from "react-table";
import PageTitle from '../../Layout/AppMain/PageTitle';
import {MESSAGES} from "../../constants/messages";


class AllLotterySlots extends Component {
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
                id: '',
                name: '',
                label: ''
            }
        };

        this.getActionsHeader = this.getActionsHeader.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleIndividualSelect = this.handleIndividualSelect.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showDetail = this.showDetail.bind(this);
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

    getActionsHeader = () => {
        return <div> Actions </div>;
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

        // if filter is on and doesn't have at least 1 characters, abort
        if (state.filtered.length > 0 && state.filtered[0].value.length < 1) {
            return;
        }

        // filter only after having at least 2 characters
        if (state.filtered.length > 0 && state.filtered[0].value.length > 1) {
            for (let i=0; i < state.filtered.length; i++) {
                query += "&" + state.filtered[i].id + "=" + state.filtered[i].value
            }
        }

        // Start loading indicator and call api
        this.setState({isLoading: true});

        await this.props.makeRequest(request.Lottery.slots.all, query, {message: MESSAGES.LOGGING}).then(
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

    showDetail(id) {
        const {history} = this.props;

        history.push('/lottery/slots/' + id);
    }

    render() {
        const {data, pages, perPage, isLoading} = this.state;

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
                            heading="All Lottery Slots"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
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
                                                        Header: 'Slot Ref',
                                                        accessor: 'slot_ref'
                                                    },
                                                    {
                                                        Header: 'Start Time',
                                                        accessor: 'start_time'
                                                    },
                                                    {
                                                        Header: 'End Time',
                                                        accessor: 'end_time'
                                                    },
                                                    {
                                                        Header: 'Has Winner',
                                                        accessor: 'has_winner',
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                {row.value > 0 ? 'Yes' : 'No'}
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        Header: 'Total Participants',
                                                        accessor: 'total_participants'
                                                    },
                                                    {
                                                        Header: 'Total Amount',
                                                        accessor: 'total_amount'
                                                    },
                                                    {
                                                        Header: 'Result',
                                                        accessor: 'result',
                                                        Cell: props => (
                                                            <div className="d-block w-100 text-center">
                                                                {props.original.result}
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        Header: 'Status',
                                                        accessor: 'status',
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                {row.value > 0 ? 'Active' : 'Inactive'}
                                                            </div>
                                                        ),
                                                    },
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
                                                                        <DropdownItem onClick={() => this.showDetail(props.original.id)}>
                                                                            <i className="dropdown-icon lnr-inbox"> </i>
                                                                            <span>View Detail</span>
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
                                        minRows={1}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

AllLotterySlots.propTypes = {
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
})(AllLotterySlots));