import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Loader} from "react-loaders";

import PageTitle from "../../Layout/AppMain/PageTitle";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";

class NewPermission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            label: "",
            error: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    resetFields() {
        this.setState({
            name: "",
            label: "",
        })
    }

    handleChange(e) {
        if (e.target && e.target.name) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleSubmit(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const {
            name, label
        } = this.state;

        const data = {
            name: name,
            label: label,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Permissions.create, data, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.props.history.push("/users/permissions");
            },
            (err) => {
                this.setState({error: err.message});
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {
            name, label, isLoading, error
        } = this.state;

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
                            heading="Add New Permission"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>New Permission Form</CardTitle>
                                    <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                        { error && <p className="text-danger">{error}</p>}
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
                                        </Row>
                                        <Row className="divider"/>
                                        <div className="d-flex align-items-center">
                                            <Button color="primary" size="lg">
                                                {isLoading ?
                                                    <Loader type="ball-beat" style={{transform: 'scale(0.3)'}}
                                                            color="white"/>
                                                    :
                                                    "Add New Permission"
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

NewPermission.propTypes = {
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
})(NewPermission));