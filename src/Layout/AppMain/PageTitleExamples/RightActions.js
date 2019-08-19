import React, {Component, Fragment} from 'react';

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, Nav, NavItem, NavLink,
    Button,
    UncontrolledTooltip
} from 'reactstrap';

import {
    faFileExport,
    faFileDownload

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../actions/requestAction";
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";

class RightActions extends Component {
    constructor() {
        super();

        this.state = {
            activeButton: "export" // export/ download
        };
        this.exportUsers = this.exportUsers.bind(this);
        this.downloadUsers = this.downloadUsers.bind(this);
    }

    async exportUsers() {

        await this.props.makeRequest(request.Users.export, {}, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data && responseData.data.download_url) {
                    this.setState({
                        downloadUrl: responseData.data.download_url,
                        activeButton: "download"
                    })
                }
            },
            (errorData) => {
            }
        );

    }

    downloadUsers() {
    }

    render() {
        const {match} = this.props;
        const {downloadUrl, activeButton} = this.state;
        return (
            <Fragment>
                {
                    match.url === '/users/all' &&

                    <div>
                        {
                            downloadUrl && activeButton ?
                            <a className="btn-shadow mr-3" href={downloadUrl} onClick={this.downloadUsers} color="green"
                                    id="Tooltip-123">
                                <FontAwesomeIcon icon={faFileDownload}/> Download CSV
                            </a> :
                            <Button className="btn-shadow mr-3" onClick={this.exportUsers} color="light"
                                    id="Tooltip-123">
                                <FontAwesomeIcon icon={faFileExport}/> Export Users
                            </Button>
                        }
                    </div>
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(RightActions));