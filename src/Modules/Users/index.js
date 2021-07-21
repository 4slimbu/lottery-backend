import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AllUsers from "./AllUsers";
import NewUser from "./NewUser";
import Profile from "./Profile";
import EditUser from "./EditUser";
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options

const Users = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllUsers}/>
                    <Route exact path={`${match.url}/new`} component={NewUser}/>
                    <Route exact path={`${match.url}/edit/:id`} component={EditUser}/>
                    <Route exact path={`${match.url}/profile`} component={Profile}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Users;