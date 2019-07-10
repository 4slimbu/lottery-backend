import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import PageTitle from "../../Layout/AppMain/PageTitle";

// DASHBOARDS

// Layout

const Dashboard = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Fragment>
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="TabsAnimation"
                            transitionAppear={true}
                            transitionAppearTimeout={0}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <PageTitle
                                heading="Dashboard"
                                subheading="Get quick view about your app status"
                                icon="pe-7s-graph icon-gradient bg-ripe-malin"
                            />
                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Dashboard;