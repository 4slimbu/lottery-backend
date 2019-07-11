import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AllPages from "./AllPages";
import NewPage from "./NewPage";
import EditPage from "./EditPage";
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options

const Pages = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllPages}/>
                    <Route exact path={`${match.url}/new`} component={NewPage}/>
                    <Route exact path={`${match.url}/edit/:id`} component={EditPage}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Pages;