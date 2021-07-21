import React, {Fragment, Component} from "react";
import PropTypes from "prop-types";

import Slider from "react-slick";
import bg1 from '../../../assets/utils/images/originals/city.jpg';
import bg2 from '../../../assets/utils/images/originals/citydark.jpg';
import bg3 from '../../../assets/utils/images/originals/citynights.jpg';

import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio} from 'availity-reactstrap-validation';
import request from "../../../services/request";
import {MESSAGES} from "../../../constants/messages";
import {makeRequest} from "../../../actions/requestAction";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Loader} from 'react-loaders';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            recoveryEmail: "",
            passwordResetCode: "",
            newPassword: "",
            confirmNewPassword: "",
            error: "",
            activeScreen: "login", // login | sendRecoveryEmail | resetPassword
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSendRecoveryEmail = this.handleSendRecoveryEmail.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.activateScreen = this.activateScreen.bind(this);
    }

    activateScreen(screen) {
        this.setState({error:"", activeScreen: screen});
    };

    resetFields() {
        this.setState({
            email: "",
            password: "",
            recoveryEmail: "",
            passwordResetCode: "",
            newPassword: "",
            confirmNewPassword: "",
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.login, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.props.history.push("/");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.resetFields();
                this.setState({isLoading: false});
            }
        );
    }

    handleSendRecoveryEmail(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.recoveryEmail,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.forgotPassword, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.resetFields();
                this.setState({activeScreen: "resetPassword", isLoading: false});
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.resetFields();
                this.setState({isLoading: false});
            }
        );
    }

    handleResetPassword(event, errors, values) {
        if (errors.length > 0) {
            return;
        }

        const data = {
            email: this.state.recoveryEmail,
            token: this.state.passwordResetCode,
            password: this.state.newPassword,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Auth.resetPassword, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.resetFields();
                this.setState({activeScreen: "login", isLoading: false});
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.resetFields();
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            initialSlide: 0,
            autoplay: true,
            adaptiveHeight: true

        };

        const {error, email, password, recoveryEmail, passwordResetCode, newPassword, confirmNewPassword, isLoading, activeScreen} = this.state;
        return (

            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">
                        <Col lg="4" className="d-none d-lg-block">
                            <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg1 + ')'
                                             }}/>
                                        <div className="slider-content">
                                            <h3>Perfect Balance</h3>
                                            <p>
                                                Lottery App is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap Components and Elements.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg3 + ')'
                                             }}/>
                                        <div className="slider-content">
                                            <h3>Scalable, Modular, Consistent</h3>
                                            <p>
                                                Easily exclude the components you don't require. Lightweight, consistent
                                                Bootstrap based styles across all elements and components
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                        <div className="slide-img-bg opacity-6"
                                             style={{
                                                 backgroundImage: 'url(' + bg2 + ')'
                                             }}/>
                                        <div className="slider-content">
                                            <h3>Complex, but lightweight</h3>
                                            <p>
                                                We've included a lot of components that cover almost all use cases for
                                                any type of application.
                                            </p>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                        <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                <div className="app-logo"/>
                                {/*============== Login Screen ==================*/}
                                {
                                    activeScreen === "login" &&
                                    <div>
                                        { error && <p className="text-danger">{error}</p>}
                                        <h4 className="mb-0">
                                            <span>Please sign in to your account.</span>
                                        </h4>
                                        <Row className="divider"/>
                                        <div>
                                            <AvForm onSubmit={this.handleLogin}>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="email"
                                                                         label="Email"
                                                                         type="email"
                                                                         placeholder="Email here..."
                                                                         onChange={this.handleChange}
                                                                         value={email}
                                                                         validate={{
                                                                             email: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a valid email address'
                                                                             },
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter an email address'
                                                                             }
                                                                         }}
                                                                />
                                                                <AvFeedback/>
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="password"
                                                                         label="Password"
                                                                         type="password"
                                                                         placeholder="Enter your password..."
                                                                         onChange={this.handleChange}
                                                                         value={password}
                                                                         validate={{
                                                                             required: {value: true, errorMessage: 'Please enter your password'},
                                                                             minLength: {value: 6, errorMessage: 'Your name must be at least 6 characters'},
                                                                         }}
                                                                />
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                {/*<FormGroup check>*/}
                                                {/*<Input type="checkbox" name="check" id="exampleCheck"/>*/}
                                                {/*<Label for="exampleCheck" check>Keep me logged in</Label>*/}
                                                {/*</FormGroup>*/}
                                                <Row className="divider"/>
                                                <div className="d-flex align-items-center">
                                                    <div className="ml-auto">
                                                        <a href="javascript:void(0);" onClick={() => this.activateScreen("sendRecoveryEmail")} className="btn-lg btn btn-link">Recover
                                                            Password</a>{' '}{' '}
                                                        <Button color="primary" size="lg">
                                                            { isLoading ?
                                                                <Loader type="ball-beat" style={{transform: 'scale(0.3)'}} color="white"/>
                                                                :
                                                                "Login to Dashboard"
                                                            }
                                                        </Button>
                                                    </div>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                }

                                {/*============== Send Password Recovery Email Screen ==================*/}
                                {
                                    activeScreen === "sendRecoveryEmail" &&
                                    <div>
                                        { error && <p className="text-danger">{error}</p>}
                                        <h4 className="mb-0">
                                            <span>Please enter your email address to recover your password</span>
                                        </h4>
                                        <Row className="divider"/>
                                        <div>
                                            <AvForm onSubmit={this.handleSendRecoveryEmail}>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="recoveryEmail"
                                                                         label="Recovery Email"
                                                                         type="email"
                                                                         placeholder="Recovery Email here..."
                                                                         onChange={this.handleChange}
                                                                         value={recoveryEmail}
                                                                         validate={{
                                                                             email: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a valid email address'
                                                                             },
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter an email address'
                                                                             }
                                                                         }}
                                                                />
                                                                <AvFeedback/>
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="divider"/>
                                                <div className="d-flex align-items-center">
                                                    <div className="ml-auto">
                                                        <a href="javascript:void(0);" onClick={() => this.activateScreen("login")} className="btn-lg btn btn-link">Go Back</a>{' '}{' '}
                                                        <a href="javascript:void(0);" onClick={() => this.activateScreen("resetPassword")} className="btn-lg btn btn-link">Skip to Password Reset Screen</a>{' '}{' '}
                                                        <Button color="primary" size="lg">
                                                            { isLoading ?
                                                                <Loader type="ball-beat" style={{transform: 'scale(0.3)'}} color="white"/>
                                                                :
                                                                "Send Recovery Email"
                                                            }
                                                        </Button>
                                                    </div>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                }

                                {/*============== Password Reset Screen ==================*/}
                                {
                                    activeScreen === "resetPassword" &&
                                    <div>
                                        { error && <p className="text-danger">{error}</p>}
                                        <h4 className="mb-0">
                                            <span>Please enter the password reset code and your new password</span>
                                        </h4>
                                        <Row className="divider"/>
                                        <div>
                                            <AvForm onSubmit={this.handleResetPassword}>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="passwordResetCode"
                                                                         label="Password Reset Code"
                                                                         type="text"
                                                                         placeholder="Enter your reset code..."
                                                                         onChange={this.handleChange}
                                                                         value={passwordResetCode}
                                                                         validate={{
                                                                             required: {value: true, errorMessage: 'Please enter your password reset code'},
                                                                             minLength: {value: 8, errorMessage: 'Invalid code'},
                                                                         }}
                                                                />
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="recoveryEmail"
                                                                         label="Recovery Email"
                                                                         type="email"
                                                                         placeholder="Recovery Email here..."
                                                                         onChange={this.handleChange}
                                                                         value={recoveryEmail}
                                                                         validate={{
                                                                             email: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a valid email address'
                                                                             },
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter an email address'
                                                                             }
                                                                         }}
                                                                />
                                                                <AvFeedback/>
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="newPassword"
                                                                         label="New Password"
                                                                         type="password"
                                                                         placeholder="Enter your password..."
                                                                         onChange={this.handleChange}
                                                                         value={newPassword}
                                                                         validate={{
                                                                             required: {value: true, errorMessage: 'Please enter your password'},
                                                                             minLength: {value: 6, errorMessage: 'Your name must be at least 6 characters'},
                                                                         }}
                                                                />
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="confirmPassword"
                                                                         label="Confirm New Password"
                                                                         type="password"
                                                                         placeholder="Confirm your password..."
                                                                         onChange={this.handleChange}
                                                                         value={confirmNewPassword}
                                                                         validate={{
                                                                             required: {value: true, errorMessage: 'Please enter your password'},
                                                                             match: {value: "newPassword", errorMessage: 'Password and Confirm Password must match'},
                                                                         }}
                                                                />
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="divider"/>
                                                <div className="d-flex align-items-center">
                                                    <div className="ml-auto">
                                                        <a href="javascript:void(0);" onClick={() => this.activateScreen("sendRecoveryEmail")} className="btn-lg btn btn-link">Go Back</a>{' '}{' '}
                                                        <Button color="primary" size="lg">
                                                            { isLoading ?
                                                                <Loader type="ball-beat" style={{transform: 'scale(0.3)'}} color="white"/>
                                                                :
                                                                "Reset Password"
                                                            }
                                                        </Button>
                                                    </div>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                }
                            </Col>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
}
}


Login.propTypes = {
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
})(Login));