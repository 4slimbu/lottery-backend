import React, {Fragment} from 'react';

import Ionicon from 'react-ionicons';

import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    DropdownToggle, DropdownMenu,
    Nav, Col, Row, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';
import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../../actions/authActions";

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

        this.logoutHandler = this.logoutHandler.bind(this);
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    logoutHandler() {
        const {logout, history} = this.props;

        logout();
        history.push('/');
    }

    render() {
        const {history} = this.props;
        const {user} = this.props.auth;
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={user.profile_pic} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">
                                                <div className="menu-header-image opacity-2"
                                                     style={{
                                                         backgroundImage: 'url(' + city3 + ')'
                                                     }}
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle" src={user.profile_pic}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    {user.full_name}
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button className="btn-pill btn-shadow btn-shine"
                                                                        color="focus"
                                                                        onClick={this.logoutHandler}
                                                                >
                                                                    Logout
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-menu grid-menu-2col">
                                            <Row className="no-gutters">
                                                <Col sm="12">
                                                    <Button
                                                        onClick={() => history.push('/users/profile')}
                                                        className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                        outline color="warning">
                                                        <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"> </i>
                                                        My Profile
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {user.full_name}
                                </div>
                                <div className="widget-subheading">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
    }
}

export default withRouter(connect(mapStateToProps, {
    logout,
})(UserBox));