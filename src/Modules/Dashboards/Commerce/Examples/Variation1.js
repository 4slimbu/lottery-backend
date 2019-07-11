import {color} from 'd3-color';
import {interpolateRgb} from 'd3-interpolate';
import React, {Component, Fragment} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Popover,
    PopoverBody,
    Row,
    Table,
} from 'reactstrap';

import bg1 from '../../../../assets/utils/images/dropdown-header/abstract1.jpg';

import classnames from 'classnames';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';

import IncomeReport from './Components/IncomeReport';

import {faAngleUp, faArrowLeft, faArrowRight,} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Sparklines, SparklinesBars, SparklinesLine,} from 'react-sparklines';
import request from "../../../../services/request";
import {MESSAGES} from "../../../../constants/messages";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {makeRequest} from "../../../../actions/requestAction";
import PropTypes from "prop-types";
import * as _ from "lodash";
import {inAppCoin, inCurrency} from "../../../../utils/helper/helperFunctions";

function boxMullerRandom() {
    let phase = false,
        x1, x2, w, z;

    return (function () {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);

class CommerceDashboard1 extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.togglePop1 = this.togglePop1.bind(this);
        this.togglePop2 = this.togglePop2.bind(this);
        this.togglePop3 = this.togglePop3.bind(this);
        this.togglePop4 = this.togglePop4.bind(this);
        this.bootstrap = this.bootstrap.bind(this);

        this.state = {
            activeTab: '1',
            popoverOpen1: false,
            popoverOpen2: false,
            popoverOpen3: false,
            popoverOpen4: false,
            value: 45,
            value2: 72,
            stats: [],
            lotterySlots: {
                data: [],
                pages: 0,
            },
            isLoading: false,

        }
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.bootstrap();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    togglePop1() {
        this.setState({
            popoverOpen1: !this.state.popoverOpen1
        });
    }

    togglePop2() {
        this.setState({
            popoverOpen2: !this.state.popoverOpen2
        });
    }

    togglePop3() {
        this.setState({
            popoverOpen3: !this.state.popoverOpen3
        });
    }

    togglePop4() {
        this.setState({
            popoverOpen4: !this.state.popoverOpen4
        });
    }

    startColor = '#6495ed'; // cornflowerblue
    endColor = '#dc143c'; // crimson

    async bootstrap() {

        await this.props.makeRequest(request.Dashboard.getStats, {}, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData) {
                    this.setState({
                        stats: responseData,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        stats: [],
                        isLoading: false,
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );

        await this.props.makeRequest(request.Lottery.slots.all, {}, {message: MESSAGES.LOGGING}).then(
            (responseData) => {
                if (responseData.data) {
                    this.setState({
                        lotterySlots: responseData,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        lotterySlots: {
                            data: [],
                            pages: 0,
                        },
                        isLoading: false,
                    });
                }
            },
            (errorData) => {
                this.setState({isLoading: false});
            }
        );
    }

    render() {
        const that = this;
        const {stats} = this.state;
        const radius = 107;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <Col lg="12" xl="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Game Stats
                                    </CardTitle>
                                    <IncomeReport data={ stats.game_stats }/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12" xl="6">
                            <Card className="main-card mb-3">
                                <div className="grid-menu grid-menu-2col">
                                    <Row className="no-gutters">
                                        <Col sm="6">
                                            <div className="widget-chart widget-chart-hover">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-primary"/>
                                                    <i className="lnr-cog text-primary"/>
                                                </div>
                                                <div className="widget-numbers">
                                                    { stats.user_count && stats.user_count.total }
                                                </div>
                                                <div className="widget-subheading">
                                                    Total Users
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="widget-chart widget-chart-hover">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-info"/>
                                                    <i className="lnr-graduation-hat text-info"/>
                                                </div>
                                                <div className="widget-numbers">
                                                    { stats.total_games }
                                                </div>
                                                <div className="widget-subheading">
                                                    Total Games
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="widget-chart widget-chart-hover br-br">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-success"/>
                                                    <i className="lnr-screen"/>
                                                </div>
                                                <div className="widget-numbers">
                                                    { inAppCoin(stats.total_deposit) }
                                                </div>
                                                <div className="widget-subheading">
                                                    Total Deposits
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="widget-chart widget-chart-hover">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-danger"/>
                                                    <i className="lnr-laptop-phone text-danger"/>
                                                </div>
                                                <div className="widget-numbers">
                                                    { inCurrency(stats.total_income) }
                                                </div>
                                                <div className="widget-subheading">
                                                    Total Income
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Latest Games
                                </CardHeader>
                                <Table responsive hover striped borderless className="align-middle mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Slot Ref</th>
                                        <th className="text-center">Start Time</th>
                                        <th className="text-center">End Time</th>
                                        <th className="text-center">Participants</th>
                                        <th className="text-center">Prize Pool</th>
                                        <th className="text-center">Result</th>
                                        <th className="text-center">Winner</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        _.map(this.state.lotterySlots.data, function (lotterySlot, key) {
                                            return (
                                                <tr key={key}>
                                                    <td className="text-center text-muted">{lotterySlot.id}</td>
                                                    <td>
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left flex2">
                                                                    <div className="widget-heading">
                                                                        { lotterySlot.slot_ref }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        { lotterySlot.start_time }
                                                    </td>
                                                    <td className="text-center">
                                                        { lotterySlot.end_time }
                                                    </td>
                                                    <td className="text-center">
                                                        { lotterySlot.total_participants}
                                                    </td>
                                                    <td className="text-center">
                                                        { inCurrency(lotterySlot.total_amount)}
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="badge badge-warning">{ lotterySlot.result[0] }</div>
                                                        <div className="badge badge-warning">{ lotterySlot.result[1] }</div>
                                                        <div className="badge badge-warning">{ lotterySlot.result[2] }</div>
                                                        <div className="badge badge-warning">{ lotterySlot.result[3] }</div>
                                                        <div className="badge badge-warning">{ lotterySlot.result[4] }</div>
                                                        <div className="badge badge-warning">{ lotterySlot.result[5] }</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <Button size="sm" color={lotterySlot.has_winner == 1 ? 'success' : ''} id={'PopoverCustomT-1'}>
                                                            { lotterySlot.has_winner == 1 ? 'Yes' : 'No'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    </tbody>
                                </Table>
                                <CardFooter className="d-block text-center">
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

CommerceDashboard1.propTypes = {
    makeRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        auth: state.authReducer,
        appStatus: state.appStatusReducer
    }
}


export default withRouter(connect(mapStateToProps, {
    makeRequest,
})(CommerceDashboard1));