import {Redirect, Route, withRouter} from 'react-router-dom';
import React, {Component, Fragment, lazy, Suspense} from 'react';
import Loader from 'react-loaders'

import {ToastContainer,} from 'react-toastify';
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";


const Dashboards = lazy(() => import('../../Modules/Dashboards'));
const Users = lazy(() => import('../../Modules/Users'));
const Permissions = lazy(() => import('../../Modules/Permissions'));
const Roles = lazy(() => import('../../Modules/Roles'));
const Lottery = lazy(() => import('../../Modules/Lottery'));
const Wallet = lazy(() => import('../../Modules/Wallet'));
const Auth = lazy(() => import('../../Modules/Auth'));

class AppMain extends Component {
    render () {
        const {isAuthenticated} = this.props.auth;
        return (
            <Fragment>

                {/* Pages */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="line-scale-party"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the components ...
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/auth" component={Auth}/>
                </Suspense>

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-grid-beat"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the Components ...
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/dashboards" component={Dashboards}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/roles" component={Roles}/>
                    <Route path="/permissions" component={Permissions}/>
                    <Route path="/lottery" component={Lottery}/>
                    <Route path="/wallets" component={Wallet}/>
                    <Route path="/setting" component={Wallet}/>
                </Suspense>

                <Route exact path="/" render={() => (
                    isAuthenticated ?
                        <Redirect to="/dashboards"/>
                        :
                        <Redirect to="/auth/login"/>
                )}/>
                <ToastContainer/>
            </Fragment>
        )
    }
};

function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(AppMain));