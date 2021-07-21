import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/';

// USER PAGES

const Auth = ({match}) => (
    <Fragment>
        <div className="app-container">
            <Route path={`${match.url}/login`} component={Login}/>
        </div>
    </Fragment>
);

export default Auth;