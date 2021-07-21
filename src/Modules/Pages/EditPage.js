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
import Seo from "./Seo";

class EditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: "",
            slug: "",
            content: "",
            error: "",
            seo: null,
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        const {id} = this.props.match.params;

        if (!id) {
            this.props.history.push("/pages/all");
        }

        this.setState({isLoading: true});

        this._isMounted && await this.props.makeRequest(request.Pages.get, id, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.setState({
                        id: res.data.id,
                        title: res.data.title,
                        slug: res.data.slug,
                        content: res.data.content,
                        seo: res.data.seo
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

    handleEditorChange = (e) => {
        this.setState({
            content: e.target.getContent()
        });
    };

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
            id, title, slug, content
        } = this.state;

        const data = {
            id: id,
            title: title ? title : undefined,
            slug: slug ? slug : undefined,
            content: content ? content : undefined,
        };

        this.setState({isLoading: true});
        this.props.makeRequest(request.Pages.update, data, {message: MESSAGES.LOGGING}).then(
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
            id, title, slug, isLoading, content, seo
        } = this.state;

        const seoProps = {
            seoData: seo,
            pageId: id
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
                            heading="Edit Page"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Edit Page Form </CardTitle>

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
                                            <Col md={12}>
                                                <Seo {...seoProps} />
                                            </Col>
                                        </Row>
                                        <Row className="divider"/>
                                        <div className="d-flex align-items-center">
                                            <Button color="primary" size="lg">
                                                {isLoading ?
                                                    <Loader type="ball-beat" style={{transform: 'scale(0.3)'}}
                                                            color="white"/>
                                                    :
                                                    "Update Page"
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

EditPage.propTypes = {
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
})(EditPage));