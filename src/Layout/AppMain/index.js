import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';
import React, {Component, Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loaders'

import {
    ToastContainer,
} from 'react-toastify';
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";


const Users = lazy(() => import('../../Modules/Users'));
const Lottery = lazy(() => import('../../Modules/Lottery'));
const UserPages = lazy(() => import('../../Modules/UserPages'));
const Applications = lazy(() => import('../../Modules/Applications'));
const Dashboards = lazy(() => import('../../Modules/Dashboards'));

const Widgets = lazy(() => import('../../Modules/Widgets'));
const Elements = lazy(() => import('../../Modules/Elements'));
const Components = lazy(() => import('../../Modules/Components'));
const Charts = lazy(() => import('../../Modules/Charts'));
const Forms = lazy(() => import('../../Modules/Forms'));
const Tables = lazy(() => import('../../Modules/Tables'));

class AppMain extends Component {
    render () {
        const {isAuthenticated} = this.props.auth;
        return (
            <Fragment>

                {/* Components */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-pulse-rise"/>
                            </div>
                            <h6 className="mt-5">
                                Please wait while we load all the Components examples
                                <small>Because this is a demonstration we load at once all the Components examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/components" component={Components}/>
                </Suspense>

                {/* Forms */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-pulse-rise"/>
                            </div>
                            <h6 className="mt-5">
                                Please wait while we load all the Forms examples
                                <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/forms" component={Forms}/>
                </Suspense>

                {/* Charts */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-rotate"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the Charts examples
                                <small>Because this is a demonstration we load at once all the Charts examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/charts" component={Charts}/>
                </Suspense>

                {/* Tables */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-pulse-rise"/>
                            </div>
                            <h6 className="mt-5">
                                Please wait while we load all the Tables examples
                                <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/tables" component={Tables}/>
                </Suspense>

                {/* Elements */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="line-scale"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the Elements examples
                                <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/elements" component={Elements}/>
                </Suspense>

                {/* Dashboard Widgets */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-pulse-sync"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the Dashboard Widgets examples
                                <small>Because this is a demonstration we load at once all the Dashboard Widgets examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/widgets" component={Widgets}/>
                </Suspense>

                {/* Pages */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="line-scale-party"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the Pages examples
                                <small>Because this is a demonstration we load at once all the Pages examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/auth" component={UserPages}/>
                </Suspense>

                {/* Applications */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-pulse"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the Applications examples
                                <small>Because this is a demonstration we load at once all the Applications examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/apps" component={Applications}/>
                </Suspense>

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-grid-beat"/>
                            </div>
                            <h6 className="mt-3">
                                Please wait while we load all the User Components
                                <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/dashboards" component={Dashboards}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/lottery" component={Lottery}/>
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