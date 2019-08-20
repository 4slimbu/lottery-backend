import {Redirect, Route, withRouter} from 'react-router-dom';
import React, {Component, Fragment, lazy, Suspense} from 'react';
import Loader from 'react-loaders'

import {ToastContainer,} from 'react-toastify';
import {connect} from "react-redux";
import {makeRequest} from "../../actions/requestAction";
import {MESSAGES} from "../../constants/messages";
import {setCurrencies, setSettings} from "../../actions/appStatusAction";
import request from "../../services/request";


const Dashboards = lazy(() => import('../../Modules/Dashboards'));
const Users = lazy(() => import('../../Modules/Users'));
const Permissions = lazy(() => import('../../Modules/Permissions'));
const Roles = lazy(() => import('../../Modules/Roles'));
const Lottery = lazy(() => import('../../Modules/Lottery'));
const Wallet = lazy(() => import('../../Modules/Wallet'));
const Setting = lazy(() => import('../../Modules/Setting'));
const Pages = lazy(() => import('../../Modules/Pages'));
const Auth = lazy(() => import('../../Modules/Auth'));

class AppMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({isLoading: true});
        this._isMounted && this.bootstrap();
    }

    bootstrap() {
        // Get settings
        this.props.makeRequest(request.Settings.all, '', {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setSettings(res.data);
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get currencies
        this.props.makeRequest(request.Currencies.all, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setCurrencies(res.data);
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Last slot
        this.props.makeRequest(request.Lottery.slots.last, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLastSlot(res.data);
                }
                this.setState({isLoading: false});
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Winners
        this.props.makeRequest(request.Lottery.slots.winners, {query: ''}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLotteryWinners(res);
                } else {
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        // Get Active Slot
        this.props.makeRequest(request.Lottery.slots.getActive, {}, {message: MESSAGES.LOGGING}).then(
            (res) => {
                if (res.data) {
                    this.props.setLotterySlot(res.data);
                    this.props.setLotteryPlayers(res.data.participants);
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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
                    <Route path="/pages" component={Pages}/>
                    <Route path="/settings" component={Setting}/>
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
    makeRequest, setCurrencies, setSettings
})(AppMain));