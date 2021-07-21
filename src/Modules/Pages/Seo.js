import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import request from "../../services/request";
import Rodal from 'rodal';
import {Loader} from 'react-loaders';

import {Button, Col, FormGroup, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {MESSAGES} from "../../constants/messages";
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import * as _ from "lodash";

class Seo extends Component {
    constructor() {
        super();
        this.state = {
            seo: {},
            isLoading: false,
            isUpdating: false,
            isVisible: false,
            error: "",
            success: ""
        };

        this.refreshData = this.refreshData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getField = this.getField.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    async refreshData() {
        this._isMounted = true;

        const {seoData} = this.props;
        if (seoData && seoData.id) {
            this.setState({isLoading: true});
            this._isMounted && await this.props.makeRequest(request.Seo.get, seoData.id, {message: MESSAGES.LOGGING}).then(
                (res) => {
                    if (res.data) {
                        this.setState({
                            seo: res.data
                        });

                    }
                    this.setState({isLoading: false});
                },
                (errorData) => {
                    this.setState({isLoading: false});
                }
            );
        }


    }

    handleChange(e) {
        this.setState({
            seo: {
                ...this.state.seo,
                [e.target.name]: e.target.value
            }
        });
    }

    async handleSave() {
        const {pageId} = this.props;
        const {seo} = this.state;

        this.setState({isUpdating: true});
        if (_.isEmpty(seo)) {
            this.setState({error: "No changes to save"});
            return;
        }

        seo.page_id = pageId;
        await this.props.makeRequest(request.Seo.save, seo, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                this.setState({isUpdating: false, success: "Saved"});
            },
            (errorData) => {
                this.setState({isUpdating: false, error: "Something went wrong"});
            }
        );
    }

    getField(fieldName) {
        const {seo} = this.state;
        const {seoData} = this.props;

        return seo && seo[fieldName] ? seo[fieldName] : (seoData && seoData[fieldName] ? seoData[fieldName] : '');
    }

    toggleModal() {
        this.setState({isVisible: ! this.state.isVisible}, function() {
            if (this.state.isVisible) {
                this.refreshData();
            }
        });
        this.setState({error: ''});
    }

    render() {
        const {isUpdating, isVisible, error, success} = this.state;

        return (
            <Fragment>
                <Button outline color="secondary" size="md" onClick={this.toggleModal}>SEO settings</Button>
                <Rodal visible={isVisible}
                       onClose={this.toggleModal}
                       animation={"fade"}
                       showMask={true}
                       width={600}
                >
                    <ModalHeader>SEO settings</ModalHeader>
                    <ModalBody>
                        <div style={{height: 300, overflowY: 'scroll'}}>
                            <AvForm onSubmit={this.handleSave}>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="meta_title"
                                                         label="Meta Title"
                                                         type="text"
                                                         placeholder="Meta Title..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('meta_title')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="meta_description"
                                                         label="Meta Description"
                                                         type="text"
                                                         placeholder="Meta Description..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('meta_description')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="og_title"
                                                         label="Og Title"
                                                         type="text"
                                                         placeholder="og:title ..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('og_title')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="og_description"
                                                         label="Og Description"
                                                         type="text"
                                                         placeholder="og:description ..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('og_description')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="og_image"
                                                         label="Og Image"
                                                         type="text"
                                                         placeholder="og:image ..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('og_image')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="twitter_title"
                                                         label="Twitter Title"
                                                         type="text"
                                                         placeholder="twitter:title ..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('twitter_title')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="twitter_description"
                                                         label="Twitter Description"
                                                         type="text"
                                                         placeholder="twitter:description ..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('twitter_description')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <AvGroup>
                                                <AvField name="twitter_image"
                                                         label="Twitter Image"
                                                         type="text"
                                                         placeholder="twitter:image ..."
                                                         onChange={this.handleChange}
                                                         value={this.getField('twitter_image')}
                                                />
                                            </AvGroup>
                                        </FormGroup>
                                    </Col>
                                    {error && <div><span className="text-danger">{error}</span></div>}
                                    {success && <div><span className="text-success">{success}</span></div>}
                                </Row>
                            </AvForm>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={this.toggleModal}>Cancel</Button>
                        <Button color="primary" onClick={this.handleSave}>
                            { isUpdating ?
                                <Loader type="ball-beat" style={{transform: 'scale(0.3)'}} color="white"/>
                                :
                                "Save"
                            }
                        </Button>
                    </ModalFooter>
                </Rodal>
            </Fragment>
        )
    }
}

Seo.propTypes = {
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
})(Seo));