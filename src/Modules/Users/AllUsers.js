import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";

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

import avatar2 from '../../assets/utils/images/avatars/2.jpg';

import {makeData} from "./utils";
import {MESSAGES} from "../../constants/messages";


class AllUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: 300,
            perPage: 10,
            isLoading: false
        };

        this.getActionsHeader = this.getActionsHeader.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    handleSelect () {

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
                    <DropdownItem>
                        <i className="dropdown-icon lnr-book"> </i>
                        <span>Activate</span>
                    </DropdownItem>
                    <DropdownItem>
                        <i className="dropdown-icon lnr-inbox"> </i>
                        <span>Edit</span>
                    </DropdownItem>
                    <DropdownItem>
                        <i className="dropdown-icon lnr-file-empty"> </i>
                        <span>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        );
        return <div> Actions {dropDown} </div>;
    };

    async fetchData(state, instance) {
        const query = "";
        console.log(state, instance);
        this.setState({isLoading: true});
        await this.props.makeRequest(request.Users.get, query, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                console.log("all users get response", responseData);
                if (responseData.data) {
                    this.setState({
                        data: responseData.data,
                        pages: responseData.meta.total,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        data: [],
                        pages: 0,
                        isLoading: false
                    });
                }
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.resetFields();
                this.setState({isLoading: false});
            }
        );
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
                            heading="All Users"
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
                                                        Header: <input type="checkbox" />,
                                                        Cell: <input type="checkbox" />,
                                                        filterable: false,
                                                        width: 40
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
                                                                { console.log('prosp', props)}
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <div className="widget-content-left">
                                                                                <img width={52} className="rounded-circle"
                                                                                     src={props.original.profile_pic}
                                                                                     alt=""/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="widget-content-left flex2">
                                                                            <div className="widget-heading">
                                                                                {props.value}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: 'Email',
                                                        accessor: 'email'
                                                    },
                                                    {
                                                        Header: 'Role',
                                                        accessor: 'roles',
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                { row.value && row.value[0].label }
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        Header: 'Status',
                                                        accessor: 'is_active',
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                { row.value ? 'Active' : 'Inactive' }
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
                                                        Cell: row => (
                                                            <div className="d-block w-100 text-center">
                                                                <UncontrolledButtonDropdown>
                                                                    <DropdownToggle caret
                                                                                    className="btn-icon btn-icon-only btn btn-link"
                                                                                    color="link">
                                                                        <i className="lnr-menu-circle btn-icon-wrapper"/>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu
                                                                        className="rm-pointers dropdown-menu-hover-link">
                                                                        <DropdownItem>
                                                                            <i className="dropdown-icon lnr-book"> </i>
                                                                            <span>Activate</span>
                                                                        </DropdownItem>
                                                                        <DropdownItem>
                                                                            <i className="dropdown-icon lnr-inbox"> </i>
                                                                            <span>Edit</span>
                                                                        </DropdownItem>
                                                                        <DropdownItem>
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
                                        // manual // Forces table not to paginate or sort automatically, so we can handle it server-side
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
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

AllUsers.propTypes = {
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
})(AllUsers));