import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AllRoles from "./AllRoles";
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import EditRole from "./EditRole";
import NewRole from "./NewRole";

const Roles = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllRoles}/>
                    <Route exact path={`${match.url}/new`} component={NewRole}/>
                    <Route exact path={`${match.url}/edit/:id`} component={EditRole}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Roles;