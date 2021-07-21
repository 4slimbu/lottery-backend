import React, {Fragment, Component} from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Row, Card, CardBody,
    CardTitle, Button, FormGroup, Label, Container
} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import {Loader} from "react-loaders";
import cx from 'classnames';
import * as _ from "lodash";

import PageTitle from "../../Layout/AppMain/PageTitle";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";
import {Cropper} from "react-image-cropper";

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "",
            contactNumber: "",
            verified: "",
            isActive: "",
            profilePictureFile: "",
            profilePicture: "",
            error: "",
            role: "",
            roles: "",
            isLoading: false,
            files: [],
            editMode: "pick", // pick | crop | done
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        const {id} = this.props.match.params;

        if (! id) {
            this.props.history.push("/users/all");
        }

        this.setState({isLoading: true});
        this._isMounted && await this.props.makeRequest(request.Roles.all, '', {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.setState({
                        roles: responseData.data,
                    });
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        this._isMounted && await this.props.makeRequest(request.Users.get, id, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.setState({
                        username: res.data.username,
                        email: res.data.email,
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        gender: res.data.gender,
                        contactNumber: res.data.contact_number,
                        verified: res.data.verified,
                        isActive: res.data.is_active,
                        profilePicture: res.data.profile_pic,
                        role: res.data.roles.length > 0 ? res.data.roles[0].id : '',
                        editMode: "done"
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
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "",
            contactNumber: "",
            verified: "",
            isActive: "",
            profilePicture: "",
            role: "",
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
        event.preventDefault();
        if (errors.length > 0) {
            return;
        }

        const {
            username, email, password, firstName, lastName, gender, contactNumber, verified,
            isActive, profilePicture, role
        } = this.state;

        const {id} = this.props.match.params;

        const data = {
            id: id,
            username: username ? username : undefined,
            email: email ? email : undefined,
            password: password ? password : undefined,
            first_name: firstName ? firstName : undefined,
            last_name: lastName ? lastName : undefined,
            gender: gender ? gender: undefined,
            contact_number: contactNumber ? contactNumber : undefined,
            verified: verified ? verified : undefined,
            is_active: isActive ? isActive : undefined,
            profile_picture: profilePicture ? profilePicture : undefined,
            role: role ? role: undefined,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Users.update, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.props.history.push("/users/all");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    handleSwitch(field) {
        this.setState({
            [field]: !this.state[field]
        });
    }

    handleImageLoaded() {
        this.setState({
            editMode: "crop"
        })
    }

    handleClick(state) {
        let node = this[state];
        this.setState({
            profilePicture: node.crop(),
            editMode: "done"
        })
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                profilePictureFile: file,
                profilePicture: reader.result,
                editMode: "crop"
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        const {
            username, email, password, confirmPassword, firstName, lastName, gender, contactNumber, verified,
            isActive, profilePicture, role, isLoading, editMode, roles
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
                            heading="Edit User"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Edit User Form </CardTitle>

                                    <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="username"
                                                                 label="Username"
                                                                 type="text"
                                                                 placeholder="Username..."
                                                                 onChange={this.handleChange}
                                                                 value={username}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
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
                                                                 autoComplete={false}
                                                                 validate={{
                                                                     minLength: {
                                                                         value: 6,
                                                                         errorMessage: 'Your name must be at least 6 characters'
                                                                     },
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="confirmPassword"
                                                                 label="Confirm Password"
                                                                 type="password"
                                                                 placeholder="Confirm your password..."
                                                                 onChange={this.handleChange}
                                                                 value={confirmPassword}
                                                                 validate={{
                                                                     match: {
                                                                         value: 'password',
                                                                         errorMessage: 'Password and Confirm Password must match'
                                                                     },
                                                                 }}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="firstName"
                                                                 label="First Name"
                                                                 type="text"
                                                                 placeholder="First Name ..."
                                                                 onChange={this.handleChange}
                                                                 value={firstName}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="lastName"
                                                                 label="Last Name"
                                                                 type="text"
                                                                 placeholder="Last Name ..."
                                                                 onChange={this.handleChange}
                                                                 value={lastName}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="contactNumber"
                                                                 label="Contact Number"
                                                                 type="text"
                                                                 placeholder="Contact Number ..."
                                                                 onChange={this.handleChange}
                                                                 value={contactNumber}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>Gender:</Label>
                                                    <AvGroup>
                                                        <AvRadioGroup inline name="gender"
                                                                      onChange={this.handleChange}
                                                                      value={gender}
                                                        >
                                                            <AvRadio label="Male" value="male"/>
                                                            <AvRadio label="Female" value="female"/>
                                                        </AvRadioGroup>
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <Label>Is Active:</Label>
                                                <FormGroup>
                                                    <div className="switch has-switch mb-2 mr-2" data-on-label="Active"
                                                         data-off-label="Inactive"
                                                         onClick={() => this.handleSwitch('isActive')}>
                                                        <div className={cx("switch-animate", {
                                                            'switch-on': isActive,
                                                            'switch-off': !isActive
                                                        })}>
                                                            <input type="checkbox"/><span
                                                            className="switch-left bg-success">&nbsp;</span><label>&nbsp;</label><span
                                                            className="switch-right bg-success">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <Label>Is Verified:</Label>
                                                <FormGroup>
                                                    <div className="switch has-switch mb-2 mr-2"
                                                         data-on-label="Verified"
                                                         data-off-label="Unverified"
                                                         onClick={() => this.handleSwitch('verified')}>
                                                        <div className={cx("switch-animate", {
                                                            'switch-on': verified,
                                                            'switch-off': !verified
                                                        })}>
                                                            <input type="checkbox"/><span
                                                            className="switch-left bg-success">&nbsp;</span><label>&nbsp;</label><span
                                                            className="switch-right bg-success">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={4}>
                                                        <FormGroup>
                                                            <AvField type="select" name="role" label="Role"
                                                                     selected={role}
                                                                     onChange={(e) => this.setState({role: e.target.value})}
                                                            >
                                                                <option value="">--Select Role--</option>
                                                                {
                                                                    _.map(roles, function (role, index) {
                                                                        return <option key={index} value={role.id}>{role.label}</option>
                                                                    })
                                                                }
                                                            </AvField>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={3}>
                                                        <FormGroup>
                                                            <AvGroup>
                                                                <AvField name="profilePicture"
                                                                         label="Profile Picture"
                                                                         type="file"
                                                                         placeholder="Profile Picture"
                                                                         onChange={(e) => this.handleImageChange(e)}
                                                                />
                                                                {
                                                                    editMode === "crop" &&
                                                                    <div>
                                                                        <Cropper src={profilePicture}
                                                                                 ref={ref => {
                                                                                     this.image = ref
                                                                                 }}
                                                                                 onImgLoad={() => this.handleImageLoaded()}
                                                                        />

                                                                        <div className="divider"/>

                                                                        <div className="text-center">
                                                                            <Button color="primary"
                                                                                    onClick={() => this.handleClick('image')}
                                                                            >
                                                                                Crop
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                }

                                                                {
                                                                    editMode === "done" &&
                                                                    <Col md={6}>
                                                                        <img
                                                                            className="after-img rounded"
                                                                            src={profilePicture}
                                                                            alt=""
                                                                        />
                                                                    </Col>
                                                                }
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="divider"/>
                                        <div className="d-flex align-items-center">
                                            <Button color="primary" size="lg">
                                                {isLoading ?
                                                    <Loader type="ball-beat" style={{transform: 'scale(0.3)'}}
                                                            color="white"/>
                                                    :
                                                    "Update User"
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

EditUser.propTypes = {
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
})(EditUser));