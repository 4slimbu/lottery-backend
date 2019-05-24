import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AllUsers from "./AllUsers";
import NewUser from "./NewUser";

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
                    <Route path={`${match.url}/all`} component={AllUsers}/>
                    <Route path={`${match.url}/new`} component={NewUser}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Users;