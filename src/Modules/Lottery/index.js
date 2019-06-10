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
import AllLotterySlots from "./AllLotterySlots";

const Users = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/slots/all`} component={AllLotterySlots}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Users;