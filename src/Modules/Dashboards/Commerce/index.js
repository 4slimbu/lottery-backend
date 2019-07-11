import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import CommerceDashboard1 from './Examples/Variation1';
import CommerceDashboard2 from './Examples/Variation2';

export default class CommerceDashboard extends Component {

    render() {
        return (
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
                        subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"
                    />
                    <CommerceDashboard1/>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
