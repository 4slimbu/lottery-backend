import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import AllWallets from "./AllWallets";

const Users = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllWallets}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Users;