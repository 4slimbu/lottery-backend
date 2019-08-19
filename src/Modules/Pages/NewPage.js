import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {Loader} from "react-loaders";
import {Editor} from "@tinymce/tinymce-react";

import PageTitle from "../../Layout/AppMain/PageTitle";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import {MESSAGES} from "../../constants/messages";

class NewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            slug: "",
            content: "",
            error: "",
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleEditorChange = (e) => {
        this.setState({
            content: e.target.getContent()
        });
    };

    resetFields() {
        this.setState({
            title: "",
            slug: "",
            content: "",
            error: "",
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
            title, slug, content
        } = this.state;

        const data = {
            title: title ? title : undefined,
            slug: slug ? slug : undefined,
            content: content ? content : undefined,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Pages.create, data, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.props.history.push("/pages/all");
            },
            (errorData) => {
                this.setState({error: errorData.message});
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const {
            title, slug, content, isLoading
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
                            heading="Add Page"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Add Page Form </CardTitle>

                                    <AvForm onSubmit={this.handleSubmit} model={this.state}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="title"
                                                                 label="Title"
                                                                 type="text"
                                                                 placeholder="Title..."
                                                                 onChange={this.handleChange}
                                                                 value={title}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <AvField name="slug"
                                                                 label="Slug"
                                                                 type="text"
                                                                 placeholder="Slug..."
                                                                 onChange={this.handleChange}
                                                                 value={slug}
                                                        />
                                                    </AvGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <AvGroup>
                                                        <label>Content</label>
                                                        <Editor
                                                            value={content}
                                                            init={{
                                                                plugins: 'link image code',
                                                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                            }}
                                                            onChange={this.handleEditorChange}
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
                                                    "Create Page"
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

NewPage.propTypes = {
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
})(NewPage));