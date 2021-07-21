import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Row} from 'reactstrap';
import {AvCheckbox, AvCheckboxGroup, AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Loader} from "react-loaders";
import * as _ from "lodash";

import PageTitle from "../../Layout/AppMain/PageTitle";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";

const PermissionList = (props) => {
    const {permissions, selectedPermissionIds, handleCheckBox} = props;
    return _.map(permissions, function (permission, index) {
        return (
            <AvCheckbox key={index}
                        label={permission.label}
                        value={permission.id}
                        checked={selectedPermissionIds.indexOf(permission.id) !== -1}
                        onChange={() => handleCheckBox(permission.id)}
            />
        )
    })
};


class EditRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            label: "",
            permissions: [],
            selectedPermissionIds: [],
            error: "",
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        const {id} = this.props.match.params;

        if (! id) {
            this.props.history.push("/users/roles/all");
        }

        // Load Permissions
        let query = "&limit=500";

        this.setState({isLoading: true});
        this._isMounted && await this.props.makeRequest(request.Permissions.all, query, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.setState({
                        permissions: res.data,
                    });
                }
                this.setState({isLoading: false});
            },
            (err) => {
                this.setState({isLoading: false});
            }
        );

        // Load Role
        this.setState({isLoading: true});
        this._isMounted && await this.props.makeRequest(request.Roles.get, id, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.setState({
                        name: res.data.name,
                        label: res.data.label,
                        selectedPermissionIds: _.map(res.data.permissions, 'id')
                    });
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    resetFields() {
        this.setState({
            name: "",
            label: "",
            permissions: [],
            selectedPermissionIds: [],
        })
    }

    handleChange(e) {
        if (e.target && e.target.name) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleCheckBox(permissionId) {
        let selectedPermissionIds = [...this.state.selectedPermissionIds];
        let index = selectedPermissionIds.indexOf(permissionId);
        if (index !== -1) {
            selectedPermissionIds.splice(index, 1);
        } else {
            selectedPermissionIds.push(permissionId);
        }

        this.setState({
            selectedPermissionIds: [...selectedPermissionIds]
        });
    }

    handleSubmit(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const {
            name, label, selectedPermissionIds
        } = this.state;

        const {id} = this.props.match.params;

        const data = {
            id: id,
            name: name,
            label: label,
            permission_ids: selectedPermissionIds
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Roles.update, data, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.props.history.push("/users/roles");
            },
            (err) => {
                this.setState({error: err.message});
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {
            name, label, permissions, selectedPermissionIds, isLoading, error
        } = this.state;

        const PermissionListProps = {
            permissions: permissions,
            selectedPermissionIds: selectedPermissionIds,
            handleCheckBox: this.handleCheckBox
        };

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
                            heading="Edit Role"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Edit Role Form</CardTitle>
                                    <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                        {error && <p className="text-danger">{error}</p>}
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="name"
                                                                 label="Name"
                                                                 type="text"
                                                                 placeholder="Name..."
                                                                 onChange={this.handleChange}
                                                                 value={name}
                                                                 validate={{
                                                                     required: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter a name'
                                                                     }
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="label"
                                                                 label="Label"
                                                                 type="text"
                                                                 placeholder="Label..."
                                                                 onChange={this.handleChange}
                                                                 value={label}
                                                                 validate={{
                                                                     required: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter a Label'
                                                                     }
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvCheckboxGroup inline name="permissions" label="Permissions">
                                                            {
                                                                permissions.length > 0 &&
                                                                <PermissionList {...PermissionListProps}/>
                                                            }
                                                        </AvCheckboxGroup>
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="divider"/>
                                        <div className="d-flex align-items-center">
                                            <Button color="primary" size="lg">
                                                {isLoading ?
                                                    <Loader type="ball-beat" style={{transform: 'scale(0.3)'}}
                                                            color="white"/>
                                                    :
                                                    "Update Role"
                                                }
                                            </Button>
                                        </div>
                                    </AvForm>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Container fluid>

                    </Container>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

EditRole.propTypes = {
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
})(EditRole));