import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import AllWallets from "./AllWallets";
import AllWithdrawRequests from "./AllWithdrawRequests";

const Wallet = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllWallets}/>
                    <Route exact path={`${match.url}/withdraw-requests/all`} component={AllWithdrawRequests}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Wallet;