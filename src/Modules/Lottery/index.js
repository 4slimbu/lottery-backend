import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import AllLotterySlots from "./AllLotterySlots";
import LotterySlotDetail from "./LotterySlotDetail";
import LotteryWinners from "./LotteryWinners";

const Lottery = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/winners`} component={LotteryWinners}/>
                    <Route exact path={`${match.url}/slots/:id`} component={LotterySlotDetail}/>
                    <Route exact path={`${match.url}/slots`} component={AllLotterySlots}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Lottery;