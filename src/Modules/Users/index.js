import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AllUsers from "./AllUsers";
import NewUser from "./NewUser";
import Profile from "./Profile";
import AllPermissions from "./AllPermissions";
import NewPermission from "./NewPermission";
import EditUser from "./EditUser";
import AllRoles from "./AllRoles";

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import NewRole from "./NewRole";
import EditRole from "./EditRole";

const Users = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllUsers}/>
                    <Route exact path={`${match.url}/new`} component={NewUser}/>
                    <Route exact path={`${match.url}/edit/:id`} component={EditUser}/>
                    <Route exact path={`${match.url}/profile`} component={Profile}/>
                    <Route exact path={`${match.url}/roles/new`} component={NewRole}/>
                    <Route exact path={`${match.url}/roles/edit/:id`} component={EditRole}/>
                    <Route exact path={`${match.url}/roles`} component={AllRoles}/>
                    <Route exact path={`${match.url}/permissions/new`} component={NewPermission}/>
                    <Route exact path={`${match.url}/permissions`} component={AllPermissions}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Users;