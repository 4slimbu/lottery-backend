import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AllUsers from "./AllUsers";
import NewUser from "./NewUser";
import Profile from "./Profile";
import Roles from "./Roles";
import AddNewRole from "./AddNewRole";
import AddNewPermission from "./AddNewPermission";
import Permissions from "./Permissions";

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions/';
import EditUser from "./EditUser";



const Users = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/all`} component={AllUsers}/>
                    <Route path={`${match.url}/new`} component={NewUser}/>
                    <Route path={`${match.url}/edit/:id`} component={EditUser}/>
                    <Route path={`${match.url}/profile`} component={Profile}/>
                    <Route path={`${match.url}/roles/new`} component={AddNewRole}/>
                    <Route path={`${match.url}/roles`} component={Roles}/>
                    <Route path={`${match.url}/permissions/new`} component={AddNewPermission}/>
                    <Route path={`${match.url}/permissions`} component={Permissions}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Users;