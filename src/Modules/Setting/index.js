import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import AllSettings from "./AllSettings";

const Setting = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllSettings}/>
                    {/*<Route exact path={`${match.url}/lottery`} component={AllSettings}/>*/}
                    {/*<Route exact path={`${match.url}/wallet`} component={AllSettings}/>*/}
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Setting;