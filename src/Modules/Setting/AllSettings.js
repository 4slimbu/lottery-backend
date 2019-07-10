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


class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: 1,
            perPage: 10,
            isLoading: false,
            isUpdating: false,
            selectedItem: {},
            showQuickEditBox: false,
            reactTableState: {},
            quickEdit: {
                status: 0
            }
        };

        this.getActionsHeader = this.getActionsHeader.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showQuickEditBox = this.showQuickEditBox.bind(this);
        this.cancelQuickEdit = this.cancelQuickEdit.bind(this);
        this.handleQuickEdit = this.handleQuickEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                [e.target.name]: e.target.value
            }
        });
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

        await this.props.makeRequest(request.Setting.all, query, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.setState({
                        data: responseData.data,
                        pages: responseData.meta.last_page,
                        isLoading: false,
                        selectedItem: {}
                    });
                } else {
                    this.setState({
                        data: [],
                        pages: 0,
                        isLoading: false,
                        selectedItem: {}
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    showQuickEditBox(item = null) {
        if (item) {
            this.setState({selectedItem: item});
        }
        this.setState({showQuickEditBox: true});
    }

    cancelQuickEdit() {
        this.setState({showQuickEditBox: false});
    }

    async handleQuickEdit() {
        const {selectedItem} = this.state;
        const data = {
            id: selectedItem.id,
            value: selectedItem.value,
        };

        this.setState({isUpdating: true});

        await this.props.makeRequest(request.Setting.update, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.setState({isUpdating: false});
                this.fetchData(this.state.reactTableState);
            },
            (errorData) => {
                this.setState({isUpdating: false});
            }
        );

    }

    render() {
        const {data, pages, perPage, isLoading, isUpdating, selectedItem} = this.state;

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
                            heading="All Settings"
                            subheading="View and update all the settings"
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
                                                        Header: 'Label',
                                                        accessor: 'label',
                                                    },
                                                    {
                                                        Header: 'Key',
                                                        accessor: 'key',
                                                    },
                                                    {
                                                        Header: 'Value',
                                                        accessor: 'value',
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
                                                                        <DropdownItem onClick={() => this.showQuickEditBox(props.original)}>
                                                                            <i className="dropdown-icon lnr-inbox"> </i>
                                                                            <span>Quick Edit</span>
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
                                                <AvField type="text" name="value" label={selectedItem.label}
                                                         onChange={this.handleChange}
                                                         value={selectedItem.value}
                                                />
                                                <div><small>{ selectedItem.comment }</small></div>
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

Settings.propTypes = {
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
})(Settings));