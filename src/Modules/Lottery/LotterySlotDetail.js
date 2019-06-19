import React, {Component, Fragment} from 'react'
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
    CardBody, CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, FormGroup, ListGroup, ListGroupItem, ModalBody, ModalFooter, ModalHeader,
    Row,
    UncontrolledButtonDropdown
} from 'reactstrap';

import ReactTable from "react-table";
import PageTitle from '../../Layout/AppMain/PageTitle';
import {MESSAGES} from "../../constants/messages";
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";


class LotterySlotDetail extends Component {
    constructor() {
        super();
        this.state = {
            lotterySlot: {},
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
        let query = "with=participants";
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
            for (let i = 0; i < state.filtered.length; i++) {
                query += "&" + state.filtered[i].id + "=" + state.filtered[i].value
            }
        }

        // Start loading indicator and call api
        this.setState({isLoading: true});

        const data = {
            id: this.props.match.params.id,
            query: query
        };

        await this.props.makeRequest(request.Lottery.slots.get, data, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.setState({
                        lotterySlot: res.data,
                        data: res.data.participants.data,
                        pages: res.data.participants.last_page,
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
        const {lotterySlot, data, pages, perPage, isLoading} = this.state;

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
                            heading="Lottery Slot"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card tabs="true" className="mb-3">
                                <CardBody>

                                    <div>
                                        <ListGroup
                                            className="rm-list-borders rm-list-borders-scroll"
                                            flush>

                                            <ListGroupItem>
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Slot Ref
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div
                                                                    className="widget-numbers text-muted">
                                                                    {lotterySlot.slot_ref}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Total Participants
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div
                                                                    className="widget-numbers text-muted">
                                                                    {lotterySlot.total_participants}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Has Winner
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                {
                                                                    lotterySlot.has_winner > 0 ?
                                                                    <div className="widget-numbers text-success">Yes</div> :
                                                                    <div className="widget-numbers text-muted">No</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Total Amount
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div
                                                                    className="widget-numbers text-muted">
                                                                    {lotterySlot.total_amount}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>

                                            <ListGroupItem>
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Result
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div
                                                                    className="widget-numbers text-info">
                                                                    {lotterySlot.result}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>

                                            <ListGroupItem>
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Status
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                {
                                                                    lotterySlot.status > 0 ?
                                                                        <div className="widget-numbers text-success">Active</div> :
                                                                        <div className="widget-numbers text-muted">Inactive</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>

                                        </ListGroup>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <ReactTable
                                        data={data}
                                        columns={[
                                            {
                                                columns: [
                                                    {
                                                        Header: 'Name',
                                                        accessor: 'full_name'
                                                    },
                                                    {
                                                        Header: 'Is Winner',
                                                        accessor: 'lottery_winner_type_id',
                                                        Cell: props => (
                                                            <div className="d-block w-100 text-center">
                                                                {props.original.pivot.lottery_winner_type_id ? 'Yes' : 'No'}
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        Header: 'Lottery Number',
                                                        accessor: 'lottery_number',
                                                        Cell: props => (
                                                            <div className="d-block w-100 text-center">
                                                                {props.original.pivot.lottery_number}
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        Header: 'Won Amount',
                                                        accessor: 'won_amount',
                                                        Cell: props => (
                                                            <div className="d-block w-100 text-center">
                                                                {props.original.pivot.won_amount}
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        Header: 'Service Charge',
                                                        accessor: 'service_charge',
                                                        Cell: props => (
                                                            <div className="d-block w-100 text-center">
                                                                {props.original.pivot.service_charge}
                                                            </div>
                                                        ),
                                                    },
                                                ]
                                            },
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

LotterySlotDetail.propTypes = {
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
})(LotterySlotDetail));