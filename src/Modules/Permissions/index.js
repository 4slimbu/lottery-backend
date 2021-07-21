import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import NewPermission from "./NewPermission";
import AllPermissions from "./AllPermissions";

const Permissions = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/new`} component={NewPermission}/>
                    <Route exact path={`${match.url}/all`} component={AllPermissions}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Permissions;