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

class NewCurrency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currency: "",
            valueInBits: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
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
            currency: "",
            valueInBits: 1,
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
        let index = selectedPermissionIds.indexOf(permissionId) !== -1;
        if (index) {
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
            currency, valueInBits
        } = this.state;

        const data = {
            currency: currency,
            value_in_bits: valueInBits,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Currencies.create, data, {message: MESSAGES.LOGGING}).then(
            (res) => {
                this.props.history.push("/currencies/all");
            },
            (err) => {
                this.setState({error: err.message});
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {
            currency, valueInBits, isLoading, error
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
                            heading="Add New Currency"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>New Currency Form</CardTitle>
                                    <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                        {error && <p className="text-danger">{error}</p>}
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="currency"
                                                                 label="Currency"
                                                                 type="text"
                                                                 placeholder="Currency e.g: USD..."
                                                                 onChange={this.handleChange}
                                                                 value={currency}
                                                                 validate={{
                                                                     required: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter Currency e.g: USD'
                                                                     }
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="valueInBits"
                                                                 label="Value In Bits"
                                                                 type="text"
                                                                 placeholder="Value in Bits. e.g: 100..."
                                                                 onChange={this.handleChange}
                                                                 value={valueInBits}
                                                                 validate={{
                                                                     required: {
                                                                         value: true,
                                                                         errorMessage: 'Please enter value in Bits. e.g: 100 '
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
                                                    "Add New Currency"
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

NewCurrency.propTypes = {
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
})(NewCurrency));