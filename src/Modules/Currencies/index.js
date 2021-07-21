import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AllCurrencies from "./AllCurrencies";
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import EditCurrency from "./EditCurrency";
import NewCurrency from "./NewCurrency";

const Currencies = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/all`} component={AllCurrencies}/>
                    <Route exact path={`${match.url}/new`} component={NewCurrency}/>
                    <Route exact path={`${match.url}/edit/:id`} component={EditCurrency}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Currencies;