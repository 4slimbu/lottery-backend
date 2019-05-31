import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import AnalyticsDashboard from './Analytics/';
import SalesDashboard from './Sales/';
import CommerceDashboard from './Commerce/';
import CRMDashboard from './CRM/';
import MinimalDashboard1 from './Minimal/Variation1';
import MinimalDashboard2 from './Minimal/Variation2';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Users = ({match}) => (
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

export default Users;