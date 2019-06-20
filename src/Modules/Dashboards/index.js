import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import CommerceDashboard from './Commerce/';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

// DASHBOARDS

// Layout

const Dashboard = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={CommerceDashboard}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Dashboard;